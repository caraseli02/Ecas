import {
    CustomersByCountryInterface,
    NewCustomersInterface,
    PaginatedCustomersInterface,
    ReturningCustomersInterface,
    TotalCustomersInterface,
} from '~/model/dashboard/response/CustomerInterfaceResponse';
import { useAuthStore } from '~/store/authStore';

export const fetchCustomersList = async (page: number, perPage: number, filters = {}, sort = {}) => {
    const authStore = useAuthStore();
    const token = authStore.getToken;

    return await useFetchAPI<PaginatedCustomersInterface>('user', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page: page,
            perPage: perPage,
            ...filters,
            ...sort,
        },
    });
};

export const fetchTotalCustomersWidget = async (time = 7) => {
    const authStore = useAuthStore();
    const token = authStore.getToken;

    return await useFetchAPI<TotalCustomersInterface>('/dashboard/users/total-customers', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            time: time,
        },
    });
};

export const fetchReturningCustomersWidget = async (time = 7) => {
    const authStore = useAuthStore();
    const token = authStore.getToken;

    return await useFetchAPI<ReturningCustomersInterface>('/dashboard/users/returning-customers', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            time: time,
        },
    });
};

export const fetchNewCustomersWidget = async () => {
    const authStore = useAuthStore();
    const token = authStore.getToken;

    return await useFetchAPI<NewCustomersInterface>('/dashboard/users/new-customers', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: 'GET',
    });
};

export const fetchCustomersByCountryWidget = async () => {
    const authStore = useAuthStore();
    const token = authStore.getToken;

    return await useFetchAPI<CustomersByCountryInterface>('/dashboard/users/customers-top-country', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: 'GET',
    });
};
