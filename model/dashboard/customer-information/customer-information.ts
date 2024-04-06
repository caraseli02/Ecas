import {AddressInterface} from '~/types/auth/user-details';
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

export interface FavoritesResponse {
    status: string,
    data: FavoritesItems
}

export interface FavoritesItems {
    folders_number: number,
    products_number: number
}


export interface TotalOrdersResponse {
    status: string,
    data: TotalOrders
}

export interface TotalOrders {
    total_orders: number,
    total_orders_current_month: number
}

export interface TotalReturnsResponse {
    status: string,
    data: TotalReturns
}

export interface TotalReturns {
    total: number
}

export interface CustomerDashboardActivityData {
    returns: number,
    totalOrders: number,
    monthOrder: number,
    favorites: {
        products: number,
        folders: number
    }
}
