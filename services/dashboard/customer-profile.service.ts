import {CustomersProfileInformation} from '~/model/dashboard/customer-information/customer-information';
import {useAuthStore} from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';
import {OrderInterface} from '~/types';

class CustomerProfileService extends HttpFactory {
    private RESOURCE = '/user';
    private MAIN_RESOURCE = '/dashboard/profile';

    async fetchCustomerInformation(userID: string) {
        const authStore = useAuthStore();
        const token = authStore.getToken;
        return await this.call<CustomersProfileInformation>('GET', `${this.MAIN_RESOURCE}/${userID}/customer-information`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async fetchCustomerLastOrder(userID: string) {
        const authStore = useAuthStore();
        const token = authStore.getToken;
        return await this.call<any>('GET', `${this.MAIN_RESOURCE}/${userID}/last-order`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async fetchCustomerTotalSpent(userID: string) {
        const authStore = useAuthStore();
        const token = authStore.getToken;
        return await this.call<any>('GET', `${this.MAIN_RESOURCE}/${userID}/total-spent`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async fetchCustomerAvgOrderValue(userID: string) {
        const authStore = useAuthStore();
        const token = authStore.getToken;
        return await this.call<any>('GET', `${this.MAIN_RESOURCE}/${userID}/average-order`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async fetchCustomerAbandonedCheckout(userID: string) {
        const authStore = useAuthStore();
        const token = authStore.getToken;
        return await this.call<any>('GET', `${this.MAIN_RESOURCE}/${userID}/abandoned-checkout`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async fetchCustomerShippingInformation(userID: string) {
        const authStore = useAuthStore();
        const token = authStore.getToken;
        return await this.call<any>('GET', `${this.MAIN_RESOURCE}/${userID}/shipping-information`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async fetchCustomerRecentTransactions(userID: string) {
        const authStore = useAuthStore();
        const token = authStore.getToken;
        return await this.call<OrderInterface[]>('GET', `${this.MAIN_RESOURCE}/${userID}/recent-transactions`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }
}

export default CustomerProfileService;
