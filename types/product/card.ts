export interface ProductCard {
  slug: string;
  title: string;
  category: string;
  price: string;
  cover: unknown;
  discount?: number;
  stock?: number;
}
