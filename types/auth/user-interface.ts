import { AccountRole, AccountType } from '~/types';
import { AccountAdminSettings } from '~/types/auth/account-settings';

export interface UserInterface {
    _id?: string;
    accountType?: AccountType;
    role: AccountRole;
    firebaseId?: string;
    stripeId?: string;
    active: boolean;
    companyDetails?: CompanyDetails;
    contactDetails: ContactDetails;
    personalDetails?: PersonalDetails;
    profileDetails?: ProfileDetails;
    currentStatus?: 'online' | 'offline';
    adminSettings?: AccountAdminSettings;
    spent?: number;
    ordersCount?: number;
    messages?: AccountMessageInterface[];
    productVisitedHistory?: ProductVisitedHistory[];
    createdAt?: string;
}

export type CustomerTableColumns = Pick<
    UserInterface,
    'accountType' | 'firebaseId' | 'active' | 'spent' | 'ordersCount' | 'contactDetails' | 'companyDetails' | 'createdAt'
>;

export interface ProductVisitedHistory {
    productId: string;
    count: number;
    createdAt?: string;
}

export interface AccountMessageInterface extends MessageEntityInterface {
    messageTemplateId?: string;
    read?: boolean;
}

export interface MessageEntityInterface {
    _id?: string;
    title: string;
    body: string;
    icon?: string;
    link: string;
    sentTo?: string[];
}

export interface PersonalDetails {
    firstName: string;
    lastName: string;
    address: AddressInterface;
    shippingAddress: ShippingAddressInterface[];
}

export interface ContactDetails {
    firstName: string;
    lastName: string;
    phone: string;
    mobile?: number;
    email: string;
    _id?: string;
}

export interface ProfileDetails {
    email: string;
    password?: string;
    _id?: string;
}

export interface CompanyDetails {
    name: string;
    registrationNumber: string;
    vat?: string;
    taxId?: string;
    address: AddressInterface;
    shippingAddress: ShippingAddressInterface[];
    _id?: string;
}

export interface AddressInterface {
    alias?: string;
    name1: string;
    name2?: string;
    country: string;
    region: string;
    city: string;
    postcode: string;
}

export interface ShippingAddressInterface {
    alias?: string;
    name1: string;
    name2?: string;
    default: boolean;
    country: string;
    region: string;
    city: string;
    postcode: string;
    phone?: string;
}

export interface MarketingPreferences {
    cookiesPolicy?: object;
    newsletter?: object;
    emailMarketing?: EmailMarketing;
    _id?: string;
}

export interface EmailMarketing {
    app?: boolean;
    email: string;
    _id?: string;
}
