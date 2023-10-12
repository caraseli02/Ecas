import {useAuthStore} from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';

class OrdersService extends HttpFactory {
    private ORDERS_RESOURCE = '/dashboard/orders';

    private authStore = useAuthStore();


    async fetchWidget(type: 'string', time: number) {
        const token = this.authStore.getToken;
        return await this.call<any>('GET', `${this.ORDERS_RESOURCE}/${type}?time=${time}`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }
}

export default OrdersService;
