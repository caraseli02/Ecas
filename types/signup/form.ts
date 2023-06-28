import { InputObject } from '../global';

export type SignupAccountType = 'personal' | 'sole-trader' | 'business';

export enum AccountType {
    Personal = 0,
    SoleTrader = 1,
    Business = 2,
    Agent = 3,
}

export const getAccountTypeById = <T extends { [index: string]: number }>(enumValue: number): string | null => {
    const keys = Object.keys(AccountType).filter((x) => AccountType[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
};

export enum AccountRole {
    SuperAdmin = 0,
    Admin = 1,
    Client = 2,
}

export interface SignupBusinessDetails {
    fullCompanyName: InputObject;
    companyRegistrationNumber: InputObject;
    vatNumber: InputObject;
    country: CountryType;
    region: CountryType;
    city: InputObject;
    postcode: InputObject;
    addressLine1: InputObject;
    addressLine2: InputObject;
}
export interface SignupPersonalDetails {
    firstName: InputObject;
    lastName: InputObject;
    country: InputObject;
    region: InputObject;
    city: InputObject;
    postcode: InputObject;
    addressLine1: InputObject;
    addressLine2: InputObject;
}

export interface SignupContactDetails {
    firstName: InputObject;
    lastName: InputObject;
    phone: InputObject;
    mobile: InputObject;
    companyEmail: InputObject;
    email: InputObject;
    confirmCompanyEmail: InputObject;
    confirmEmail: InputObject;
}

export interface SignupProfileDetails {
    useContactEmail: boolean;
    accountEmail: InputObject;
    confirmAccountEmail: InputObject;
    password: InputObject;
    repeatPassword: InputObject;
    subscribeToNewsletter: boolean;
    agreeToTerms: boolean;
}

interface CountryType {
    value: InputObject;
    label: string;
    icon: string;
}
