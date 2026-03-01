import type { ColumnDef } from '@tanstack/vue-table';
import ColumnHeader from '~/components/dataTable/ColumnHeader.vue';
import RowActions from '~/components/dataTable/RowActions.vue';
import type { ActionOptionsConfiguration } from '~/components/dataTable/RowActions.vue';
import IdCell from '~/components/dataTable/IdCell.vue';
import EnumToText from '~/components/dataTable/EnumToText.vue';
import CellDate from '~/components/dataTable/CellDate.vue';
import { paymentStatusOptions, paymentTypeOptions } from '~/components/client-table/transaction/options';
import { TransactionTableColumnsEnum } from '~/components/client-table/transaction/columns.enum';
import { AccountRole } from '~/types';
import DocumentService from '~/services/dashboard/document.service';
import { formatNumberWithCommas } from '~/utils/numbers';
// import { useAuthStore } from '~/store/authStore';
// import { storeToRefs } from 'pinia';

// const authStore = useAuthStore();
// const { getUserDetails } = storeToRefs(authStore);

export const columns: ColumnDef<TransactionTableColumnsEnum>[] = [
  // Update here
  {
    accessorKey: TransactionTableColumnsEnum.TRANSACTION_ID, // Update accessor keys
    header: ({ column }) => h(ColumnHeader, { column, title: 'Transaction ID' }), // Adapt titles if needed
    cell: ({ row }) =>
      h(IdCell, {
        IdCell: row.getValue(TransactionTableColumnsEnum.TRANSACTION_ID),
        orderId: row.original.orderId,
      }),
  },
  {
    accessorKey: TransactionTableColumnsEnum.ORDER_ID,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Order ID' }),
    cell: ({ row }) =>
      h(IdCell, {
        IdCell: row.getValue(TransactionTableColumnsEnum.ORDER_ID),
        orderId: row.original.orderId,
      }),
  },
  {
    accessorKey: TransactionTableColumnsEnum.INVOICE_ID,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Invoice ID' }),
    cell: ({ row }) =>
      h(IdCell, {
        IdCell: row.getValue(TransactionTableColumnsEnum.INVOICE_ID),
        invoiceId: row.original?.paymentDetails?.invoiceId || '#',
      }),
  },

  {
    accessorKey: TransactionTableColumnsEnum.TYPE,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Type' }), // Change the title if needed
    cell: ({ row }) => h(EnumToText, { val: row.getValue('type'), options: paymentTypeOptions }), // Assuming you still want OrderType
  },
  {
    accessorKey: TransactionTableColumnsEnum.CREATED_AT,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Date' }),
    cell: ({ row }) => h(CellDate, { inputDateString: row.getValue(TransactionTableColumnsEnum.CREATED_AT) }),
  },
  {
    accessorKey: TransactionTableColumnsEnum.STATUS,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Status' }),
    cell: ({ row }) =>
      h(EnumToText, {
        val: row.getValue(TransactionTableColumnsEnum.STATUS),
        options: paymentStatusOptions,
      }),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: TransactionTableColumnsEnum.TOTAL,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Total' }),
    cell: ({ row }) =>
      h('div', { class: 'inline overflow-hidden' }, `lei ${formatNumberWithCommas(row.getValue(TransactionTableColumnsEnum.TOTAL))}`),
  },
  {
    id: TransactionTableColumnsEnum.ACTIONS, // Update the id
    header: ({ column }) => h(ColumnHeader, { column, title: 'Actions' }),
    cell: ({ row }) =>
      h(RowActions, {
        row: row,
        service: DocumentService,
        options: [
          {
            label: 'Download invoice',
            // enable: getUserDetails.value.role === AccountRole.Client && row.original?.invoiceId,
            actionFn: 'downloadDocument',
            actionParameter: row.original.invoiceId,
          },
        ] as unknown as ActionOptionsConfiguration[],
      }),
  },
];
