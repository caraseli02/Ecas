import type { ColumnDef } from '@tanstack/vue-table';
import ColumnHeader from '~/components/dataTable/ColumnHeader.vue';
import RowActions from '~/components/dataTable/RowActions.vue';
import type { ActionOptionsConfiguration } from '~/components/dataTable/RowActions.vue';
import IdCell from '~/components/dataTable/IdCell.vue';
import UserInfo from '~/components/dataTable/UserInfo.vue';
import CellDate from '~/components/dataTable/CellDate.vue';
import { AccountStatusEnum, type CustomerTableColumns } from '~/types/auth/user-interface';
import { CustomerTableColumnsEnum } from '~/components/admin-table/customer/columns.enum';
import AccountType from '~/components/dataTable/AccountType.vue';
import { AccountType as AccountTypeEnum } from '~/types';

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
      h(UserInfo, {
        name:
                    row.original.accountType === AccountTypeEnum.Personal
                      ? `${row.original.personalDetails?.firstName} ${row.original.personalDetails?.lastName}`
                      : `${row.original.contactDetails?.firstName} ${row.original.contactDetails?.lastName}`,
        email: row.original.contactDetails?.email,
        navigateToRoute: `/dashboard/customers/${row.original.firebaseId}`,
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
    cell: ({ row }) =>
      h('div', { class: 'inline overflow-hidden' }, formatNumberWithCommas((row.original.spent ?? 0) as number, 'lei')),
  },
  {
    accessorKey: CustomerTableColumnsEnum.ORDERS_COUNT,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Orders count' }),
    cell: ({ row }) => h('div', { class: 'inline overflow-hidden' }, row.original.ordersCount ?? 0),
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
