import {useAuthStore} from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';
import {AccountAdminSettings} from '~/types/auth/account-settings';
import {ShippingAddressInterface} from '~/types/auth/user-details';

class ControlPanelService extends HttpFactory {
    private MAIN_RESOURCE = '/dashboard/control-panel/settings';
    private MAIN = '/dashboard/control-panel';

    private authStore = useAuthStore();


    async fetchCustomerSettings(id: string) {
        const token = this.authStore.getToken;
        return await this.call<AccountAdminSettings>('GET', `${this.MAIN_RESOURCE}/${id}`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async markSettingsAsRead(setting: object, type: string, id: string) {
        const token = this.authStore.getToken;
        const data = {
            setting: {
                name: (setting as object as any).key,
                value: (setting as object as any)[type],
                option: type

            }
        }
        return await this.call<AccountAdminSettings>('POST', `${this.MAIN_RESOURCE}/${id}`, data, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async fetchCustomerDiscount(id: string) {
        const token = this.authStore.getToken;
        return await this.call<AccountAdminSettings>('GET', `${this.MAIN_RESOURCE}/discount/${id}`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async updateCustomerDiscount(discount: number, id: string) {
        const token = this.authStore.getToken;
        const data = {
            value: discount
        }
        return await this.call<AccountAdminSettings>('PUT', `${this.MAIN_RESOURCE}/discount/${id}`, data, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async fetchCustomerCredit(id: string) {
        const token = this.authStore.getToken;
        return await this.call<AccountAdminSettings>('GET', `${this.MAIN_RESOURCE}/customer-credit/${id}`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async updateCustomerCredit(term: number, limit: string, id: string) {
        const token = this.authStore.getToken;
        const data = {
            term: term,
            limit: limit,
        }
        return await this.call<AccountAdminSettings>('PUT', `${this.MAIN_RESOURCE}/customer-credit/${id}`, data, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async toggleCloseCustomerCredit(id: string) {
        const token = this.authStore.getToken;
        return await this.call<AccountAdminSettings>('PUT', `${this.MAIN_RESOURCE}/customer-credit/close/${id}`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async toggleFreezeCustomerCredit(id: string) {
        const token = this.authStore.getToken;
        return await this.call<AccountAdminSettings>('PUT', `${this.MAIN_RESOURCE}/customer-credit/freeze/${id}`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async fetchShipping(id: string, type: number) {
        const token = this.authStore.getToken;
        return await this.call<AccountAdminSettings>('GET', `${this.MAIN}/${id}/${(type === 0 ? 'personal' : 'organization')}`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async updateShipping(id: string, address: ShippingAddressInterface[], type: number) {
        const token = this.authStore.getToken;

        return await this.call<AccountAdminSettings>('POST', `${this.MAIN}/${id}/${(type === 0 ? 'personal/shipping-address' : 'business/shipping-address')}`, {address: address}, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async fetchAccountDetails(id: string, type: number) {
        const token = this.authStore.getToken;
        return await this.call<AccountAdminSettings>('GET', `${this.MAIN}/${id}/${(type === 0 ? 'personal' : 'business')}`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }


}

export default ControlPanelService;
