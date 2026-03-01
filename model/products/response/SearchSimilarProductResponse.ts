import type { ProductInterface } from './ProductResponse';

export interface SearchSimilarProductResponse {
  data: SimilarProductData;
  status: string;
}

export interface SimilarProductData {
  count: number;
  items: ProductInterface[];
}
