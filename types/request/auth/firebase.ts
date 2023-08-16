import { AccountAdminSettings } from '~/types/auth/account-settings';

export interface FirebasePersonalAccount {
    account: PersonalAccount;
    isAlreadyRegisteredWithFirebase?: boolean;
}

export interface FirebaseBusinessAccount {
    account: BusinessAccount;
    isAlreadyRegisteredWithFirebase?: boolean;
}

interface BusinessAccount {
    accountType: number;
    role: number;
    firebaseId?: string;
    profileDetails: ProfileDetails;
    contactDetails: ContactDetails;
    companyDetails: CompanyDetails;
    adminSettings?: AccountAdminSettings;
}

interface PersonalAccount {
    accountType: number;
    role: number;
    firebaseId?: string;
    profileDetails: ProfileDetails;
    contactDetails: ContactDetails;
    personalDetails: PersonalDetails;
    adminSettings?: AccountAdminSettings;
}

interface PersonalDetails {
    firstName: string;
    lastName: string;
    country: string;
    region: string;
    city: string;
    postcode: number;
    address: {
        name1: string;
        name2: string;
        default: true;
    }[];
}

interface CompanyDetails {
    name: string;
    registrationNumber: number;
    vat: string;
    country: string;
    region: string;
    city: string;
    postcode: number;
    address1: string;
}

interface ProfileDetails {
    email: string;
    password?: string;
}

interface ContactDetails {
    firstName: string;
    lastName: string;
    phone: number;
    email: string;
}
