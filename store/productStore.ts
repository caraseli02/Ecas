import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { ProductParametricDataFeaturesInterface } from '~/model/products/response/ProductResponse';
import { SearchData } from '~/model/products/response/ProductSearchResponse';

export const useProductStore = defineStore('product-store', () => {
    const similarProductFeatures = ref<ProductParametricDataFeaturesInterface[] | null>(null);
    const similarProducts = ref<SearchData | null>(null);
    const showSimilarOnly = ref(false);

    const setSimilarProductFeatures = (features: ProductParametricDataFeaturesInterface[]) => {
        similarProductFeatures.value = features;
    };

    const setSimilarProducts = (products: SearchData) => {
        similarProducts.value = products;
    };

    const getSimilarProductFeatures = computed(() => similarProductFeatures.value as ProductParametricDataFeaturesInterface[]);
    const getSimilarProducts = computed(() => similarProducts.value as SearchData);

    return {
        similarProductFeatures,
        similarProducts,
        setSimilarProductFeatures,
        setSimilarProducts,
        getSimilarProductFeatures,
        getSimilarProducts,
        showSimilarOnly,
    };
});
