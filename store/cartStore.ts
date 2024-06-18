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
                state.cartSubtotal += Number(discountPrice) * Number(cartProduct.stock);
            });

            return Number(state.cartSubtotal.toFixed(2));
        },
        getOrderClientSecret: (state): string => state.orderClientSecret as string,
        getPreviousCheckoutError: (state): StripeError => state.previousCheckoutError as StripeError,
    },
    persist: {
        storage: persistedState.localStorage,
    },
});
