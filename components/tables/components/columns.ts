import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

import type { Order } from '../data/schema'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'
import OrderId from './OrderId.vue'
import OrderType from './OrderType.vue'
import OrderStatus from './OrderStatus.vue'
import OrderUserInfo from './OrderUserInfo.vue'
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
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Order' }),
    cell: ({ row }) => h(OrderId, { orderId: row.getValue('shortId'), notes: row.getValue('notes') }),
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Type' }),
    cell: ({ row }) => h(OrderType, { type: row.getValue('type') }),
  },
  {
    accessorKey: 'userName',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Name', }),
    cell: ({ row }) => 
    h(OrderUserInfo, { name: row.getValue('userName') ?? 'fix userName', email: row.getValue('userEmail') ?? 'fix userEmail' }),

  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Date' }),
    cell: ({ row }) => h('div', { class: 'w-[236px]' }, row.getValue('createdAt')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),
    cell: ({ row }) => h(OrderStatus, { status: row.getValue('status') }),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Total' }),
    cell: ({ row }) => h('div', { class: 'w-[144px]' }, row.getValue('total')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]
