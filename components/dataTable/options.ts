import { OrderStatus, OrderType, PaymentTypeEnum, type OrderTypeInfo, getPaymentTypeById, PaymentStatusEnum, PaymentTypeOption, PaymentStatusOption, getPaymentStatusById } from '~/types/order-summary/item';

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
  [OrderStatus.OnDispute]: 'bg-yellow-500',
  [OrderStatus.Disputed]: 'bg-yellow-600',
  [OrderStatus.Refunded]: 'bg-red-500',
  [OrderStatus.Returned]: 'bg-red-600', 
  [OrderStatus.Shipped]: 'bg-green-700',
  [OrderStatus.Delivered]: 'bg-green-800',
  [OrderStatus.PaymentDeclined]: 'bg-red-700',
  [OrderStatus.Pending]: 'bg-yellow-400',
  [OrderStatus.AwaitingShipment]: 'bg-yellow-300',
  [OrderStatus.AwaitingPickup]: 'bg-yellow-200',
  [OrderStatus.PaymentReceived]: 'bg-teal-400',  
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

export const paymentTypeOptions: PaymentTypeOption[] = [
  { label: getPaymentTypeById(PaymentTypeEnum.Card), value: PaymentTypeEnum.Card, color: 'bg-green-600' },
  { label: getPaymentTypeById(PaymentTypeEnum.Credit), value: PaymentTypeEnum.Credit, color: 'bg-blue-500' },
  { label: getPaymentTypeById(PaymentTypeEnum.Cash), value: PaymentTypeEnum.Cash, color: 'bg-neutral-700' },
  { label: getPaymentTypeById(PaymentTypeEnum.Bank), value: PaymentTypeEnum.Bank, color: 'bg-neutral-700' }, // I've changed 'Bank' to 'Bank Transfer' for clarity
];

export const paymentStatusOptions: PaymentStatusOption[] = [
  { label: getPaymentStatusById(PaymentStatusEnum.Pending), value: PaymentStatusEnum.Pending, color: 'bg-orange-600' },
  { label: getPaymentStatusById(PaymentStatusEnum.Paid), value: PaymentStatusEnum.Paid, color: 'bg-green-600' },
  { label: getPaymentStatusById(PaymentStatusEnum.Canceled), value: PaymentStatusEnum.Canceled, color: 'bg-rose-500' },
  { label: getPaymentStatusById(PaymentStatusEnum.Declined), value: PaymentStatusEnum.Declined, color: 'bg-rose-500' },
];
