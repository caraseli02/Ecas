import HttpFactory from '~/composables/HttpFactory';
import { useAuthStore } from '~/store/authStore';
import { CartProductsInterface } from '~/model/cart/response/cart.interface';

class CartService extends HttpFactory {
    private RESOURCE = '/ecas/cart';
    private MAIN_RESOURCE = 'https://dev-backend.ecasmag.ro';
    private authStore = useAuthStore();

    async fetchCartProducts() {
        const extras = this.authStore.getToken()
            ? {
                  headers: { Authorization: `Bearer ${this.authStore.getToken()}` },
              }
            : {};

        return await this.call<CartProductsInterface>('GET', `${this.MAIN_RESOURCE}${this.RESOURCE}`, null, extras);
    }
}

export default CartService;
