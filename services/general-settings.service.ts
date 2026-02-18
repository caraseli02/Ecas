import HttpFactory from '~/composables/HttpFactory';
import { useAuthStore } from '~/store/authStore';
import type { GeneralSettingsInterface } from '~/types/general-settings/general-settings';

class GeneralSettings extends HttpFactory {
    // private RESOURCE = '/user';
    private MAIN_RESOURCE = '/general-settings';

    async fetchSettings() {
        const authStore = useAuthStore();
        const token = authStore.getToken();
        return await this.call<GeneralSettingsInterface>('GET', `${this.MAIN_RESOURCE}`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export default GeneralSettings;
