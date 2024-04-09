import { OrderStatus, OrderType, PaymentStatusEnum } from '~/types';
import { AccountAdminSettings } from '~/types/auth/account-settings';
import { AddressInterface } from '~/types/auth/user-interface';

export interface DashboardCustomerTableItem {
    avatar?: any;
    name: string;
    email: string;
    account: string;
    company: string;
    registered: string;
    spent: number;
    ordersCount: number;
    id: string;
    firebaseId: string;
    active: boolean;
    adminSettings?: AccountAdminSettings;
    address: AddressInterface;
}

export interface DashboardCustomerOrderItem {
    id: string;
    type: 'stock-order' | 'backorder' | 'mixed-order';
    date: number;
    status:
        | 'abandoned-checkout'
        | 'awaiting-payment'
        | 'partially-refunded'
        | 'completed'
        | 'partially-shipped'
        | 'processing'
        | 'payment-received'
        | 'payment-declined'
        | 'awaiting-fulfillment';
    total: number;
}

export interface DashboardControlPanelTransactionHistoryItem {
    id: string;
    invoiceId: string;
    amount: string;
    type: 'debit' | 'credit';
    date: number;
    status: 'success' | 'pending' | 'declined';
    checked: boolean;
}

export interface DashboardOrderItem {
    id: string;
    note?: string;
    type: OrderType;
    date: string;
    name?: string;
    firebaseId: string;
    email?: string;
    customer?: {
        avatar?: any;
        name: string;
        discount?: number;
        email: string;
        flag: any;
        active: boolean;
    };
    payment: PaymentStatusEnum;
    status: OrderStatus;
    total: number;
}
