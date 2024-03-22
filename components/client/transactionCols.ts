import type { ColumnDef } from '@tanstack/vue-table'
import { PaymentStatusEnum, PaymentTypeEnum, TransactionTableColumnsEnum } from '~~/types'; // Update the import path
import ColumnHeader from '~/components/dataTable/ColumnHeader.vue'
import RowActions from '~/components/dataTable/RowActions.vue'
import OrderId from '~/components/dataTable/OrderId.vue' 
import EnumToText from '~/components/dataTable/EnumToText.vue'
import OrderDate from '~/components/dataTable/OrderDate.vue'

export const columns: ColumnDef<TransactionTableColumnsEnum>[] = [ // Update here
  {
    accessorKey: TransactionTableColumnsEnum.TRANSACTION_ID, // Update accessor keys
    header: ({ column }) => h(ColumnHeader, { column, title: 'Transaction ID' }), // Adapt titles if needed
    cell: ({ row }) => h(OrderId, { orderId: row.getValue(TransactionTableColumnsEnum.TRANSACTION_ID) }), 
  },
  {
    accessorKey: TransactionTableColumnsEnum.ORDER_ID,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Order ID' }),
    cell: ({ row }) => h(OrderId, { orderId: row.getValue(TransactionTableColumnsEnum.ORDER_ID) }),

  },
  {
    accessorKey: TransactionTableColumnsEnum.INVOICE_ID,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Invoice ID' }),
    cell: ({ row }) => h(OrderId, { orderId: row.getValue(TransactionTableColumnsEnum.INVOICE_ID) }),

  },

  {
    accessorKey: TransactionTableColumnsEnum.TYPE,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Type', }), // Change the title if needed
    cell: ({ row }) => h(EnumToText, { val: row.getValue('type'), options: PaymentTypeEnum }), // Assuming you still want OrderType
  },
  {
    accessorKey: TransactionTableColumnsEnum.CREATED_AT,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Date' }),
    cell: ({ row }) => h(OrderDate, { inputDateString: row.getValue(TransactionTableColumnsEnum.CREATED_AT)}),
  },
  {
    accessorKey: TransactionTableColumnsEnum.STATUS,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Status' }),
    cell: ({ row }) => h(EnumToText, { val: row.getValue(TransactionTableColumnsEnum.STATUS), options: PaymentStatusEnum }),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: TransactionTableColumnsEnum.TOTAL,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Total' }),
    cell: ({ row }) => h('div', { class: 'inline overflow-hidden' }, formatNumberWithCommas(row.getValue(TransactionTableColumnsEnum.TOTAL))),
  },
  {
    id: TransactionTableColumnsEnum.ACTIONS, // Update the id
    header: ({ column }) => h(ColumnHeader, { column, title: 'Actions' }),
    cell: ({ row }) => h(RowActions, { row }),
  },
]
