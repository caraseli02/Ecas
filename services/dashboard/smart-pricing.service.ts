import { useAuthStore } from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';
import { PriceSettingsResponseInterface, PriceSettingsTypeEnum } from '~/model/prices/price-settings.interface';

class SmartPricingService extends HttpFactory {
    private MAIN = '/prices';

    private authStore = useAuthStore();

    async fetchPriceSettings() {
        const token = this.authStore.getToken();
        return await this.call<PriceSettingsResponseInterface>('GET', `${this.MAIN}/price-settings`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async setNewPriceRange(range: { min: number | null; max: number | null; label: string | null }) {
        const token = this.authStore.getToken();
        const data = {
            type: PriceSettingsTypeEnum.Range,
            range: {
                min: range.min,
                max: range.max,
            },
            label: range.label,
        };
        console.log(data);
        return await this.call<{ status: string; data: string }>('POST', `${this.MAIN}/price-range`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async setNewQuantityRange(quantity: { values: number[]; label: string | null }) {
        const token = this.authStore.getToken();
        const data = {
            type: PriceSettingsTypeEnum.Quantity,
            values: quantity.values,
            label: quantity.label,
        };
        console.log(data);
        return await this.call<{ status: string; data: string }>('POST', `${this.MAIN}/quantity`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export default SmartPricingService;
