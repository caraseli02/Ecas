export interface ProductCard {
  slug: string;
  title: string;
  category: string;
  price: string | number;
  discount?: number;
  cover: any;
  stock?: number;
}
