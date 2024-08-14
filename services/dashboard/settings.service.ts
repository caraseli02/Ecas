import { useAuthStore } from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';
import { AccountAdminSettings } from '~/types/auth/account-settings';
import { ShippingAddressInterface } from '~/types/auth/user-interface';

class SettingsClientService extends HttpFactory {
    private MAIN = '/user';

    private authStore = useAuthStore();

    async updateShipping(address: ShippingAddressInterface[]) {
        const token = this.authStore.getToken();

        return await this.call<AccountAdminSettings>(
            'PATCH',
            `${this.MAIN}/shipping-address`,
            { address: address },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    }
}

export default SettingsClientService;
