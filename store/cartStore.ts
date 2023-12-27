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
            const { data } = await $api.cart.fetchCartList();
            this.cart = data;
            Emitter.emit('update-cart', data);

            return this.cart;
        },
    },
    getters: {
        getCart: async (state) => {
            const { $api } = useNuxtApp();
            if (!state.cart) {
                return (await $api.cart.fetchCartList()).data;
            }

            return state.cart;
        },
    },
    persist: true,
});
