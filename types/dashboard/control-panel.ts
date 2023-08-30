export interface CustomerSettings {
    _id: string,
    adminSettings: AdminSettings
}

export interface NotificationType {
    app: boolean,
    email: boolean,
    _id: string
}

export interface AlertsAndNotifications {
    shoppingCart: NotificationType,
    newProducts: NotificationType,
    hotDeals: NotificationType,
    securityAlerts: NotificationType,
    shippingUpdates: NotificationType
}

export interface MarketingPreferences {
    cookiesPolicy: NotificationType,
    newsletter: NotificationType,
    emailMarketing: NotificationType,
}

export interface AdminSettings {
    alertsAndNotifications: AlertsAndNotifications,
    marketingPreferences: MarketingPreferences,
    _id: string
}

export enum AlertAndNotificationType {
    newProducts = 'New Products',
    hotDeals = 'HOT Deals',
    outOfStock = 'Out of stock',
    princeChange = 'Prince Change',
    shippingUpdates = 'Shipping Updates'
}