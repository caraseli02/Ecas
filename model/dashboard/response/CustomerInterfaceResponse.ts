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