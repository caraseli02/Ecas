import { NewProductResponse } from "~/model/products/response/NewProductResponse";
import { ProductResponse } from "~/model/products/response/ProductResponse";
import { ProductSearchResponse } from "~/model/products/response/ProductSearchResponse";

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
            perPage: 8,
            operator: '$and',
            partDescription: keyword
        }
    })
}