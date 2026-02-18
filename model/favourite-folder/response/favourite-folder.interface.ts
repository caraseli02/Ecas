import type { ProductDetail } from '~/model/products/response/ProductDetailResponse';

export interface FavouriteFolderResponse {
    status: string;
    data: FavouriteFolderResponseInterface[];
}

export interface FavouriteFolderResponseInterface {
    _id: string;
    userId: string;
    name: string;
    isFolder?: boolean;
    children?: FavouriteFolderResponseInterface[];
    products: { id: string; stock: number; productEntity: ProductDetail }[] | { id: string; stock: number };
}
