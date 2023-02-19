export interface ProductCard {
  slug: string;
  title: string;
  category: string;
  price: number;
  discount?: number;
  cover: any;
  stock?: number;
}
