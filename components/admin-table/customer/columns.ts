import type { ColumnDef } from '@tanstack/vue-table';
import ColumnHeader from '~/components/dataTable/ColumnHeader.vue';
import RowActions, { ActionOptionsConfiguration } from '~/components/dataTable/RowActions.vue';
import IdCell from '~/components/dataTable/IdCell.vue';
import OrderUserInfo from '~/components/dataTable/OrderUserInfo.vue';
import CellDate from '~/components/dataTable/CellDate.vue';
import { CustomerTableColumns } from '~/types/auth/user-interface';
import { CustomerTableColumnsEnum } from '~/components/admin-table/customer/columns.enum';
import AccountType from '~/components/dataTable/AccountType.vue';

const RowActionOptions: ActionOptionsConfiguration[] = [
    {
        label: 'Profile',
        // actionFn: ,
    },
    {
        label: 'Delete',
        // actionFn: $api.userDashboard.deleteUser,
    },
];

export const columns: ColumnDef<CustomerTableColumns>[] = [
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
        accessorKey: CustomerTableColumnsEnum.NAME,
        header: ({ column }) => h(ColumnHeader, { column, title: 'Name' }),
        cell: ({ row }) =>
            h(OrderUserInfo, {
                name: `${row.original.contactDetails?.firstName} ${row.original.contactDetails?.lastName}` ?? 'add userName',
                email: row.original.contactDetails?.email,
            }),
    },
    {
        accessorKey: CustomerTableColumnsEnum.ACCOUNT,
        header: ({ column }) => h(ColumnHeader, { column, title: 'Account type' }),
        cell: ({ row }) => h(AccountType, { type: row.getValue('accountType') }),
    },
    {
        accessorKey: CustomerTableColumnsEnum.COMPANY,
        header: ({ column }) => h(ColumnHeader, { column, title: 'Company' }),
        cell: ({ row }) => h(IdCell, { IdCell: row.original?.companyDetails?.name ?? '-' }),
    },
    {
        accessorKey: CustomerTableColumnsEnum.CREATED_AT,
        header: ({ column }) => h(ColumnHeader, { column, title: 'Date' }),
        cell: ({ row }) => h(CellDate, { inputDateString: row.getValue(CustomerTableColumnsEnum.CREATED_AT) }),
    },
    {
        accessorKey: CustomerTableColumnsEnum.SPENT,
        header: ({ column }) => h(ColumnHeader, { column, title: 'Spent' }),
        cell: ({ row }) => h('div', { class: 'inline overflow-hidden' }, formatNumberWithCommas((row.original.spent ?? 0) as number, '$')),
    },
    {
        accessorKey: CustomerTableColumnsEnum.ORDERS_COUNT,
        header: ({ column }) => h(ColumnHeader, { column, title: 'Orders count' }),
        cell: ({ row }) => h('div', { class: 'inline overflow-hidden' }, formatNumberWithCommas((row.original.ordersCount ?? 0) as number)),
    },
    {
        id: 'actions',
        header: ({ column }) => h(ColumnHeader, { column, title: 'Actions' }),
        cell: ({ row }) => h(RowActions, { row: row, options: RowActionOptions }),
    },
];
