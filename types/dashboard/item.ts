export interface DashboardCustomerTableItem {
    avatar?: any;
    name: string;
    email: string;
    account: string;
    company: string;
    registered: string;
    spent: number;
    ordersCount: number;
    id : string;
    firebaseId : string;
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
