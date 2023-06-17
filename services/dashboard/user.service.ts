import {PaginatedCustomersInterface} from "~/model/dashboard/response/CustomerInterfaceResponse";

export const fetchCustomersList = async (page: number, perPage: number, filters = {}) => {
    if (Object.keys(filters).length) {
        filters['operator'] = '$or';
    }

    return await useFetchAPI<PaginatedCustomersInterface>("user", {
        method: "GET",
        params: {
            page: page,
            perPage: perPage,
            ...filters
        }
    })
}