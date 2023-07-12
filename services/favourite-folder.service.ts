import HttpFactory from '@/composables/HttpFactory';
import { FavouriteFolderRequestInterface } from '~/model/favourite-folder/request/favourite-folder.interface';
import { useAuthStore } from '~/store/authStore';
import { FavouriteFolderResponse } from '~/model/favourite-folder/response/favourite-folder.interface';

class FavouriteFolderService extends HttpFactory {
    private RESOURCE = '/user';
    private authStore = useAuthStore();

    async fetchFavouriteList() {
        const user = this.authStore.getCurrentUser;
        const token = this.authStore.getToken;

        return await this.call<FavouriteFolderResponse>('GET', `${this.RESOURCE}/${user.user_id}/favourite`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async addEntityToFavouriteList(payload: FavouriteFolderRequestInterface) {
        const user = this.authStore.getCurrentUser;
        const token = this.authStore.getToken;

        return await this.call<FavouriteFolderRequestInterface>('POST', `${this.RESOURCE}/${user.user_id}/favourite`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export default FavouriteFolderService;
