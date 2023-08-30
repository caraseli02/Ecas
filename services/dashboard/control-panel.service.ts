import {useAuthStore} from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';
import {AccountAdminSettings} from '~/types/auth/account-settings';

class ControlPanelService extends HttpFactory {
    private MAIN_RESOURCE = '/dashboard/control-panel/settings';


    async fetchCustomerSettings(id: string) {
        const authStore = useAuthStore();
        const token = authStore.getToken;
        return await this.call<AccountAdminSettings>('GET', `${this.MAIN_RESOURCE}/${id}`, null, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }
}

export default ControlPanelService;
