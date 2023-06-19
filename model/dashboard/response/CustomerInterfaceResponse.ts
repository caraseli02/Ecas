import {UserDetails} from "~/types/auth/user-details";

export interface PaginatedCustomersInterface {
    status: string;
    data: {
        total_items: number;
        page_count: number;
        page: number;
        items: UserDetails[]
    }
}

export interface TotalCustomersInterface {
    status: string;
    data: {
        series: {
            data: number[]
        }[];
        total: number;
        delta: number;
    }
}

export interface ReturningCustomersInterface extends TotalCustomersInterface {}

export interface NewCustomersInterface {
    status: string;
    data: UserDetails[]
}

export interface CustomersByCountryInterface {
    status: string;
    data: {
        label: string;
        count: number;
        theme: string;
    }[];
}