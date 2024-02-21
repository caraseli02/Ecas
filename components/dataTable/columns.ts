import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

import type { Order } from '../client/data/schema'
import ColumnHeader from './ColumnHeader.vue'
import RowActions from './RowActions.vue'
import OrderId from './OrderId.vue'
import OrderType from './OrderType.vue'
import OrderStatus from './OrderStatus.vue'
import OrderUserInfo from './OrderUserInfo.vue'
import OrderDate from './OrderDate.vue'
// import { Checkbox } from '@/components/ui/checkbox'
// import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<Order>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => h(Checkbox,
  //     { 'checked': table.getIsAllPageRowsSelected(), 'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value), 'ariaLabel': 'Select all', 'class': 'translate-y-0.5' }),
  //   cell: ({ row }) => h(Checkbox,
  //     { 'checked': row.getIsSelected(), 'onUpdate:checked': value => row.toggleSelected(!!value), 'ariaLabel': 'Select row', 'class': 'translate-y-0.5' }),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'shortId',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Order' }),
    cell: ({ row }) => h(OrderId, { orderId: row.getValue('shortId'), notes: [] }),
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Type' }),
    cell: ({ row }) => h(OrderType, { type: row.getValue('type') }),
  },
  {
    accessorKey: 'userName',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Name', }),
    cell: ({ row }) => 
    h(OrderUserInfo, { name: 'add userName', email: 'add userEmail' }),

  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Date' }),
    cell: ({ row }) => h(OrderDate, { inputDateString: row.getValue('createdAt')}),
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Status' }),
    cell: ({ row }) => h(OrderStatus, { status: row.getValue('status') }),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Total' }),
    cell: ({ row }) => h('div', { class: 'inline overflow-hidden' }, formatNumberWithCommas(row.getValue('total'))),
    enableHiding: false,
  },
  {
    id: 'actions',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Actions' }),
    cell: ({ row }) => h(RowActions, { row }),
  },
]
