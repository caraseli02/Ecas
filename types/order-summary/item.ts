import { DiscountInterface } from '~/types/auth/account-settings';
import { ProductInterface } from '~/model/products/response/ProductResponse';
import { ShippingAddressInterface } from '~/types/auth/user-details';
import {
    BackorderShippingTypesInterface,
    DeliveryTypesInterface,
    StockorderShippingTypesInterface,
} from '~/types/general-settings/general-settings';

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

export interface OrderNotesInterface {
    _id?: string;
    sender: string;
    message: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface OrderInterface {
    _id: string;
    shortId: string;
    userId?: string;
    userEmail?: string;
    userName: string;
    businessId?: string;
    products?: (CartProductsInterface & {
        discount?: DiscountInterface;
    })[];
    shippingDetails: OrderShippingDetailsInterface;
    paymentDetails?: PaymentDetails;
    total: number;
    subtotal: number;
    margin: number;
    currency: string;
    status: OrderStatus;
    type: OrderType;
    discount?: DiscountInterface;
    notes: OrderNotesInterface[];
    createdAt?: string;
    updatedAt?: string;
    backorderOption: BackorderShippingTypesInterface;
    stockorderOption: StockorderShippingTypesInterface;
    deliveryMethod: DeliveryTypesInterface;

    /**
     * If the order has a parent, it means that the order is
     * attached to the parent order (which is a Mixed Order).
     * A Mixed Order is a composition between a Stock Order and a Back Order.
     * The order cannot have a parent if the type is Mixed.
     */
    parent?: string;
}

export type OrderTableColumns = Pick<OrderInterface, 'shortId' | 'type' | 'userName' | 'createdAt' | 'status' | 'total'>;

export interface OrderRequestInterface {
    userId?: string;
    userName?: string;
    businessId?: string;
    cartId?: string;
    products?: CartProductsInterface[];
    shippingDetails: OrderShippingDetailsInterface;
    stripeCardId?: any;
    paymentDetails: PaymentDetails;
    smallOrderChargeId: string;
    currency: string;
    type: OrderType;
    discount?: DiscountInterface;
    isDraft: boolean;
    note?: OrderNotesInterface;
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
    address: ShippingAddressInterface;
    billingAddress: ShippingAddressInterface;
    deliveryTypeId: string;
    backorderShippingTypeId?: string;
    stockorderShippingTypeId?: string;
}

export interface PaymentDetails {
    type: PaymentTypeEnum;
    status?: PaymentStatusEnum;
    paymentIntentId?: string;
    card?: StripeCardInterface;
}

export interface StripeCardInterface {
    billing_details: ShippingAddressInterface;
    card: StripeCardInfoInterface;
    id: string;
    customer?: string;
    type?: string;
}

export interface StripeCardInfoInterface {
    brand?: string;
    checks?: object;
    country?: string;
    exp_month: number;
    exo_year: number;
    fingerprint?: string;
    funding?: string;
    generated_from?: string | null;
    last4: string;
    type: string;
}

export enum PaymentStatusEnum {
    Pending = 0,
    Paid = 1,
    Canceled = 2,
    Declined = 3,
}

export const getPaymentStatusById = <
    T extends {
        [index: string]: number;
    }
>(
    enumValue: number
): string | null => {
    const keys = Object.keys(PaymentStatusEnum).filter((x) => PaymentStatusEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
};

export enum PaymentTypeEnum {
    Card = 0,
    Credit = 1,
    Cash = 2,
    Bank = 3,
}

export const getPaymentTypeById = <
    T extends {
        [index: string]: number;
    }
>(
    enumValue: number
): string | null => {
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
     * Price before any discount per unit
     */
    initialUnitPrice: number;

    /**
     * Price after any discount per unit
     */
    unitPriceAfterDiscounts: number;

    /**
     * Price after applying shipping and other taxes
     */
    total: number;

    /**
     * Price after applying discounts
     */
    subtotal: number;

    /**
     * Value of the applied discount
     */
    discount: DiscountInterface;

    /** The entire product retrieved from database */
    productEntity?: ProductInterface;
}

export interface PriceHistory {
    active: boolean;
    createdAt: string;
    price: number;
    updatedAt: string;
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

// The 'as T' is a type assertion to help TypeScript
export const getOrderById = <T extends { [index: string]: number }>(enumValue: number): string | null => {
    const keys = Object.keys(OrderType as unknown as T).filter((x) => (OrderType as unknown as T)[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
  };

export interface OrderTypeInfo {
    value: OrderType;
    label: string;
    badge: { bg: string; text: string };
  }

  export enum OrderTableColumnsEnum {
    SELECT = 'select',
    SHORT_ID = 'shortId',
    TYPE = 'type',
    USER_NAME = 'userName',
    CREATED_AT = 'createdAt',
    STATUS = 'status',
    TOTAL = 'total',
    ACTIONS = 'actions'
  }

  export enum TransactionTableColumnsEnum {
    TRANSACTION_ID = 'orderShortId',
    ORDER_ID = 'orderId',
    INVOICE_ID = 'invoiceId',
    TYPE = 'type',
    CREATED_AT = 'createdAt',
    STATUS = 'status',
    TOTAL = 'amount',
    ACTIONS = 'actions'
  }
