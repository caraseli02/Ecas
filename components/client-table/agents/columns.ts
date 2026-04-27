import type { ColumnDef } from '@tanstack/vue-table';
import ColumnHeader from '~/components/dataTable/ColumnHeader.vue';
import RowActions from '~/components/dataTable/RowActions.vue';
import type { ActionOptionsConfiguration } from '~/components/dataTable/RowActions.vue';
import UserInfo from '~/components/dataTable/UserInfo.vue';
import CellDate from '~/components/dataTable/CellDate.vue';
import { AccountStatusEnum, type CustomerTableColumns } from '~/types/auth/user-interface';
import { AgentsTableColumnsEnum } from '~/components/client-table/agents/columns.enum';
import UserDashboardService from '~/services/dashboard/user.service';
import StatusWithColor from '~/components/dataTable/StatusWithColor.vue';
import { useAuthStore } from '~/store/authStore';
import { AccountRole } from '~/types';

const statusName = {
  0: 'Inactive',
  1: 'Active',
  2: 'Pending',
};
const statusColors = {
  Active: 'bg-green-800',
  Disabled: 'bg-pink-500',
  Pending: 'bg-yellow-500',
};

const authStore = useAuthStore();
const { getUserDetails } = storeToRefs(authStore);

export const columns: ColumnDef<CustomerTableColumns>[] = [
  {
    accessorKey: AgentsTableColumnsEnum.NAME,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Name' }),
    cell: ({ row }) =>
      h(UserInfo, {
        // eslint-disable-next-line no-constant-binary-expression
        name: `${row.original.contactDetails?.firstName} ${row.original.contactDetails?.lastName}` ?? 'N/A',
        email: row.original.contactDetails?.email,
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
      const val = row.getValue(AgentsTableColumnsEnum.STATUS);
      return h(StatusWithColor, {
        status: statusName[val],
        options: statusColors,
      });
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: AgentsTableColumnsEnum.ORDERS_COUNT,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Orders' }),
    cell: ({ row }) => h('div', { class: 'inline overflow-hidden' }, (row.original.ordersCount ?? 0) as number),
  },
  {
    accessorKey: AgentsTableColumnsEnum.TOTAL,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Total' }),
    cell: ({ row }) =>
      h('div', { class: 'inline overflow-hidden' }, formatNumberWithCommas(row.getValue(AgentsTableColumnsEnum.TOTAL), 'Lei')),
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
            enable: getUserDetails.value?.role === AccountRole.Admin,
            navigateToRoute: `/dashboard/customers/${row.original.firebaseId}`,
          },
          {
            label: 'Delete',
            enable: getUserDetails.value?.role === AccountRole.Admin,
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
          {
            label: 'Activate account',
            enable: row.original.status === AccountStatusEnum.Pending,
            actionFn: 'activateUser',
          },
        ] as ActionOptionsConfiguration[],
      }),
  },
];
