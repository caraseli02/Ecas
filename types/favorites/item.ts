import { ProductInterface } from '~/model/products/response/ProductResponse';

export interface FavoriteItem {
    id: string;
    type: 'folder' | 'product';
    title: string;
    description?: string;
    items?: FavoriteItem[];
    selected?: boolean;
    quantity?: number;
    productEntity: ProductInterface;
    image?: any;
}
