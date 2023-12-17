import {ProductInterface} from '~/model/products/response/ProductResponse';

export enum ProductAction {
    Update = 'update',
    Add = 'add',
}

export interface ProductActionObject {
    action: ProductAction;
    id: string;
    min: number;
}

export interface CartResponse {
    status: string;
    data: CartInterface;
}

export interface CartInterface {
    userId: string;
    products: CartProductsInterface[];
    startDate: string;
    endDate: string;
}

export interface CartProductsInterface {
    /**
     * Database id
     */
    _id?: string;

    /**
     * Product id
     */
    id: string;

    /**
     * Number of pieces wanted for a specific product
     */
    stock: number;

    /** Either the sent product is a simple product or a folder ID */
    isFolder: boolean;

    /** The entire product retrieved from database */
    productEntity?: ProductInterface;
}
