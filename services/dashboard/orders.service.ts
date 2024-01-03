import { useAuthStore } from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';
import { PaginatedCustomersInterface } from '~/model/dashboard/response/CustomerInterfaceResponse';
import { OrderRequestInterface } from '~/types';

class OrdersService extends HttpFactory {
    private ORDERS_DASHBOARD_RESOURCE = '/dashboard/orders';
    private ORDERS_RESOURCE = '/orders';

    private authStore = useAuthStore();

    async fetchWidget(type: 'string', time: number) {
        const token = this.authStore.getToken();
        
        return await this.call<any>('GET', `${this.ORDERS_DASHBOARD_RESOURCE}/${type}?time=${time}`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async fetchOrders(page: number, perPage: number, filters = {}, sort = {}) {
        const token = this.authStore.getToken();

        return await this.call<PaginatedCustomersInterface>('GET', this.ORDERS_RESOURCE, null, {
            params: {
                page: page,
                perPage: perPage,
                ...filters,
                ...sort,
            },
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async sendOrder(order: OrderRequestInterface) {
        const token = this.authStore.getToken();

        return await this.call<any>(
            'POST',
            `${this.ORDERS_RESOURCE}/new`,
            { order: order },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    }
}

export default OrdersService;
