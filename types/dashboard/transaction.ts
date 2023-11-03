import { PaymentStatusEnum, PaymentTypeEnum } from '~/types';

export interface TransactionInterface {
    _id: string;
    shortId: string;
    orderId: string;
    userId?: string;
    businessId?: string;
    invoiceId?: string;
    amount: number;
    type: PaymentTypeEnum;
    status: PaymentStatusEnum;
    createdAt: string;
    updatedAt: string;
    checked?: boolean;
}
