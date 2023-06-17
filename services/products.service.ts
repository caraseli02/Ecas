import HttpFactory from '@/composables/HttpFactory';
import { SearchSimilarProductRequest } from '~/model/products/request/SearchSimilarProductRequest';
import { NewProductResponse } from '~/model/products/response/NewProductResponse';
import { ProductResponse } from '~/model/products/response/ProductResponse';
import { ProductSearchResponse } from '~/model/products/response/ProductSearchResponse';
import { SearchSimilarProductResponse } from '~/model/products/response/SearchSimilarProductResponse';

class ProductService extends HttpFactory {
  private RESOURCE = '/products';

  async fetchProductTab(path: string): Promise<ProductResponse> {
    return await this.call<ProductResponse>('GET', `${this.RESOURCE}/${path}`);
  }

  async fetchNewProducts(path: string): Promise<NewProductResponse> {
    return await this.call<NewProductResponse>('GET', `${this.RESOURCE}/new-products`);
  }

  async fetchSearchProduct(keyword: string): Promise<ProductSearchResponse> {
    return await this.call<ProductSearchResponse>('POST', `${this.RESOURCE}/search`, {}, {
        params: {
            page: 1,
            perPage: 10,
            operator: '$or',
            partDescription: keyword,
            manufacturer: keyword
        }
    });
  }

  async fetchProductByCriteria(payload: SearchSimilarProductRequest): Promise<SearchSimilarProductResponse> {
    return await this.call<SearchSimilarProductResponse>('POST', `${this.RESOURCE}/filters/search`, payload);
  }
}

export default ProductService;