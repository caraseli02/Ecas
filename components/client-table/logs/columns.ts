import type { ColumnDef } from '@tanstack/vue-table';
import ColumnHeader from '~/components/dataTable/ColumnHeader.vue';
import CellDate from '~/components/dataTable/CellDate.vue';
import type { LogsItem } from '~/components/client-table/logs/columns.enum';
import { LogsTableColumnsEnum } from '~/components/client-table/logs/columns.enum';

export const columns: ColumnDef<LogsItem>[] = [
  {
    accessorKey: LogsTableColumnsEnum.TYPE,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Action' }),
    cell: ({ row }) => h('div', { class: 'inline overflow-hidden capitalize' }, row.original.type.replaceAll('_', ' ')),
  },
  {
    accessorKey: LogsTableColumnsEnum.IP,
    header: ({ column }) => h(ColumnHeader, { column, title: 'IP' }),
    cell: ({ row }) => h('div', { class: 'inline overflow-hidden' }, row.original.ip || 'N/A'),
  },
  {
    accessorKey: LogsTableColumnsEnum.CREATED_AT,
    header: ({ column }) => h(ColumnHeader, { column, title: 'Date' }),
    cell: ({ row }) => h(CellDate, { inputDateString: row.getValue(LogsTableColumnsEnum.CREATED_AT) }),
  },
];
