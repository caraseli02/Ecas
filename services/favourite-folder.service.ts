import HttpFactory from '@/composables/HttpFactory';
import { FavouriteFolderRequestInterface } from '~/model/favourite-folder/request/favourite-folder.interface';
import { useAuthStore } from '~/store/authStore';

class FavouriteFolderService extends HttpFactory {
    private RESOURCE = '/user';

    async addEntityToFavouriteList(payload: FavouriteFolderRequestInterface) {
        const authStore = useAuthStore();
        const user = authStore.getCurrentUser;
        const token = authStore.getToken;

        return await this.call<FavouriteFolderRequestInterface>('POST', `${this.RESOURCE}/${user.user_id}/favourite`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export default FavouriteFolderService;
