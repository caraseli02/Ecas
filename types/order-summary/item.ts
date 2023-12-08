import { DiscountInterface } from '~/types/auth/account-settings';
import { ProductInterface } from '~/model/products/response/ProductResponse';
import { AddressInterface } from '~/types/auth/user-details';
import { e } from 'ohmyfetch/dist/error-65d5de49';

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
    shortId: string;
    userId?: string;
    userName: string;
    businessId?: string;
    products?: (CartProductsInterface & { discount?: DiscountInterface })[];
    shippingDetails: OrderShippingDetailsInterface;
    paymentDetails?: PaymentDetails;
    total: number;
    subtotal: number;
    margin: number;
    currency: string;
    status: OrderStatus;
    type: OrderType;
    discount?: DiscountInterface;
    createdAt?: string;
    updatedAt?: string;
    backorderOption: BackorderOptionEnum;
    deliveryMethod: DeliveryMethodEnum;

    /**
     * If the order has a parent, it means that the order is
     * attached to the parent order (which is a Mixed Order).
     * A Mixed Order is a composition between a Stock Order and a Back Order.
     * The order cannot have a parent if the type is Mixed.
     */
    parent?: string;
}

export enum DeliveryMethodEnum {
    Free = 0,
    Standard = 1,
    Express = 2,
}

export enum BackorderOptionEnum {
    None = 0,
    Partial = 1,
    Full = 2,
}

export interface OrderShippingDetailsInterface {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    country: string;
    mobile?: number;
    email?: string;
    address: AddressInterface;
    billingAddress: AddressInterface;
}

export interface PaymentDetails {
    type: PaymentTypeEnum;
    status?: PaymentStatusEnum;
    paymentIntentId?: string;
}

export enum PaymentStatusEnum {
    Pending = 0,
    Paid = 1,
    Canceled = 2,
    Declined = 3,
}

export const getPaymentStatusById = <T extends { [index: string]: number }>(enumValue: number): string | null => {
    const keys = Object.keys(PaymentStatusEnum).filter((x) => PaymentStatusEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
};

export enum PaymentTypeEnum {
    Card = 0,
    Credit = 1,
    Cash = 2,
    Bank = 3,
}

export const getPaymentTypeById = <T extends { [index: string]: number }>(enumValue: number): string | null => {
    const keys = Object.keys(PaymentTypeEnum).filter((x) => PaymentTypeEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
};

export interface CartProductsInterface {
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

    /**
     * Price before any discount
     */
    initialPrice?: number;

    /**
     * Price after applying discounts
     */
    discountPrice?: number;

    /**
     * Value of the applied discount
     */
    discount?: DiscountInterface;

    /** The entire product retrieved from database */
    productEntity?: ProductInterface;
}

export enum OrderStatus {
    Completed = 'Completed',
    Canceled = 'Canceled',
    OnDispute = 'OnDispute',
    Disputed = 'Disputed',
    PartiallyRefunded = 'Partially Refunded',
    Refunded = 'Refunded',
    Returned = 'Returned',
    PartiallyShipped = 'Partially Shipped',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    AbandonedCheckout = 'Abandoned Checkout',
    VerificationRequired = 'Verification Required',
    Processing = 'Processing',
    Pending = 'Pending',
    AwaitingPayment = 'Awaiting Payment',
    AwaitingFulfillment = 'Awaiting Fulfillment',
    AwaitingShipment = 'Awaiting Shipment',
    AwaitingPickup = 'Awaiting Pickup',
    PaymentReceived = 'Payment Received',
    PaymentDeclined = 'Payment Declined',
}

export enum OrderType {
    Stock = 0,
    Back = 1,
    Mixed = 2,
}

export const getOrderById = <T extends { [index: string]: number }>(enumValue: number): string | null => {
    const keys = Object.keys(OrderType).filter((x) => OrderType[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
};
