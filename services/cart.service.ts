import HttpFactory from '@/composables/HttpFactory';
import { FavouriteFolderMoveInterface, FavouriteFolderRequestInterface } from '~/model/favourite-folder/request/favourite-folder.interface';
import { useAuthStore } from '~/store/authStore';
import { FavouriteFolderResponse } from '~/model/favourite-folder/response/favourite-folder.interface';
import {
    AddToCartRequestInterface,
    DeleteProductCartRequestInterface,
    UpdateProductCartRequestInterface,
} from '~/model/cart/request/cart.interface';
import { CartResponse } from '~/model/cart/response/cart.interface';

class CartService extends HttpFactory {
    private RESOURCE = '/cart';
    private authStore = useAuthStore();

    async fetchCartList() {
        const user = this.authStore.getCurrentUser;
        const token = this.authStore.getToken;

        return await this.call<CartResponse>('GET', `${this.RESOURCE}`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async addEntityToCart(payload: AddToCartRequestInterface) {
        const user = this.authStore.getCurrentUser;
        const token = this.authStore.getToken;

        payload.userId = user.user_id;

        return await this.call('POST', `${this.RESOURCE}`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async removeEntityFromCart(payload: DeleteProductCartRequestInterface) {
        const user = this.authStore.getCurrentUser;
        const token = this.authStore.getToken;

        return await this.call('DELETE', `${this.RESOURCE}`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async updateEntityFromCart(payload: UpdateProductCartRequestInterface) {
        const user = this.authStore.getCurrentUser;
        const token = this.authStore.getToken;

        payload.userId = user.user_id;

        return await this.call('PUT', `${this.RESOURCE}`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export default CartService;
