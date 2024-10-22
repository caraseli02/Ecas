import { useAuthStore } from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';
import { PriceSettingsResponseInterface } from '~/model/prices/price-settings.interface';

class SmartPricingService extends HttpFactory {
    private MAIN = '/prices';

    private authStore = useAuthStore();

    async fetchPriceSettings() {
        const token = this.authStore.getToken();
        return await this.call<PriceSettingsResponseInterface>('GET', `${this.MAIN}/price-settings`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export default SmartPricingService;
