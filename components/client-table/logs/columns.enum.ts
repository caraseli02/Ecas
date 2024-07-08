export enum LogsTableColumnsEnum {
    TYPE = 'type',
    IP = 'ip',
    CREATED_AT = 'createdAt',
}

export enum EventType {
    user_welcome = 'User Welcome',
    user_create  = 'User Create',
    user_login = 'User Login',
    product_get = 'Product Get'
}

export interface LogsItem { type: EventType, ip: string, createdAt: string }
export interface LogsApiResponse {status: string, data: LogsItem[] }
