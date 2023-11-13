import HttpFactory from '~/composables/HttpFactory';
import {useAuthStore} from '~/store/authStore';
import {
    CartProductsInterface,
} from '~/types/order-summary/item';

class CartService extends HttpFactory {
    private RESOURCE = '/ecas/cart';
    private MAIN_RESOURCE = 'https://dev-backend.ecasmag.ro';
    private authStore = useAuthStore();

    async fetchCartProducts() {
        return await this.call<CartProductsInterface>('GET', `${this.MAIN_RESOURCE}${this.RESOURCE}`, null, {
            headers: {Authorization: `Bearer ${this.authStore.getToken}`},
        });
    }
}

export default CartService;