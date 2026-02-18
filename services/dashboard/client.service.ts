import { useAuthStore } from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';
import type {
    ActiveOrdersResponse,
    FavoritesResponse,
    MonthHotSaleResponse,
    RecentlyBoughtResponse,
    TotalOrdersResponse,
    TotalReturnsResponse,
    ViewHistoryResponse,
} from '~/model/dashboard/customer-information/customer-information';
import type { UserDetailsResponse } from '~/types';

class CustomerDashboard extends HttpFactory {
    private RESOURCE = '/dashboard';
    private MAIN_RESOURCE = '/dashboard/client';
    private ORDERS_RESOURCE = '/dashboard/client/orders';

    async fetchCustomerActiveOrders() {
        const authStore = useAuthStore();
        const token = authStore.getToken();
        return await this.call<ActiveOrdersResponse>('GET', `${this.MAIN_RESOURCE}/general/active-orders`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async fetchFavorites() {
        const authStore = useAuthStore();
        const token = authStore.getToken();
        return await this.call<FavoritesResponse>('GET', `${this.ORDERS_RESOURCE}/favourites`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async fetchTotalOrders() {
        const authStore = useAuthStore();
        const token = authStore.getToken();
        return await this.call<TotalOrdersResponse>('GET', `${this.ORDERS_RESOURCE}/total-orders`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async fetchReturns() {
        const authStore = useAuthStore();
        const token = authStore.getToken();
        return await this.call<TotalReturnsResponse>('GET', `${this.ORDERS_RESOURCE}/returns`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async fetchCustomerAccountInformation() {
        const authStore = useAuthStore();
        const token = authStore.getToken();
        return await this.call<UserDetailsResponse>('GET', `${this.ORDERS_RESOURCE}/account-information`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async fetchRecentlyBought() {
        const authStore = useAuthStore();
        const token = authStore.getToken();
        return await this.call<RecentlyBoughtResponse>('GET', `${this.ORDERS_RESOURCE}/recently-bought`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async fetchViewHistory() {
        const authStore = useAuthStore();
        const token = authStore.getToken();
        return await this.call<ViewHistoryResponse>('GET', `${this.MAIN_RESOURCE}/general/product-history`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async fetchMonthHotSale() {
        const authStore = useAuthStore();
        const token = authStore.getToken();
        return await this.call<MonthHotSaleResponse>('GET', `${this.MAIN_RESOURCE}/general/month-hot-sale`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export default CustomerDashboard;
