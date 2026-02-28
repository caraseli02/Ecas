import type { NewProducts } from '../NewProducts';

export interface NewProductResponse {
  data: [NewProducts];
  status: string;
}
