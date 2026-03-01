import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';
import { type PriceSettingsInterface, PriceSettingsTypeEnum } from '~/model/prices/price-settings.interface';
import { smartPricingMargin, smartPricingQuantity, smartPricingRange } from '~/helpers/smart-pricing.helper';

export const usePricingStore = defineStore({
  id: 'pricing-store',
  state: () => {
    return {
      pricing: null as PriceSettingsInterface[] | null,
      range: [] as any[],
      quantity: null as any | null,
      margin: null as any | null,
      showEntryModal: false,
      showMarginModal: false,
      showQuantityModal: false,
      editEntryPriceModal: null as PriceSettingsInterface | null,
      editQuantityModal: null as any | null,
      editMarginModal: null as any | null,
      type: 'add' || 'edit',
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
        this.pricing.filter(price => price.type === PriceSettingsTypeEnum.Range), // Filter to ensure you get an array
      );
      this.quantity = smartPricingQuantity(
        this.pricing.filter(quantity => quantity.type === PriceSettingsTypeEnum.Quantity), // Filter to ensure you get an array
      );
      this.margin = smartPricingMargin(
        this.pricing.filter(margin => margin.type === PriceSettingsTypeEnum.Margins), // Filter to ensure you get an array
      );
      return this.pricing as PriceSettingsInterface[];
    },
    emptyPricing() {
      this.pricing = null;
    },
    addPriceRange(range: { min: number | null; max: number | null }, label: string | null, _id: string) {
      this.range.push({ value: [`$${range.min} - $${range.max}`], label: label, selected: false, _id: _id });
    },
    addQuantityRange(quantity: { values: string[]; label: string }, _id: string) {
      this.quantity.push({ value: quantity.values, label: quantity.label, selected: false, _id: _id });
    },
    addMarginRange(margin: { values: string[]; label: string | null }, _id: string) {
      this.margin.push({ value: margin.values, label: margin.label, selected: false, _id: _id });
    },
    removePriceRange(_id: string) {
      this.range = this.range.filter((range: any) => range._id !== _id);
    },
    removeQuantityRange(_id: string) {
      this.quantity = this.quantity.filter((quantity: any) => quantity._id !== _id);
    },
    removeMarginRange(_id: string) {
      this.margin = this.margin.filter((margin: any) => margin._id !== _id);
    },
    editPriceRange(range: { min: number | null; max: number | null }, label: string | null, _id: string) {
      this.range = this.range.map((r: any) => {
        if (r._id === _id) {
          r.value = [`$${range.min} - $${range.max}`];
          r.label = label;
        }
        return r;
      });
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
    storage: piniaPluginPersistedstate.localStorage(),
  },
});
