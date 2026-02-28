import type {
  CustomersByCountryInterface,
  NewCustomersInterface,
  PaginatedCustomersInterface,
  ReturningCustomersInterface,
  TotalCustomersInterface,
} from '~/model/dashboard/response/CustomerInterfaceResponse';
import { useAuthStore } from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';

class UserDashboardService extends HttpFactory {
  private RESOURCE = '/user';
  private MAIN_RESOURCE = '/dashboard/users';

  async fetchCustomersList(page: number, perPage: number, filters = {}, sort = {}) {
    const authStore = useAuthStore();
    const token = authStore.getToken();

    return await this.call<PaginatedCustomersInterface>('GET', this.RESOURCE, null, {
      params: {
        page: page,
        perPage: perPage,
        ...filters,
        ...sort,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async fetchTotalCustomersWidget(time = 7) {
    const authStore = useAuthStore();
    const token = authStore.getToken();

    return await this.call<TotalCustomersInterface>('GET', `${this.MAIN_RESOURCE}/total-customers`, null, {
      params: {
        time: time,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async fetchReturningCustomersWidget(time = 7) {
    const authStore = useAuthStore();
    const token = authStore.getToken();

    return await this.call<ReturningCustomersInterface>('GET', `${this.MAIN_RESOURCE}/returning-customers`, null, {
      params: {
        time: time,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async fetchNewCustomersWidget() {
    const authStore = useAuthStore();
    const token = authStore.getToken();

    return await this.call<NewCustomersInterface>('GET', `${this.MAIN_RESOURCE}/new-customers`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async fetchCustomersByCountryWidget() {
    const authStore = useAuthStore();
    const token = authStore.getToken();

    return await this.call<CustomersByCountryInterface>('GET', `${this.MAIN_RESOURCE}/customers-top-country`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deactivateUser(userID: string) {
    const authStore = useAuthStore();
    const token = authStore.getToken();
    return await this.call<CustomersByCountryInterface>('DELETE', `${this.RESOURCE}/deactivate/${userID}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async activateUser(userID: string) {
    const authStore = useAuthStore();
    const token = authStore.getToken();
    return await this.call('POST', `${this.RESOURCE}/activate/${userID}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async approveUser(userID: string) {
    const authStore = useAuthStore();
    const token = authStore.getToken();
    return await this.call('POST', `${this.RESOURCE}/approve/${userID}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deleteUser(userID: string) {
    const authStore = useAuthStore();
    const token = authStore.getToken();
    return await this.call('DELETE', `${this.RESOURCE}/${userID}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default UserDashboardService;
