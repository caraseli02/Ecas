export enum CustomersListFilterLabelsEnum {
  accountType = 'Account type',
  companyName = 'Company',
  startDate = 'Start date',
  endDate = 'End date',
  firstName = 'First name',
  lastName = 'Last name',
  spent = 'Spent',
  ordersCount = 'Orders count',
  email = 'Email',
  country = 'Country',

  spentFrom = 'Spent From',
  spentTo = 'Spent To',
  ordersCountFrom = 'Orders Count From',
  ordersCountTo = 'Orders Count To',

  combinedName = 'Name',
}

export enum OrdersFilterLabelsEnum {
  shortId = 'ID',
  userId = 'User ID',
  name = 'User name',
  type = 'Order type',
  status = 'Order status',
  paymentStatus = 'Payment status',
  startDate = 'Start date',
  endDate = 'End date',

  totalFrom = 'Total From',
  totalTo = 'Total To',
}

export enum TransactionsFilterLabelsEnum {
  orderShortId = 'ID',
  invoiceId = 'Invoice ID',
  type = 'Payment type',
  status = 'Order status',
  paymentStatus = 'Payment status',
  startDate = 'Start date',
  endDate = 'End date',

  amountFrom = 'Total From',
  amountTo = 'Total To',
}
