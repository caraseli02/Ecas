import { AccountRole } from '~/types';
import { AccountAdminSettings } from '~/types/auth/account-settings';

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
    lastActivityDate : string;
}

export interface PersonalDetails {
    firstName: string;
    lastName: string;
    country: string;
    region: string;
    city: string;
    postcode: string;
    address: AddressInterface[];
}

interface ContactDetails {
    firstName: string;
    lastName: string;
    phone: number;
    mobile?: number;
    email: string;
    _id: string;
}

interface ProfileDetails {
    email: string;
    _id: string;
}

interface CompanyDetails {
    name: string;
    registrationNumber: string;
    vat?: string;
    region: string;
    country: string;
    city: string;
    postcode: string;
    address: AddressInterface[];
    _id: string;
}

export interface AddressInterface {
    alias: string;
    name1: string;
    name2?: string;
    default: boolean;
}

export interface MarketingPreferences {
    cookiesPolicy? : object,
    newsletter? : object,
    emailMarketing? : EmailMarketing,
    _id? : string
}

export interface EmailMarketing  {
    app? : boolean,
    email : string,
    _id? : string,
}