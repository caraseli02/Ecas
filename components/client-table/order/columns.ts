import type { ColumnDef } from '@tanstack/vue-table';
import { storeToRefs } from 'pinia';
import { statusColors } from './options';
import { AccountRole } from '~/types';
import type { OrderTableColumns } from '~/types';
import ColumnHeader from '~/components/dataTable/ColumnHeader.vue';
import RowActions from '~/components/dataTable/RowActions.vue';
import type { ActionOptionsConfiguration } from '~/components/dataTable/RowActions.vue';
import IdCell from '~/components/dataTable/IdCell.vue';
import OrderType from '~/components/dataTable/OrderType.vue';
import StatusWithColor from '~/components/dataTable/StatusWithColor.vue';
import UserInfo from '~/components/dataTable/UserInfo.vue';
import CellDate from '~/components/dataTable/CellDate.vue';
import { OrderTableColumnsEnum } from '~/components/client-table/order/columns.enum';
import DocumentService from '~/services/dashboard/document.service';
import { useAuthStore } from '~/store/authStore';

const authStore = useAuthStore();
const { getUserDetails } = storeToRefs(authStore);

export const columns: ColumnDef<OrderTableColumns>[] = [
  {
    accessorKey: OrderTableColumnsEnum.SHORT_ID,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Order' }),
    cell: ({ row }) =>
      h(IdCell, {
        IdCell: row.getValue(OrderTableColumnsEnum.SHORT_ID),
        orderId: row.original._id,
        notes: [],
      }),
  },
  {
    accessorKey: OrderTableColumnsEnum.TYPE,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Type' }),
    cell: ({ row }) => h(OrderType, { type: row.getValue('type') }),
  },
  {
    accessorKey: OrderTableColumnsEnum.USER_NAME,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Name' }),
    cell: ({ row }) =>
      h(UserInfo, {
        name: `${row.original.user.contactDetails.firstName} ${row.original.user.contactDetails.lastName}`,
        email: row.original.user.contactDetails.email ?? 'N/A',
      }),
  },
  {
    accessorKey: OrderTableColumnsEnum.CREATED_AT,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Date' }),
    cell: ({ row }) => h(CellDate, { inputDateString: row.getValue(OrderTableColumnsEnum.CREATED_AT) }),
  },
  {
    accessorKey: OrderTableColumnsEnum.STATUS,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Status' }),
    cell: ({ row }) =>
      h(StatusWithColor, {
        status: row.getValue(OrderTableColumnsEnum.STATUS),
        options: statusColors,
      }),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: OrderTableColumnsEnum.TOTAL,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Total' }),
    cell: ({ row }) =>
      h('div', { class: 'inline overflow-hidden' }, formatNumberWithCommas(row.getValue(OrderTableColumnsEnum.TOTAL), ' lei')),
  },
  {
    id: 'actions',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Actions' }),
    cell: ({ row }) =>
      h(RowActions, {
        row: row,
        service: DocumentService,
        options: [
          {
            label: 'View order',
            enable: true,
            navigateToRoute: `/order-summary/${row.original._id}`,
          },
          {
            label: 'Download invoice',
            enable: getUserDetails.value?.role === AccountRole.Client && row.original?.paymentDetails?.invoiceId,
            actionFn: 'downloadDocument',
            actionParameter: row.original.paymentDetails.invoiceId,
          },
        ] as ActionOptionsConfiguration[],
      }),
  },
];
