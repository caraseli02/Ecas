export interface SearchItem {
  _id: string;
  slug?: string;
  title: string;
  discount?: number;
  cover: unknown;
  manufacturer: string;
  manufacturerCode: string;
  stock: number;
  description: string;
}
