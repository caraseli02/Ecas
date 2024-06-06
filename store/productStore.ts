import { defineStore } from 'pinia';
import { ProductParametricDataFeaturesInterface } from '~/model/products/response/ProductResponse';
import { SearchData } from '~/model/products/response/ProductSearchResponse';

export const useProductStore = defineStore({
    id: 'product-store',
    state: () => {
        return {
            similarProductFeatures: null as ProductParametricDataFeaturesInterface[] | null,
            similarProducts: null as SearchData | null,
        };
    },
    actions: {
        setSimilarProductFeatures(features: ProductParametricDataFeaturesInterface[]) {
            this.similarProductFeatures = features;
        },
        setSimilarProducts(products: SearchData) {
            this.similarProducts = products;
        },
    },
    getters: {
        getSimilarProductFeatures: (state) => state.similarProductFeatures as ProductParametricDataFeaturesInterface[],
        getSimilarProducts: (state) => state.similarProducts as SearchData,
    },
});
