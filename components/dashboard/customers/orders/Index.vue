<template>
    <div class="bg-white rounded-xl p-4 shadow-xs md:p-6">
        <div class="flex flex-col mb-6 md:block md:mb-8 lg:flex lg:flex-row lg:items-start lg:justify-between xl:items-center">
            <div class="flex items-start justify-between">
                <div class="leading-normal font-semibold max-lg:mb-8">Orders</div>
                <WarningIcon v-if="error" class="w-6 h-6 ml-6" />
            </div>
            <div v-if="!error && !emptyData" class="grid grid-cols-2 gap-4 md:flex md:items-center md:max-w-max md:ml-auto">
                <button
                    class="flex items-center justify-center col-span-2 w-full bg-blue rounded-lg px-5 py-2 text-white md:max-w-max md:order-3"
                >
                    <DownloadIcon class="w-6 h-6 mr-2" />
                    <span class="text-sm leading-[1.71] font-medium"> Download All </span>
                </button>
                <button
                    class="flex items-center justify-center w-full bg-[#F2F2F2] rounded-lg px-6 py-2 text-gray-300 md:max-w-max md:order-1"
                >
                    <FilterIcon class="w-6 h-6 mr-2" />
                    <span class="text-sm leading-[1.71] font-medium"> Filter </span>
                </button>
                <button
                    class="group flex items-center justify-center w-full bg-[#F2F2F2] rounded-lg px-4 py-2 text-gray-300 transition-colors duration-300 md:max-w-max md:order-1"
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
                <div
                    v-for="(filter, index) in activeFilters"
                    :key="index"
                    class="flex items-center pl-2 pr-1 py-1.5 bg-[#F2F2F2] rounded-md"
                >
                    <span class="text-sm leading-normal text-gray-300 mr-2">
                        {{ `${FilterLabelsEnum[filter.filter]}: ${filter.value}` }}
                    </span>
                    <button class="flex text-gray-300 transition-colors duration-300 hover:text-blue" @click="removeFilter(index)">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4">
                            <path
                                d="M3.33594 3.33398L12.6686 12.6667"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M3.33917 12.6667L12.6719 3.33398"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="emptyData || error" class="flex flex-col items-center justify-center flex-1 my-20 lg:my-[100px] xl:my-[150px]">
            <EmojiSadIcon class="w-[52px] h-[52px] mb-4" />
            <div class="text-sm font-medium leading-normal text-gray-100">No data available</div>
        </div>
        <div v-else>
            <DashboardCustomersListPagination
                :at-page="atPage"
                :per-page="perPage"
                :items-count="listItems.length"
                position="top"
                class="flex-col mb-6 md:mb-8"
                @page-change="atPage = $event"
                @per-page-change="perPage = $event"
            />
            <DashboardCustomersOrdersTable
                :items="visibleItemsFiltered"
                :loading="loading"
                @active-filters="activeFilters = $event"
                @active-sort="activeSort = $event"
            />
            <DashboardCustomersListPagination
                :at-page="atPage"
                :per-page="perPage"
                :items-count="listItems.length"
                position="bottom"
                class="flex-col-reverse"
                @page-change="atPage = $event"
                @per-page-change="perPage = $event"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import DownloadIcon from '@/assets/icons/dashboard/download.svg';
import FilterIcon from '@/assets/icons/dashboard/filter.svg';
import XIcon from '@/assets/icons/dashboard/x.svg';
import { DashboardCustomerOrderItem } from '~~/types';
import { FilterLabelsEnum } from '~/types/dashboard/filter';
import { FilterInterface, SortInterface } from '~/model/dashboard/table/filters';
import EmojiSadIcon from '@/assets/icons/dashboard/emoji-sad.svg';
import WarningIcon from '@/assets/icons/dashboard/warning.svg';

const activeFilters = ref([] as FilterInterface);
const activeSort = ref({} as SortInterface);

const clearFilters = async () => {
    activeFilters.value = [];
};

const removeFilter = async (index) => {
    activeFilters.value.splice(index, 1);
};

const atPage = ref(1);
const perPage = ref(10);
const loading = ref(false);
const error = ref(false);
const emptyData = ref(false);

const listItems = ref<DashboardCustomerOrderItem[]>([
    {
        id: '1V9VGU48XV',
        type: 'stock-order',
        date: 0,
        status: 'abandoned-checkout',
        total: 138000.77,
    },
    {
        id: '1V9VGU48XV',
        type: 'backorder',
        date: 0,
        status: 'awaiting-payment',
        total: 138000.77,
    },
    {
        id: '1V9VGU48XV',
        type: 'mixed-order',
        date: 0,
        status: 'partially-refunded',
        total: 138000.77,
    },
    {
        id: '1V9VGU48XV ',
        type: 'backorder',
        date: 0,
        status: 'completed',
        total: 138000.77,
    },
    {
        id: '1V9VGU48XV',
        type: 'stock-order',
        date: 0,
        status: 'partially-shipped',
        total: 138000.77,
    },
    {
        id: '1V9VGU48XV',
        type: 'backorder',
        date: 0,
        status: 'processing',
        total: 138000.77,
    },
    {
        id: '1V9VGU48XV',
        type: 'mixed-order',
        date: 0,
        status: 'payment-received',
        total: 138000.77,
    },
    {
        id: '1V9VGU48XV ',
        type: 'backorder',
        date: 0,
        status: 'payment-declined',
        total: 138000.77,
    },
    {
        id: '1V9VGU48XV ',
        type: 'backorder',
        date: 0,
        status: 'awaiting-fulfillment',
        total: 138000.77,
    },
    {
        id: '1V9VGU48XV',
        type: 'stock-order',
        date: 0,
        status: 'abandoned-checkout',
        total: 138000.77,
    },
    {
        id: '1V9VGU48XV',
        type: 'backorder',
        date: 0,
        status: 'awaiting-payment',
        total: 138000.77,
    },
    {
        id: '1V9VGU48XV',
        type: 'mixed-order',
        date: 0,
        status: 'partially-refunded',
        total: 138000.77,
    },
    {
        id: '1V9VGU48XV ',
        type: 'backorder',
        date: 0,
        status: 'completed',
        total: 138000.77,
    },
    {
        id: '1V9VGU48XV',
        type: 'stock-order',
        date: 0,
        status: 'partially-shipped',
        total: 138000.77,
    },
    {
        id: '1V9VGU48XV',
        type: 'backorder',
        date: 0,
        status: 'processing',
        total: 138000.77,
    },
    {
        id: '1V9VGU48XV',
        type: 'mixed-order',
        date: 0,
        status: 'payment-received',
        total: 138000.77,
    },
]);

const visibleItemsFiltered = computed(() => {
    return [...listItems.value].filter((e) => {
        return true;
    });
});
</script>
