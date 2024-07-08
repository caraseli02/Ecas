import type { ColumnDef } from '@tanstack/vue-table';
import ColumnHeader from '~/components/dataTable/ColumnHeader.vue';
import { LogsTableColumnsEnum } from '~/components/client-table/logs/columns.enum';


export const columns: ColumnDef<{type: string, ip: string, timestamp: string}>[] = [
    {
        accessorKey: LogsTableColumnsEnum.ACTIONS,
        header: ({ column }) => h(ColumnHeader, { column, title: 'type' }),
        cell: ({ row }) => h('div', { class: 'inline overflow-hidden' }, row.original.type),
    },
    {
        accessorKey: LogsTableColumnsEnum.IP,
        header: ({ column }) => h(ColumnHeader, { column, title: 'ip' }),
        cell: ({ row }) => h('div', { class: 'inline overflow-hidden' },  row.original.ip),
    },
    {
        accessorKey: LogsTableColumnsEnum.TIMESTAMP,
        header: ({ column }) => h(ColumnHeader, { column, title: 'timestamp' }),
        cell: ({ row }) => h('div', { class: 'inline overflow-hidden' },  row.original.timestamp),
    },
];
