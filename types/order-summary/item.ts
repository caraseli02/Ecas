import { AddressInterface } from '../auth/user-details';

export interface OrderSummaryItem {
    title: string;
    discount?: number;
    cover: any;
    vat: number;
    quantity: number;
    price: number;
}

export enum Currency {
    RON = 'LEI',
    USD = '$',
    EUR = '€',
}

export interface OrderSummaryItem {
    title: string;
    discount?: number;
    cover: any;
    vat: number;
    quantity: number;
    price: number;
}

export interface OrderInterface {
    _id: string;
    userId: string;
    cartId: string;
    finalPrice: number;
    currency: string;
    status: string;
    shippingDetails: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        address: AddressInterface;
    };
}
