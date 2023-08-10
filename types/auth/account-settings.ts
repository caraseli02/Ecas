export interface AccountAdminSettings {
    discount?: DiscountInterface;
    customerCredit?: CustomerCreditInterface;
    alertsAndNotifications?: AlertsAndNotificationsInterface;
    marketingPreferences?: MarketingPreferencesInterface;
}

export interface AlertsAndNotificationsInterface {
    shoppingCart?: AlertsAndNotificationsTypes;
    newProducts?: AlertsAndNotificationsTypes;
    hotDeals?: AlertsAndNotificationsTypes;
    securityAlerts?: AlertsAndNotificationsTypes;
    shippingUpdates?: AlertsAndNotificationsTypes;
}

export interface MarketingPreferencesInterface {
    cookiesPolicy?: AlertsAndNotificationsTypes;
    newsletter: AlertsAndNotificationsTypes;
    emailMarketing?: AlertsAndNotificationsTypes;
}

export interface CustomerCreditInterface {
    limit: number;
    spent: number;
    available: number;
    dueDate: string;
}

export interface AlertsAndNotificationsTypes {
    email?: boolean;
    app?: boolean;
}

export interface DiscountInterface {
    value: number;
    startDate: string;
    endDate: string;
}
