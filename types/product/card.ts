export interface ProductCard {
  slug: string;
  title: string;
  category: string;
  price: string;
  cover: any;
  discount?: number;
  stock?: number;
}
