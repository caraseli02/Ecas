import {useAuthStore} from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';
import {ActiveOrdersResponse} from '~/model/dashboard/customer-information/customer-information';

class CustomerDashboard extends HttpFactory {
    private RESOURCE = '/dashboard';
    private MAIN_RESOURCE = '/dashboard/client';

    async fetchCustomerActiveOrders() {
        const authStore = useAuthStore();
        const token = authStore.getToken();
        return await this.call<ActiveOrdersResponse>('GET', `${this.MAIN_RESOURCE}/general/active-orders`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }
}

export default CustomerDashboard;
