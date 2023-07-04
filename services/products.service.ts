import HttpFactory from '@/composables/HttpFactory';
import { SearchSimilarProductRequest } from '~/model/products/request/SearchSimilarProductRequest';
import { NewProductResponse } from '~/model/products/response/NewProductResponse';
import { ProductResponse } from '~/model/products/response/ProductResponse';
import { ProductSearchResponse } from '~/model/products/response/ProductSearchResponse';
import { SearchSimilarProductResponse } from '~/model/products/response/SearchSimilarProductResponse';
import { useFetchAPI } from '~/composables/useFetchAPI';

class ProductService extends HttpFactory {
    private RESOURCE = '/products';

    async fetchProductTab(path: string): Promise<ProductResponse> {
        return await this.call<ProductResponse>('GET', `${this.RESOURCE}/${path}`);
    }

    async fetchNewProducts(): Promise<NewProductResponse> {
        return await this.call<NewProductResponse>('GET', `${this.RESOURCE}/new-products`);
    }

    async fetchSearchProduct(keyword: string, page = 1, perPage = 10, sort = {}, featuresFilters = []): Promise<ProductSearchResponse> {
        let filters = {};

        if (!keyword || keyword === '') {
            filters = { page: page, perPage: perPage, ...sort };
        } else {
            keyword = keyword.trim();

            filters = {
                page: page,
                perPage: perPage,
                ...sort,
                operator: '$or',
                partDescription: keyword,
                manufacturer: keyword,
            };
        }

        return await this.call<ProductSearchResponse>(
            'POST',
            `${this.RESOURCE}/search`,
            {
                filters: featuresFilters,
            },
            { params: filters }
        );
    }

    async fetchProductByCriteria(payload: SearchSimilarProductRequest): Promise<SearchSimilarProductResponse> {
        return await this.call<SearchSimilarProductResponse>('POST', `${this.RESOURCE}/filters/search`, payload);
    }
}

export default ProductService;
