import type { PaginatedCustomersInterface } from '~/model/dashboard/response/CustomerInterfaceResponse';

export enum LogsTableColumnsEnum {
    TYPE = 'type',
    IP = 'ip',
    CREATED_AT = 'createdAt',
}

export interface LogsItem {
    type: string;
    ip: string;
    createdAt: string;
}
