import { AddressInterface, PersonalDetails } from '~/model/dashboard/response/CustomerInterfaceResponse';
import { AccountRole } from '~/types';

export interface CustomersProfileInformation {
    email: string;
    firstName: string;
    lastName: string;
    country: string;
    phone: number;
    address: AddressInterface[];
    role: AccountRole;
    companyName?: string;
}