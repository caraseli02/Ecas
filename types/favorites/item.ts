export interface FavoriteItem {
  type: "folder" | "product";
  title: string;
  description?: string;
  items?: FavoriteItem[];
  selected: boolean;
  quantity?: number;
  image?: any;
}
