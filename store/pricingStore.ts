import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';
import Emitter from 'tiny-emitter/instance.js';
import { PriceSettingsInterface } from '~/model/prices/price-settings.interface';

export const usePricingStore = defineStore({
    id: 'pricing-store',
    state: () => {
        return {
            pricing: null as PriceSettingsInterface[] | null,
        };
    },
    actions: {
        setPricing(pricing: PriceSettingsInterface[]) {
            this.pricing = pricing;
            Emitter.emit('update-pricing', pricing);
        },
        async updateAndReturnPricing() {
            const { $api } = useNuxtApp();
            const pricingResponse = await $api.smartPricing.fetchPriceSettings();

            if (!pricingResponse || pricingResponse.status !== 'success') {
                return Promise<null>;
            }

            this.pricing = pricingResponse.data;

            Emitter.emit('update-pricing', this.pricing);

            return this.pricing as PriceSettingsInterface[];
        },
        emptyCart() {
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
