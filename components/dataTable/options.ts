import { OrderType, type OrderTypeInfo } from '~/types/order-summary/item';

export const orderType = [
  { value: OrderType.Stock, label: 'Stock Order', badge: { bg: 'bg-green-600', text: 'S' }},
  { value: OrderType.Back,  label: 'Back Order', badge: { bg: 'bg-purple-500', text: 'B' }},
  { value: OrderType.Mixed, label: 'Mixed Order', badge: { bg: 'bg-blue-500', text: 'M' }},
];

export function getOrderTypeInfo(Order: number): OrderTypeInfo | null {
  return orderType.find((item) => item.value === Order) as unknown as OrderTypeInfo | null;
}

// export function getIconBgColor(type: OrderType): string {
//   const orderInfo = getOrderTypeInfo(type);
//   return orderInfo?.badge.bg || 'bg-gray-400'; // Default color
// }

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
