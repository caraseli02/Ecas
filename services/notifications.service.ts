import type { Notification } from '~/types/dashboard/notification';
import { useAuthStore } from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';

class NotificationsService extends HttpFactory {
  // private RESOURCE = '/user';
  private MAIN_RESOURCE = '/notification';

  async fetchGetNotifications() {
    const authStore = useAuthStore();
    const token = authStore.getToken();
    return await this.call<Notification[]>('GET', `${this.MAIN_RESOURCE}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async fetchMarkNotificationAsRead(id: string) {
    const authStore = useAuthStore();
    const token = authStore.getToken();
    return await this.call<any>('PUT', `${this.MAIN_RESOURCE}/${id}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deleteNotificationById(id: string) {
    const authStore = useAuthStore();
    const token = authStore.getToken();
    return await this.call<any>('DELETE', `${this.MAIN_RESOURCE}/${id}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default NotificationsService;
