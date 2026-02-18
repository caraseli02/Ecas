import { useAuthStore } from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';
import type { PaginatedCustomersInterface } from '~/model/dashboard/response/CustomerInterfaceResponse';
import { OrderStatus, type MarkAsPaidRequestInterface, type OrderRequestInterface } from '~/types';
import type { ShippingAddressInterface } from '~/types/auth/user-interface';

class OrdersService extends HttpFactory {
    private ORDERS_DASHBOARD_RESOURCE = '/dashboard/orders/admin';
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
            { ...order },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    }

    async createAndRetrieveSetupIntent() {
        const token = this.authStore.getToken();

        return await this.call<any>('POST', `${this.ORDERS_RESOURCE}/setup-intent/new`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async getOrderById(id: string) {
        const token = this.authStore.getToken();

        return await this.call<any>('GET', `${this.ORDERS_RESOURCE}/${id}`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async getShippingPricesForOrder(order: any) {
        const token = this.authStore.getToken();

        return await this.call<any>(
            'POST',
            `${this.ORDERS_RESOURCE}/price`,
            { order },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    }

    async validateAddress(address: ShippingAddressInterface) {
        return await this.call<any>('POST', `${this.ORDERS_RESOURCE}/validate-address`, { ...address });
    }

    async cancelOrder(id: string) {
        const token = this.authStore.getToken();
        return await this.call<any>('POST', `${this.ORDERS_RESOURCE}/${id}/cancel`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async markAsPaid(id: string, payload: MarkAsPaidRequestInterface) {
        const token = this.authStore.getToken();
        return await this.call<any>('POST', `${this.ORDERS_RESOURCE}/${id}/paid`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async changeStatus(id: string, status: OrderStatus) {
        const token = this.authStore.getToken();
        return await this.call<any>(
            'POST',
            `${this.ORDERS_RESOURCE}/${id}`,
            { status },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    }

    async retryFailedShippingOrders(id: string) {
        const token = this.authStore.getToken();
        return await this.call<any>('POST', `${this.ORDERS_RESOURCE}/${id}/shipping/retry`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async getCustomerOrders() {
        const token = this.authStore.getToken();

        return await this.call<any>('GET', `${this.ORDERS_RESOURCE}?page=1&perPage=0`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export default OrdersService;
