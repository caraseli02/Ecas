import type { CartProductsInterface } from '~/model/cart/response/cart.interface';

export interface AddToCartRequestInterface {
    products: CartProductsInterface[];
    userId: string;
}

export interface UpdateProductCartRequestInterface {
    products: CartProductsInterface[];
    userId: string;
}

export interface DeleteProductCartRequestInterface {
    products: string[];
}
