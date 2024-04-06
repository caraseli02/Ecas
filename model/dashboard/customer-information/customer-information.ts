import {AddressInterface} from '~/model/dashboard/response/CustomerInterfaceResponse';
import {AccountRole} from '~/types';

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

export interface ActiveOrdersResponse {
    status: string;
    data: ActiveOrders;
}

export interface ActiveOrders {
    total: ActiveOrder[];
}

export interface ActiveOrder {
    _id: string;
    shortId: string;
}
