export const orderType = [
  {
    'value': 'stock_order',
    'label': 'Stock Order',
    'badge': {
      bg: 'bg-green-500',
      text: 'S',
    }
  },
  {
    'value': 'back_order',
    'label': 'Back Order',
    'badge': {
      bg: 'bg-purple-500',
      text: 'B',
    }
  },
  {
    'value': 'mixed_order',
    'label': 'Mixed Order',
    'badge': {
      bg: 'bg-blue-500',
      text: 'M',
    }
  }
]

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
    'color': 'bg-green-500'
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
