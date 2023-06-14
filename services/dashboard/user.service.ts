import {PaginatedCustomersInterface} from "~/model/dashboard/response/CustomerInterfaceResponse";
import {useAuthStore} from "~/store/authStore";
import {FilterInterface} from "~/model/dashboard/table/filters";

export const fetchCustomersList = async (page: number, perPage: number, filters = {}) => {
    return await useFetchAPI<PaginatedCustomersInterface>("user", {
        method: "GET",
        params: {
            page: page,
            perPage: perPage,
            ...filters
        }
    })
}