import { SearchSimilarProductRequest } from "~/model/products/request/SearchSimilarProductRequest";
import { NewProductResponse } from "~/model/products/response/NewProductResponse";
import { ProductResponse } from "~/model/products/response/ProductResponse";
import { ProductSearchResponse } from "~/model/products/response/ProductSearchResponse";
import { SearchSimilarProductResponse } from "~/model/products/response/SearchSimilarProductResponse";

export const fetchProductTab = async (path: string) => {
    return await useFetchAPI<ProductResponse>(`products/${path}`, {
        method: "GET"
    });
}

export const fetchNewProducts = async () => {
    return await useFetchAPI<NewProductResponse>('products/new-products', {
        method: "GET",
    })
}

export const fetchSearchProduct = async (keyword: string) => {
    return await useFetchAPI<ProductSearchResponse>("products/search", {
        method: "GET",
        params: {
            page: 1,
            perPage: 10,
            operator: '$or',
            partDescription: keyword,
            manufacturer: keyword
        }
    })
}

export const fetchProductByCriteria = async(payload: SearchSimilarProductRequest): Promise<SearchSimilarProductResponse> => {
    const runtimeConfig = useRuntimeConfig()
    return $fetch<SearchSimilarProductResponse>(`${runtimeConfig.public.BASE_URL_API}/products/filters/search`, {
        method: 'POST',
        body: payload
    })
}