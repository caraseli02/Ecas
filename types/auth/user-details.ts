import {AccountRole} from '~/types';
import {AccountAdminSettings} from '~/types/auth/account-settings';

export interface UserDetails {
    _id: string;
    accountType?: number;
    role: AccountRole;
    firebaseId: string;
    active: boolean;
    ordersCount: number;
    spent: number;
    contactDetails: ContactDetails;
    profileDetails: ProfileDetails;
    companyDetails?: CompanyDetails;
    personalDetails?: PersonalDetails;
    createdAt: string;
    updatedAt: string;
    currentStatus?: 'online' | 'offline';
    adminSettings?: AccountAdminSettings;
    marketingPreferences?: MarketingPreferences;
    __v: number;
    lastActivityDate: string;
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
    phone: number;
    mobile?: number;
    email: string;
    _id: string;
}

export interface ProfileDetails {
    email: string;
    _id: string;
}

export interface CompanyDetails {
    name: string;
    registrationNumber: string;
    vat?: string;
    address: AddressInterface;
    shippingAddress: ShippingAddressInterface[];
    _id: string;
}

export interface AddressInterface {
    alias: string;
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
