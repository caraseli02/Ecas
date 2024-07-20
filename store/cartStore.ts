import { defineStore, storeToRefs } from 'pinia';
import { useNuxtApp } from '#app';
import Emitter from 'tiny-emitter/instance.js';
import { parseProductPriceConfiguration } from '~/helpers/prices.helper';
import { useAuthStore } from '~/store/authStore';
import { CartInterface, CartProductsInterface } from '~/model/cart/response/cart.interface';
import { StripeError } from '@stripe/stripe-js';

export const useCartStore = defineStore({
    id: 'cart-store',
    state: () => {
        return {
            cart: null as CartInterface | null,
            orderClientSecret: null as string | null,
            previousCheckoutError: null as StripeError | null,
            cartSubtotal: 0,
        };
    },
    actions: {
        setCart(cart: CartInterface) {
            this.cart = cart;
            Emitter.emit('update-cart', cart);
        },
        setOrderClientSecret(secret: string) {
            this.orderClientSecret = secret;
        },
        setPreviousCheckoutError(error: StripeError) {
            this.previousCheckoutError = error;
        },
        emptyOrderClientSecret() {
            this.orderClientSecret = null;
        },
        emptyPreviousCheckoutError() {
            this.previousCheckoutError = null;
        },
        async updateAndReturnCart() {
            const { $api } = useNuxtApp();
            const cartResponse = await $api.cart.fetchCartList();

            if (!cartResponse) {
                return Promise<null>;
            }

            this.cart = cartResponse.data;

            Emitter.emit('update-cart', this.cart);

            return this.cart as CartInterface;
        },
        emptyCart() {
            this.cart = null;
            this.orderClientSecret = null;
        },
    },
    getters: {
        mappedCartItems: (state) => {
            return state.cart?.products.map((product) => ({
                id: product.id,
                stock: product.stock,
                backorder_stock: product.backorder_stock || 0,
                isFolder: false,
                initialUnitPrice: product.initialUnitPrice,
                unitPriceAfterDiscounts: product.unitPriceAfterDiscounts,
                subtotal: product.subtotal || 0,
                total: product.total || 0,
                discount: product.discount || {
                    value: 0,
                    startDate: '',
                    endDate: '',
                },
                productEntity: product.productEntity,
                liked: false,
                selected: false,
            })) || [];
        },
        getCart: async (state) => {
            const { $api } = useNuxtApp();

            if (!state.cart) {
                const cartResponse = await $api.cart.fetchCartList();

                if (!cartResponse) {
                    return Promise<null>;
                }

                return cartResponse.data;
            }

            return state.cart as CartInterface;
        },
        getCartSubtotal: async (state) => {
            state.cartSubtotal = 0;
            const authStore = useAuthStore();
            const { getUserDetails } = storeToRefs(authStore);
            state?.cart?.products.forEach((cartProduct: CartProductsInterface) => {
                if (!cartProduct.productEntity) {
                    return;
                }

                const discountsHelper = parseProductPriceConfiguration(cartProduct.productEntity, getUserDetails.value, cartProduct.stock);

                const discountPrice = discountsHelper?.currentConfigurationDiscountPrice || 0;
                const stockTotal = Number(discountPrice) * Number(cartProduct.stock);
                const backorderTotal = Number(discountPrice) * Number(cartProduct.backorder_stock);
                const allItemsTotal = stockTotal + backorderTotal;
                state.cartSubtotal += allItemsTotal
            });

            return Number(state.cartSubtotal.toFixed(2));
        },
        getOrderClientSecret: (state): string => state.orderClientSecret as string,
        getPreviousCheckoutError: (state): StripeError => state.previousCheckoutError as StripeError,
        itemsDiscount: (state) => state.cart?.products[0].discount.value
    },
    persist: {
        storage: persistedState.localStorage,
    },
});
