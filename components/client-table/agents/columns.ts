import type { ColumnDef } from '@tanstack/vue-table';
import ColumnHeader from '~/components/dataTable/ColumnHeader.vue';
import RowActions, { ActionOptionsConfiguration } from '~/components/dataTable/RowActions.vue';
import UserInfo from '~/components/dataTable/UserInfo.vue';
import CellDate from '~/components/dataTable/CellDate.vue';
import { AccountStatusEnum, CustomerTableColumns } from '~/types/auth/user-interface';
import { AgentsTableColumnsEnum } from '~/components/client-table/agents/columns.enum';
import { $fetch, FetchOptions } from 'ohmyfetch';
import UserDashboardService from '~/services/dashboard/user.service';
import StatusWithColor from '~/components/dataTable/StatusWithColor.vue';

const fetchOptions: FetchOptions = {
    baseURL: process.env.NUXT_PUBLIC_BASE_URL_API,
};

/** create a new instance of $fetcher with custom option */
const apiFetcher = $fetch.create(fetchOptions);

const statusName = {
    1: 'Active',
    2: 'Disabled',
    3: 'Pending'
}

const statusColors = {
    Active : 'bg-green-800',
    Disabled: 'bg-pink-500',
    Pending: 'bg-yellow-500'
};

export const columns: ColumnDef<CustomerTableColumns>[] = [
    {
        accessorKey: AgentsTableColumnsEnum.NAME,
        header: ({ column }) => h(ColumnHeader, { column, title: 'Name' }),
        cell: ({ row }) =>
            h(UserInfo, {
                name: `${row.original.contactDetails?.firstName} ${row.original.contactDetails?.lastName}` ?? 'add userName',
                email: row.original.contactDetails?.email,
                navigateToRoute: `/dashboard/customers/${row.original.firebaseId}`,
            }),
    },
        {
        accessorKey: AgentsTableColumnsEnum.CREATED_AT,
        header: ({ column }) => h(ColumnHeader, { column, title: 'Date' }),
        cell: ({ row }) => h(CellDate, { inputDateString: row.getValue(AgentsTableColumnsEnum.CREATED_AT) }),
    },
    {
        accessorKey: AgentsTableColumnsEnum.STATUS,
        header: ({ column }) => h(ColumnHeader, { column, title: 'Status' }),
        cell: ({ row }) => {
            const val = row.getValue(AgentsTableColumnsEnum.STATUS)
            return h(StatusWithColor, {
                status: statusName[val],
                options: statusColors,
            })
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: AgentsTableColumnsEnum.ORDERS_COUNT,
        header: ({ column }) => h(ColumnHeader, { column, title: 'Orders' }),
        cell: ({ row }) => h('div', { class: 'inline overflow-hidden' }, formatNumberWithCommas((row.original.ordersCount ?? 0) as number)),
    },
    {
        accessorKey: AgentsTableColumnsEnum.TOTAL,
        header: ({ column }) => h(ColumnHeader, { column, title: 'Total' }),
        cell: ({ row }) =>
            h('div', { class: 'inline overflow-hidden' }, formatNumberWithCommas(row.getValue(AgentsTableColumnsEnum.TOTAL), '$')),
    },
    {
        id: 'actions',
        header: ({ column }) => h(ColumnHeader, { column, title: 'Actions' }),
        cell: ({ row }) =>
            h(RowActions, {
                row: row,
                service: UserDashboardService,
                discount: row.original?.adminSettings?.discount?.value,
                lock: row.original.status === AccountStatusEnum.Inactive,
                options: [
                    {
                        label: 'Profile',
                        enable: true,
                        navigateToRoute: `/dashboard/customers/${row.original.firebaseId}`,
                    },
                    {
                        label: 'Delete',
                        enable: true,
                        actionFn: 'deleteUser',
                    },
                    {
                        label: 'Unlock account',
                        enable: row.original.status === AccountStatusEnum.Inactive,
                        actionFn: 'activateUser',
                    },
                    {
                        label: 'Lock account',
                        enable: row.original.status === AccountStatusEnum.Active,
                        actionFn: 'deactivateUser',
                    },
                ] as ActionOptionsConfiguration[],
            }),
    },
];
