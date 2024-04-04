import type { ColumnDef } from '@tanstack/vue-table';
import { OrderTableColumns } from '~/types';
import ColumnHeader from '~/components/dataTable/ColumnHeader.vue';
import RowActions from '~/components/dataTable/RowActions.vue';
import IdCell from '~/components/dataTable/IdCell.vue';
import OrderType from '~/components/dataTable/OrderType.vue';
import StatusWithColor from '~/components/dataTable/StatusWithColor.vue';
import UserInfo from '~/components/dataTable/UserInfo.vue';
import CellDate from '~/components/dataTable/CellDate.vue';
import { statusColors } from './options';
import { OrderTableColumnsEnum } from '~/components/client-table/order/columns.enum';

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
        accessorKey: OrderTableColumnsEnum.SHORT_ID,
        header: ({ column }) => h(ColumnHeader, { column, title: 'Order' }),
        cell: ({ row }) => h(IdCell, { IdCell: row.getValue(OrderTableColumnsEnum.SHORT_ID), notes: [] }),
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
                name: row.getValue(OrderTableColumnsEnum.USER_NAME) ?? 'add userName',
                email: 'add userEmail',
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
            h('div', { class: 'inline overflow-hidden' }, formatNumberWithCommas(row.getValue(OrderTableColumnsEnum.TOTAL), '$')),
    },
    {
        id: 'actions',
        header: ({ column }) => h(ColumnHeader, { column, title: 'Actions' }),
        cell: ({ row }) => h(RowActions, { row }),
    },
];
