<template>
    <div class="bg-white rounded-xl p-4 shadow-xs md:p-6">
        <div class="flex flex-col mb-6 md:block md:mb-8 lg:flex lg:flex-row lg:items-start lg:justify-between xl:items-center">
            <div class="leading-normal font-semibold max-lg:mb-8">Customers List</div>
            <div class="grid grid-cols-2 gap-4 md:flex md:items-center md:max-w-max md:ml-auto">
                <button
                    class="flex items-center justify-center col-span-2 w-full bg-blue rounded-lg px-5 py-2 text-white md:max-w-max md:order-3"
                >
                    <PlusIcon class="w-6 h-6 mr-2" />
                    <span class="text-sm leading-[1.71] font-medium"> Create New </span>
                </button>
                <button
                    class="flex items-center justify-center w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-300 md:max-w-max md:order-1"
                >
                    <span class="text-sm leading-[1.71] font-medium mr-2"> Filter </span>
                    <FilterIcon class="w-6 h-6" />
                </button>
                <button
                    class="group flex items-center justify-center w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-300 transition-colors duration-300 md:max-w-max md:order-1"
                    @click="clearFilters"
                >
                    <span class="text-sm leading-[1.71] font-medium mr-2"> Clear Filters </span>
                    <XIcon class="w-6 h-6 group-hover:text-blue" />
                </button>
            </div>
        </div>
        <div v-if="activeFilters.length > 0" class="mb-6 md:flex md:items-start md:mb-8">
            <div class="leading-normal font-medium text-gray-300 mb-4 md:mr-4">Filters:</div>
            <div class="flex flex-wrap gap-4">
                <div v-for="(filter, index) in activeFilters" :key="index" class="flex items-center pl-2 pr-1 py-1 bg-gray-200 rounded-md">
                    <span class="text-sm leading-normal text-gray-300 mr-2">
                        {{ `${FilterLabelsEnum[filter.filter]}: ${filter.value}` }}
                    </span>
                    <button class="flex text-gray-300 transition-colors duration-300 hover:text-blue" @click="removeFilter(index)">
                        <XIcon class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
        <DashboardCustomersListPagination
            :at-page="atPage"
            :per-page="perPage"
            :items-count="totalItems"
            position="top"
            class="flex-col mb-6 md:mb-8"
            @page-change="atPage = $event"
            @per-page-change="perPage = $event"
        />
        <DashboardCustomersListTable
            :items="visibleItemsFiltered"
            @active-filters="activeFilters = $event"
            @active-sort="activeSort = $event"
        />
        <DashboardCustomersListPagination
            :at-page="atPage"
            :per-page="perPage"
            :items-count="totalItems"
            position="bottom"
            class="flex-col-reverse"
            @page-change="atPage = $event"
            @per-page-change="perPage = $event"
        />
    </div>
</template>

<script setup lang="ts">
import PlusIcon from '@/assets/icons/dashboard/plus.svg';
import FilterIcon from '@/assets/icons/dashboard/filter.svg';
import XIcon from '@/assets/icons/dashboard/x.svg';
import Avatar from '@/assets/icons/dashboard/avatar.png';
import { DashboardTableItem, getAccountTypeById } from '~~/types';
import { PaginatedCustomersInterface } from '~/model/dashboard/response/CustomerInterfaceResponse';
import { FilterLabelsEnum } from '~/types/dashboard/filter';
import { FilterInterface, SortInterface } from '~/model/dashboard/table/filters';
import { useNuxtApp } from '#app';

const { $api } = useNuxtApp();

const activeFilters = ref([] as FilterInterface);
const activeSort = ref({} as SortInterface);

const clearFilters = async () => {
    activeFilters.value = [];
    await fetchAndSetUsersList(atPage.value, perPage.value, activeFilters, activeSort);
};

const removeFilter = async (index) => {
    activeFilters.value.splice(index, 1);
    await fetchAndSetUsersList(atPage.value, perPage.value, activeFilters, activeSort);
};

const atPage = ref(1);
const perPage = ref(10);
let totalItems = ref(0);

const listItems = ref<DashboardTableItem[]>([]);

const visibleItemsFiltered = computed(() => {
    return [...listItems.value].filter((e) => {
        return true;
    });
});

const fetchAndSetUsersList = async (page: number, perPage: number, filters = {}, sort = {}) => {
    const data = await $api.userDashboard.fetchCustomersList(page, perPage, filters, sort);

    if (!data || data.status !== 'success') {
        return;
    }

    const paginatedUsers = data.data.items;

    totalItems = data.data.total_items;

    if (paginatedUsers) {
        listItems.value = paginatedUsers.map((user) => ({
            avatar: Avatar,
            name: `${user.contactDetails?.firstName} ${user.contactDetails?.lastName}`,
            email: user.profileDetails.email,
            account: getAccountTypeById(user.accountType) || '-',
            company: user.companyDetails?.name || '-',
            registered: new Date(user.createdAt).toLocaleDateString('en-GB'),
            spent: user.spent,
            ordersCount: user.ordersCount,
        }));
    }
};

await fetchAndSetUsersList(atPage.value, perPage.value, activeFilters.value, activeSort.value);

watch(
    [atPage, perPage, activeFilters, activeSort],
    async ([newAtPage, newPerPage, newActiveFilters, newActiveSort]) => {
        const filterParams = {};

        for (const filter of newActiveFilters) {
            filterParams[filter.filter] = filter.value;
        }
        await fetchAndSetUsersList(newAtPage, newPerPage, filterParams, newActiveSort);
    },
    { deep: true }
);
</script>
