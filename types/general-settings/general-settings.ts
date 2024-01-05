import {PaymentTypeEnum} from '../order-summary/item'

export interface OrderSettingsInterface {
    shippingTypes: ShippingTypesInterface[];
    backorderShippingTypes: BackorderShippingTypesInterface[];
    paymentMethods: PaymentMethodsInterface[];
    smallOrderCharge: SmallOrderChargeInterface[];
}

export interface LayoutSettingsInterface {
    _id: string;
}

export interface ShopSettingsInterface {
    _id: string;
}

export interface ProductSettingsInterface {
    _id: string;
}

export interface ShippingTypesInterface {
    _id?: string;
    stripeId: string;
    title: string;
    min: number;
    max: number;
    unit: 'business_day' | 'day' | 'hour' | 'month' | 'week';
    price: number;
    active: boolean;
}

export interface BackorderShippingTypesInterface {
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
    _id?: string;
    min: number;
    max: number;
    price: number;
}

export interface GeneralSettingsInterface {
    layoutSettings?: LayoutSettingsInterface;
    orderSettings?: OrderSettingsInterface;
    productSettings?: ProductSettingsInterface;
    shopSettings?: ShopSettingsInterface;
}

