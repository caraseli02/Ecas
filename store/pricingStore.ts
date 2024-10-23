import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';
import { PriceSettingsInterface, PriceSettingsTypeEnum } from '~/model/prices/price-settings.interface';
import { smartPricingMargin, smartPricingQuantity, smartPricingRange } from '~/helpers/smart-pricing.helper';

export const usePricingStore = defineStore({
    id: 'pricing-store',
    state: () => {
        return {
            pricing: null as PriceSettingsInterface[] | null,
            range: [] as any | [],
            quantity: null as any | null,
            margin: null as any | null,
        };
    },
    actions: {
        setPricing(pricing: PriceSettingsInterface[]) {
            this.pricing = pricing;
        },
        async updateAndReturnPricing() {
            const { $api } = useNuxtApp();
            const pricingResponse = await $api.smartPricing.fetchPriceSettings();

            if (!pricingResponse || pricingResponse.status !== 'success') {
                return Promise<null>;
            }

            this.pricing = pricingResponse.data;
            this.range = smartPricingRange(
                this.pricing.filter((price) => price.type === PriceSettingsTypeEnum.Range) // Filter to ensure you get an array
            );
            this.quantity = smartPricingQuantity(
                this.pricing.filter((quantity) => quantity.type === PriceSettingsTypeEnum.Quantity) // Filter to ensure you get an array
            );
            this.margin = smartPricingMargin(
                this.pricing.filter((margin) => margin.type === PriceSettingsTypeEnum.Margins) // Filter to ensure you get an array
            );
            return this.pricing as PriceSettingsInterface[];
        },
        emptyPricing() {
            this.pricing = null;
        },
    },
    getters: {
        getPricing: async (state) => {
            const { $api } = useNuxtApp();

            if (!state.pricing) {
                const pricingResponse = await $api.smartPricing.fetchPriceSettings();

                if (!pricingResponse) {
                    return Promise<null>;
                }

                return pricingResponse.data;
            }

            return state.pricing as PriceSettingsInterface[];
        },
    },
    persist: {
        storage: persistedState.localStorage,
    },
});
