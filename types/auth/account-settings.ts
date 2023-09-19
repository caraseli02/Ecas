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
    priceChange?: AlertsAndNotificationsTypes;
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
    tillDue: string;
    term: number;
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

export enum AlertAndNotificationLabelsEnum {
    newProducts = 'New Products',
    hotDeals = 'HOT Deals',
    outOfStock = 'Out of stock',
    priceChange = 'Prince Change',
    shippingUpdates = 'Shipping Updates'
}

export enum MarketingPreferencesEnum {
    cookiesPolicy = 'Cookies Policy Consent',
    newsletter = 'Subscribed to Newsletter',
    eMailMarketing = 'E-mail marketing consent'
}
