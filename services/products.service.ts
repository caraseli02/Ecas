import HttpFactory from '@/composables/HttpFactory';
import { SearchSimilarProductRequest } from '~/model/products/request/SearchSimilarProductRequest';
import { NewProductResponse } from '~/model/products/response/NewProductResponse';
import { ProductParametricDataFeaturesInterface, ProductResponse } from '~/model/products/response/ProductResponse';
import { ProductSearchResponse } from '~/model/products/response/ProductSearchResponse';
import { SearchSimilarProductResponse } from '~/model/products/response/SearchSimilarProductResponse';
import { useAuthStore } from '~/store/authStore';
import { ProductDetailResponse } from '~/model/products/response/ProductDetailResponse';

class ProductService extends HttpFactory {
    private RESOURCE = '/products';
    private authStore = useAuthStore();

    async fetchSingleProduct(id: string): Promise<ProductDetailResponse> {
        const token = this.authStore.getToken();

        return await this.call<ProductDetailResponse>(
            'GET',
            `${this.RESOURCE}/${id}`,
            null,
            token
                ? {
                      headers: { Authorization: `Bearer ${token}` },
                  }
                : {}
        );
    }

    async fetchProductTab(path: string): Promise<ProductResponse> {
        const token = this.authStore.getToken();

        return await this.call<ProductResponse>(
            'GET',
            `${this.RESOURCE}/${path}`,
            null,
            token
                ? {
                      headers: { Authorization: `Bearer ${token}` },
                  }
                : {}
        );
    }

    async fetchNewProducts(): Promise<NewProductResponse> {
        const token = this.authStore.getToken();

        return await this.call<NewProductResponse>(
            'GET',
            `${this.RESOURCE}/new-products`,
            null,
            token
                ? {
                      headers: { Authorization: `Bearer ${token}` },
                  }
                : {}
        );
    }

    async fetchSearchProduct(
        keyword: string,
        category: string | null,
        page = 1,
        perPage = 10,
        sort = {},
        additionalfilters = {},
        featuresFilters: ProductParametricDataFeaturesInterface[] = []
    ): Promise<ProductSearchResponse> {
        let filters = {};
        console.log(additionalfilters);

        const headers = this.authStore.getToken() ? { Authorization: `Bearer ${this.authStore.getToken()}` } : {};

        if (!keyword || keyword === '') {
            filters = { page: page, perPage: perPage, ...sort };
        } else {
            keyword = keyword.trim();

            filters = {
                page: page,
                perPage: perPage,
                ...sort,
                operator: '$or',
                code: keyword,
                description: keyword,
                alias: keyword,
                name: keyword,
                manufacturer: keyword,
                manufacturerCode: keyword,
            };
        }

        if (category) {
            filters = { ...filters, category };
        }

        if (additionalfilters) {
            filters = { ...filters, ...additionalfilters };
        }

        return await this.call<ProductSearchResponse>(
            'POST',
            `${this.RESOURCE}/search`,
            {
                filters: featuresFilters,
            },
            { params: filters, headers }
        );
    }

    async fetchProductByCriteria(payload: SearchSimilarProductRequest): Promise<SearchSimilarProductResponse> {
        const token = this.authStore.getToken();

        return await this.call<SearchSimilarProductResponse>(
            'POST',
            `${this.RESOURCE}/filters/search`,
            payload,
            token
                ? {
                      headers: { Authorization: `Bearer ${token}` },
                  }
                : {}
        );
    }
}

export default ProductService;
