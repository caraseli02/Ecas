import HttpFactory from '~/composables/HttpFactory';
import { useAuthStore } from '~/store/authStore';
import type { CartProductsInterface } from '~/model/cart/response/cart.interface';

class CartService extends HttpFactory {
    private RESOURCE = '/ecas/cart';
    private authStore = useAuthStore();

    async fetchCartProducts() {
        const extras = this.authStore.getToken()
            ? {
                  headers: { Authorization: `Bearer ${this.authStore.getToken()}` },
              }
            : {};

        return await this.call<CartProductsInterface>('GET', this.RESOURCE, null, extras);
    }
}

export default CartService;
