import type { SearchFiltersCategories } from '../response/ProductSearchResponse';

export interface SearchSimilarProductRequest {
  filters: SearchFiltersCategories[];
}
