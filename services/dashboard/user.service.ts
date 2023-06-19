import {
    CustomersByCountryInterface,
    NewCustomersInterface,
    PaginatedCustomersInterface, ReturningCustomersInterface,
    TotalCustomersInterface
} from "~/model/dashboard/response/CustomerInterfaceResponse";

export const fetchCustomersList = async (page: number, perPage: number, filters = {}, sort = {}) => {
    if (Object.keys(filters).length) {
        filters['operator'] = '$or';
    }

    return await useFetchAPI<PaginatedCustomersInterface>("user", {
        method: "GET",
        params: {
            page: page,
            perPage: perPage,
            ...filters,
            ...sort
        }
    })
}

export const fetchTotalCustomersWidget = async (time = 7) => {
    return await useFetchAPI<TotalCustomersInterface>("/dashboard/users/total-customers", {
        method: "GET",
        params: {
            time: time
        }
    })
}

export const fetchReturningCustomersWidget = async (time = 7) => {
    return await useFetchAPI<ReturningCustomersInterface>("/dashboard/users/returning-customers", {
        method: "GET",
        params: {
            time: time
        }
    })
}

export const fetchNewCustomersWidget = async () => {
    return await useFetchAPI<NewCustomersInterface>("/dashboard/users/new-customers", {
        method: "GET",
    })
}

export const fetchCustomersByCountryWidget = async () => {
    return await useFetchAPI<CustomersByCountryInterface>("/dashboard/users/customers-top-country", {
        method: "GET",
    })
}