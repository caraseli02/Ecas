import { SearchSimilarProductRequest } from '~/model/products/request/SearchSimilarProductRequest';
import { NewProductResponse } from '~/model/products/response/NewProductResponse';
import { ProductResponse } from '~/model/products/response/ProductResponse';
import { ProductSearchResponse } from '~/model/products/response/ProductSearchResponse';
import { SearchSimilarProductResponse } from '~/model/products/response/SearchSimilarProductResponse';
import { useFetchAPI } from '~/composables/useFetchAPI';

export const fetchProductTab = async (path: string) => {
    return await useFetchAPI<ProductResponse>(`products/${path}`, {
        method: 'GET',
    });
};

export const fetchNewProducts = async () => {
    return await useFetchAPI<NewProductResponse>('products/new-products', {
        method: 'GET',
    });
};

// export const fetchSearchProduct = async (keyword: string, page = 1, perPage = 10, sort = {}, featuresFilters = []) => {
//     let filters = {};
//
//     keyword = keyword.trim();
//
//     if (!keyword || keyword === '') {
//         filters = { page: page, perPage: perPage, ...sort };
//     } else {
//         filters = {
//             page: page,
//             perPage: perPage,
//             ...sort,
//             operator: '$or',
//             partDescription: keyword,
//             manufacturer: keyword,
//         };
//     }
//
//     return await useFetchAPI<ProductSearchResponse>('products/search', {
//         method: 'POST',
//         params: filters,
//         body: { filters: featuresFilters },
//     }).catch((err) => {
//         console.log(err);
//     });
// };

export const fetchProductByCriteria = async (payload: SearchSimilarProductRequest): Promise<SearchSimilarProductResponse> => {
    const runtimeConfig = useRuntimeConfig();
    return $fetch<SearchSimilarProductResponse>(`${runtimeConfig.public.BASE_URL_API}/products/filters/search`, {
        method: 'POST',
        body: payload,
    });
};
