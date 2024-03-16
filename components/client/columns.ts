import type { ColumnDef } from '@tanstack/vue-table'
import { OrderTableColumns, type OrderInterface } from '~~/types';
import ColumnHeader from '~/components/dataTable/ColumnHeader.vue'
import RowActions from '~/components/dataTable/RowActions.vue'
import OrderId from '~/components/dataTable/OrderId.vue'
import OrderType from '~/components/dataTable/OrderType.vue'
import OrderStatus from '~/components/dataTable/OrderStatus.vue'
import OrderUserInfo from '~/components/dataTable/OrderUserInfo.vue'
import OrderDate from '~/components/dataTable/OrderDate.vue'
import { statuses } from '~/components/dataTable/options'
// import { Checkbox } from '@/components/ui/checkbox'
// import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<OrderTableColumns>[] = [
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
    h(OrderUserInfo, { name: row.getValue('userName') ?? 'add userName', email: 'add userEmail' }),

  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Date' }),
    cell: ({ row }) => h(OrderDate, { inputDateString: row.getValue('createdAt')}),
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
  },
  {
    id: 'actions',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Actions' }),
    cell: ({ row }) => h(RowActions, { row }),
  },
]
