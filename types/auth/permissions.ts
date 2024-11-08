export enum UserPermissionsEnum {
    AdminRead = 'read:admin',
    AdminWrite = 'write:admin',
    AdminDelete = 'delete:admin',

    AdminDashboardRead = 'read:admin-dashboard',
    ClientDashboardRead = 'read:client-dashboard',

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
    AgentInactivate = 'inactivate:agent',

    OrdersRead = 'read:orders',
    OrdersWrite = 'write:orders',
    OrdersDelete = 'delete:orders',

    AccountDataRead = 'read:account-data',
    AccountDataWrite = 'write:account-data',
    AccountDataDelete = 'delete:account-data',

    OrganizationDataRead = 'read:organization-data',
    OrganizationDataWrite = 'write:organization-data',
    OrganizationDataDelete = 'delete:organization-data',

    InvoiceRead = 'read:invoice',
    InvoiceWrite = 'write:invoice',
    InvoiceDelete = 'delete:invoice',
    InvoiceDownload = 'download:invoice',

    DeliveryDetailsRead = 'read:delivery',
    DeliveryDetailsWrite = 'write:delivery',
    DeliveryDetailsDelete = 'delete:delivery',

    PaymentDetailsRead = 'read:payment',
    PaymentDetailsWrite = 'write:payment',
    PaymentDetailsDelete = 'delete:payment',

    TransactionRead = 'read:transaction',
    TransactionWrite = 'write:transaction',
    TransactionDelete = 'delete:transaction',

    FavouriteRead = 'read:favourite',
    FavouriteWrite = 'write:favourite',
    FavouriteDelete = 'delete:favourite',

    PriceSettingsRead = 'read:price-settings',
    PriceSettingsWrite = 'write:price-settings',
    PriceSettingsDelete = 'delete:price-settings',

    CategoriesRead = 'read:categories',
    CategoriesWrite = 'write:categories',
    CategoriesDelete = 'delete:categories',
}
