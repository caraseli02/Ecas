import { defineStore } from 'pinia';
import { CartInterface } from '~/model/cart/response/cart.interface';
import { useNuxtApp } from '#app';
import Emitter from 'tiny-emitter/instance.js';

export const useCartStore = defineStore({
    id: 'cart-store',
    state: () => {
        return {
            cart: null as CartInterface | null,
        };
    },
    actions: {
        setCart(cart: CartInterface) {
            this.cart = cart;
            Emitter.emit('update-cart', cart);
        },
        async updateAndReturnCart() {
            const { $api } = useNuxtApp();
            const cartResponse = await $api.cart.fetchCartList();

            if (!cartResponse) {
                console.log('guest user');
                return Promise<null>;
            }

            this.cart = cartResponse.data;

            Emitter.emit('update-cart', this.cart);

            return this.cart;
        },
        emptyCart() {
            this.cart = null;
        },
    },
    getters: {
        getCart: async (state) => {
            const { $api } = useNuxtApp();
            if (!state.cart) {
                const cartResponse = await $api.cart.fetchCartList();

                if (!cartResponse) {
                    console.log('guest user');
                    return Promise<null>;
                }

                return cartResponse.data;
            }

            return state.cart as CartInterface;
        },
    },
    persist: true,
});
