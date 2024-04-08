import {useAuthStore} from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';
import {
    ActiveOrdersResponse,
    FavoritesResponse,
    TotalOrdersResponse,
    TotalReturnsResponse
} from '~/model/dashboard/customer-information/customer-information';
import {UserDetailsResponse} from '~/types';

class CustomerDashboard extends HttpFactory {
    private RESOURCE = '/dashboard';
    private MAIN_RESOURCE = '/dashboard/client';
    private ORDERS_RESOURCE = '/dashboard/client/orders'

    async fetchCustomerActiveOrders() {
        const authStore = useAuthStore();
        const token = authStore.getToken();
        return await this.call<ActiveOrdersResponse>('GET', `${this.MAIN_RESOURCE}/general/active-orders`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async fetchFavorites() {
        const authStore = useAuthStore();
        const token = authStore.getToken();
        return await this.call<FavoritesResponse>('GET', `${this.ORDERS_RESOURCE}/favourites`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async fetchTotalOrders() {
        const authStore = useAuthStore();
        const token = authStore.getToken();
        return await this.call<TotalOrdersResponse>('GET', `${this.ORDERS_RESOURCE}/total-active-orders`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async fetchReturns() {
        const authStore = useAuthStore();
        const token = authStore.getToken();
        return await this.call<TotalReturnsResponse>('GET', `${this.ORDERS_RESOURCE}/returns`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    async fetchCustomerAccountInformation() {
        const authStore = useAuthStore();
        const token = authStore.getToken();
        return await this.call<UserDetailsResponse>('GET', `${this.ORDERS_RESOURCE}/account-information`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }
}

export default CustomerDashboard;
