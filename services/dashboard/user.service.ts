import {PaginatedCustomersInterface} from "~/model/dashboard/response/CustomerInterfaceResponse";
import {useAuthStore} from "~/store/authStore";

export const fetchCustomersList = async (page: number, perPage: number) => {
    return await useFetchAPI<PaginatedCustomersInterface>("user", {
        method: "GET",
        params: {
            page: page,
            perPage: perPage,
        }
    })
}