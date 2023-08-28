import HttpFactory from '@/composables/HttpFactory';
import {PaginatedUserRequest} from '~/model/user/request/PaginatedUserRequest';
import {useAuthStore} from '~/store/authStore';
import {ProductResponse} from '~/model/products/response/ProductResponse';
import {FirebaseError} from 'firebase/app';

class UserService extends HttpFactory {
    private RESOURCE = '/user';

    private token = useAuthStore().getToken ?? null;

    async fetchPaginatedUser(params: PaginatedUserRequest) {
        const baseURL = useRuntimeConfig().public.BASE_URL_API;
        const {data, error} = await useFetchAPI(`${baseURL}/${this.RESOURCE}`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });

        if (error.value) {
            return error.value;
        }

        return data;
    }

    async resetPassword(email: string): Promise<ProductResponse | FirebaseError | unknown> {
        try {
            return await this.call('POST', `${this.RESOURCE}/password/email/reset`, {email: email});
        } catch (err) {
            if (err instanceof FirebaseError) {
                return err;
            }
            return err;
        }
    }
}

export default UserService;
