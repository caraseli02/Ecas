import {AccountType} from '~/types';

export interface CustomerSettings {
    _id: string;
    adminSettings: AdminSettings;
}

export interface NotificationType {
    app: boolean;
    email: boolean;
    _id: string;
}

export interface AlertsAndNotifications {
    shoppingCart: NotificationType;
    newProducts: NotificationType;
    hotDeals: NotificationType;
    securityAlerts: NotificationType;
    shippingUpdates: NotificationType;
}

export interface MarketingPreferences {
    cookiesPolicy: NotificationType;
    newsletter: NotificationType;
    emailMarketing: NotificationType;
}

export interface AdminSettings {
    alertsAndNotifications: AlertsAndNotifications;
    marketingPreferences: MarketingPreferences;
    _id: string;
}

export enum AlertAndNotificationType {
    newProducts = 'New Products',
    hotDeals = 'HOT Deals',
    outOfStock = 'Out of stock',
    princeChange = 'Prince Change',
    shippingUpdates = 'Shipping Updates',
}

export enum ControlPanelTabsEnum {
    Organization = 'organization',
    Account = 'account',
    Shipping = 'shipping',
    Billing = 'billing',
    TransactionHistory = 'transaction-history',
    Settings = 'settings',
}

export const ControlPanelLabels = [
    {
        name: 'Organization',
        path: ControlPanelTabsEnum.Organization,
        allowTo: [AccountType.Agent, AccountType.Business, AccountType.SoleTrader],
    },
    {
        name: 'Account',
        path: ControlPanelTabsEnum.Account,
        allowTo: [AccountType.Personal],
    },
    {
        name: 'Shipping',
        path: ControlPanelTabsEnum.Shipping,
        allowTo: [AccountType.Personal, AccountType.Agent, AccountType.Business, AccountType.SoleTrader],
    },
    {
        name: 'Billing',
        path: ControlPanelTabsEnum.Billing,
        allowTo: [AccountType.Personal, AccountType.Agent, AccountType.Business, AccountType.SoleTrader],
    },
    {
        name: 'Transaction history',
        path: ControlPanelTabsEnum.TransactionHistory,
        allowTo: [AccountType.Personal, AccountType.Agent, AccountType.Business, AccountType.SoleTrader],
    },
    {
        name: 'Settings',
        path: ControlPanelTabsEnum.Settings,
        allowTo: [AccountType.Personal, AccountType.Agent, AccountType.Business, AccountType.SoleTrader],
    },
];

export type ControlPanelTabs =
    | ControlPanelTabsEnum.Organization
    | ControlPanelTabsEnum.Account
    | ControlPanelTabsEnum.Shipping
    | ControlPanelTabsEnum.Billing
    | ControlPanelTabsEnum.TransactionHistory
    | ControlPanelTabsEnum.Settings;

export interface CountryInterface {
    label: string,
    value: string,
    icon: string,
    regions: RegionInterface[]
}

export interface RegionInterface {
    name: string,
    shortCode: string
}