import { Notifications } from '~/types/dashboard/notification';
import { useAuthStore } from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';

class NotificationsService extends HttpFactory {
    // private RESOURCE = '/user';
    private MAIN_RESOURCE = '/notification';

    async fetchGetNotifications() {
        const authStore = useAuthStore();
        const token = authStore.getToken;
        return await this.call<Notifications>('GET', `${this.MAIN_RESOURCE}`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export default NotificationsService;
