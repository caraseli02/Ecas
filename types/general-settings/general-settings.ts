import { PaymentTypeEnum } from '../order-summary/item';

export interface OrderSettingsInterface {
    deliveryTypes: DeliveryTypesInterface[];
    backorderShippingTypes: BackorderShippingTypesInterface[];
    stockorderShippingTypes: StockorderShippingTypesInterface[];
    paymentMethods: PaymentMethodsInterface[];
    smallOrderCharge: SmallOrderChargeInterface[];
}

export interface LayoutSettingsInterface {
    _id: string;
}

export interface ProductSettingsInterface {
    _id: string;
}

export interface DeliveryTypesInterface {
    _id: string;
    stripeId: string;
    title: string;
    min: number;
    max: number;
    unit: 'business_day' | 'day' | 'hour' | 'month' | 'week';
    price: number;
    active: boolean;
}

export interface BackorderShippingTypesInterface {
    _id: string;
    title: string;
    description: string;
    active: boolean;
}

export interface StockorderShippingTypesInterface {
    _id?: string;
    title: string;
    description: string;
    active: boolean;
}

export interface PaymentMethodsInterface {
    _id?: string;
    type: PaymentTypeEnum;
}

export interface SmallOrderChargeInterface {
    _id: string;
    min: number;
    max: number;
    price: number;
}

export interface ShopSettingsInterface {
    backorderThreshold: BackorderThresholdInterface;
}

export interface BackorderThresholdInterface {
    _id?: string;
    value: number;
    active: boolean;
}

export interface GeneralSettingsInterface {
    layoutSettings?: LayoutSettingsInterface;
    orderSettings?: OrderSettingsInterface;
    productSettings?: ProductSettingsInterface;
    shopSettings?: ShopSettingsInterface;
}
