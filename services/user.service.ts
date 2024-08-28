import HttpFactory from '@/composables/HttpFactory';
import { PaginatedUserRequest } from '~/model/user/request/PaginatedUserRequest';
import { useAuthStore } from '~/store/authStore';
import { ProductResponse } from '~/model/products/response/ProductResponse';
import { FirebaseError } from 'firebase/app';
import { AccountAdminSettings, CardsResponse } from '~/types/auth/account-settings';
import { ShippingAddressInterface } from '~/types/auth/user-interface';

class UserService extends HttpFactory {
    private RESOURCE = '/user';
    private authStore = useAuthStore();
    private token = this.authStore.getToken() ?? null;

    async fetchPaginatedUser(params: PaginatedUserRequest) {
        const baseURL = useRuntimeConfig().public.BASE_URL_API;
        const { data, error } = await useFetchAPI(`${baseURL}/${this.RESOURCE}`, {
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
            return await this.call('POST', `${this.RESOURCE}/password/email/reset`, { email: email });
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
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async userCards() {
        const token = this.authStore.getToken();

        return await this.call<CardsResponse>('GET', `${this.RESOURCE}/cards`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async addShippingAsCustomer(address: ShippingAddressInterface[]) {
        const token = this.authStore.getToken();

        return await this.call<{ status: string; data: string }>(
            'POST',
            `${this.RESOURCE}/shipping-address/`,
            { address: address },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    }

    async updateShippingAsCustomer(address: ShippingAddressInterface[]) {
        const token = this.authStore.getToken();

        return await this.call<{ status: string; data: string }>(
            'PATCH',
            `${this.RESOURCE}/shipping-address/`,
            { address: address },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    }

    async addBillingAsCustomer(address: ShippingAddressInterface[]) {
        const token = this.authStore.getToken();

        return await this.call<{ status: string; data: string }>(
            'POST',
            `${this.RESOURCE}/billing-address/`,
            { address: address },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    }

    async updateBillingAsCustomer(address: ShippingAddressInterface[]) {
        const token = this.authStore.getToken();

        return await this.call<{ status: string; data: string }>(
            'PATCH',
            `${this.RESOURCE}/billing-address/`,
            { address: address },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    }
}

export default UserService;
