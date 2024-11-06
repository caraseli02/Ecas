export enum UserPermissionsEnum {
    AdminRead = 'read:admin',
    AdminWrite = 'write:admin',
    AdminDelete = 'delete:admin',

    UsersRead = 'read:users',
    UsersWrite = 'write:users',
    UsersDelete = 'delete:users',

    ProductRead = 'read:product',
    ProductWrite = 'write:product',
    ProductDelete = 'delete:product',

    ExportWrite = 'write:export',

    DocumentsRead = 'read:document',
    DocumentsWrite = 'write:document',
    DocumentsDelete = 'delete:document',
    DocumentsDownload = 'download:document',

    AuditRead = 'read:audit',
    AuditWrite = 'write:audit',
    AuditDelete = 'delete:audit',

    AgentRead = 'read:agent',
    AgentWrite = 'write:agent',
    AgentDelete = 'delete:agent',
    AgentApprove = 'approve:agent',

    OrdersRead = 'read:orders',

    AccountDataRead = 'read:account-data',
    AccountDataWrite = 'write:account-data',
    AccountDataDelete = 'delete:account-data',

    MessageRead = 'read:message',
    MessageWrite = 'write:message',
    MessageDelete = 'delete:message',
    MessageSend = 'send:message',

    InvoiceRead = 'read:invoice',
    InvoiceWrite = 'write:invoice',
    InvoiceDelete = 'delete:invoice',

    DeliveryDetailsRead = 'read:delivery',
    DeliveryDetailsWrite = 'write:delivery',
    DeliveryDetailsDelete = 'delete:delivery',

    PaymentDetailsRead = 'read:payment',
    PaymentDetailsWrite = 'write:payment',
    PaymentDetailsDelete = 'delete:payment',

    FavouriteRead = 'read:favourite',
    FavouriteWrite = 'write:favourite',
    FavouriteDelete = 'delete:favourite',

    PriceSettingsRead = 'read:price-settings',
    PriceSettingsWrite = 'write:price-settings',
    PriceSettingsDelete = 'delete:price-settings',
}
