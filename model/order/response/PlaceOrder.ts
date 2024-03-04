import { PaymentIntent } from '@stripe/stripe-js';
import { PaymentStatusEnum } from '~/types';

export interface OrderCreateResponse {
    result?: PaymentIntent;
    useExistingPaymentMethod: boolean;
    clientSecret?: string;
    status: PaymentStatusEnum;
}

export interface PlaceOrderInterface {
    data: OrderCreateResponse;
    status: string;
}
