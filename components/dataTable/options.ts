import { OrderStatus, OrderType, type OrderTypeInfo } from '~/types/order-summary/item';

export const orderType = [
  { value: OrderType.Stock, label: 'Stock Order', badge: { bg: 'bg-green-600', text: 'S' }},
  { value: OrderType.Back,  label: 'Back Order', badge: { bg: 'bg-purple-500', text: 'B' }},
  { value: OrderType.Mixed, label: 'Mixed Order', badge: { bg: 'bg-blue-500', text: 'M' }},
];

export function getOrderTypeInfo(Order: number): OrderTypeInfo | null {
  return orderType.find((item) => item.value === Order) as unknown as OrderTypeInfo | null;
}

export const statusColors = {
  [OrderStatus.AbandonedCheckout]: 'bg-gray-800',
  [OrderStatus.AwaitingPayment]: 'bg-orange-500',
  [OrderStatus.PartiallyRefunded]: 'bg-purple-500',
  [OrderStatus.Completed]: 'bg-green-600',
  [OrderStatus.PartiallyShipped]: 'bg-blue-500',
  [OrderStatus.Processing]: 'bg-purple-500',
  [OrderStatus.AwaitingFulfillment]: 'bg-orange-500', 
  [OrderStatus.VerificationRequired]: 'bg-gray-500', 
  [OrderStatus.Canceled]: 'bg-gray-500', 
  // ... potentially more statuses
};

export const statuses = [
  {
    'value': 'Abandoned Checkout',
    'label': 'Abandoned Checkout',
    'color': 'bg-gray-800'
  },
  {
    'value': 'Awaiting Payment',
    'label': 'Awaiting Payment',
    'color': 'bg-orange-500'
  },
  {
    'value': 'Partially Refunded',
    'label': 'Partially Refunded',
    'color': 'bg-purple-500'
  },
  {
    'value': 'Completed',
    'label': 'Completed',
    'color': 'bg-green-600'
  },
  {
    'value': 'Partially Shipped',
    'label': 'Partially Shipped',
    'color': 'bg-blue-500'
  },
  {
    'value': 'Processing',
    'label': 'Processing',
    'color': 'bg-purple-500'
  },
  {
    'value': 'Awaiting Fulfillment',
    'label': 'Awaiting Fulfillment',
    'color': 'bg-orange-500'
  }
];
