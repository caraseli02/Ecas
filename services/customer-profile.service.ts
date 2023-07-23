import {
    CustomersProfileInformation,

} from '~/model/dashboard/customer-information/customer-information';
import { useAuthStore } from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';

class CustomerProfileService extends HttpFactory {
    private RESOURCE = '/user';
    private MAIN_RESOURCE = '/dashboard/users/profile';

    async fetchCustomerInformation(userID : string) {
        const authStore = useAuthStore();
        const token = authStore.getToken;
        return await this.call<CustomersProfileInformation>('GET', `${this.MAIN_RESOURCE}/${userID}/customer-information`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export default CustomerProfileService;
