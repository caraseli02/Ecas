import HttpFactory from '@/composables/HttpFactory';
import {PaginatedUserRequest} from '~/model/user/request/PaginatedUserRequest';
import {useAuthStore} from '~/store/authStore';
import {ProductResponse} from '~/model/products/response/ProductResponse';
import {FirebaseError} from 'firebase/app';
import {AccountAdminSettings} from '~/types/auth/account-settings';

class UserService extends HttpFactory {
    private RESOURCE = '/user';
    private authStore = useAuthStore();
    private token = this.authStore.getToken() ?? null;

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

    async resetPasswordLink(email: string): Promise<ProductResponse | FirebaseError | unknown> {
        try {
            return await this.call('POST', `${this.RESOURCE}/password/email/reset`, {email: email});
        } catch (err) {
            if (err instanceof FirebaseError) {
                return err;
            }
            return err;
        }
    }

    async resetPassword(email: string, newPassword: string, code: string): Promise<ProductResponse | FirebaseError | unknown> {
        try {
            return await this.call('POST', `${this.RESOURCE}/password/reset`, {
                email: email,
                newPassword: newPassword,
                code: code,
            });
        } catch (err) {
            if (err instanceof FirebaseError) {
                return err;
            }
            return err;
        }
    }

    async fetchCustomerCredit(id: string) {
        const token = this.authStore.getToken();

        return await this.call<AccountAdminSettings>('GET', `${this.RESOURCE}/credit`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async userCards(id: string | null) {
        if (id !== null) {
            return await this.call<AccountAdminSettings>('GET', `${this.RESOURCE}/${id}/cards`, null);
        }

    }
}

export default UserService;
