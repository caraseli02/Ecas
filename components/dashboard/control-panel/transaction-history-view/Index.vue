<template>
    <div>
        <div>
            <div>
                <div class="mb-9 md:flex md:items-start md:justify-between">
                    <h2 class="text-xl leading-[1.4] font-semibold">Transaction History</h2>
                    <div class="flex items-center gap-4">
                        <DashboardSearch v-model="searchVal" placeholder="Search #ID" size="md" class="max-xl:hidden 2xl:w-[400px]" />
                        <button class="flex items-center justify-center bg-[#F2F2F2] rounded-lg px-6 py-2 text-gray-300 max-xl:hidden">
                            <FilterIcon class="w-6 h-6 mr-2" />
                            <span class="text-sm leading-[1.71] font-medium"> Filter </span>
                        </button>
                        <button
                            v-if="activeFilters.length > 0"
                            class="group flex items-center justify-center bg-[#F2F2F2] rounded-lg px-4 py-2 text-gray-300 transition-colors duration-300 max-xl:hidden"
                            @click="clearFilters"
                        >
                            <span class="text-sm leading-[1.71] font-medium mr-2"> Clear Filters </span>
                            <XIcon class="w-6 h-6 group-hover:text-blue" />
                        </button>
                        <button class="flex items-center justify-center bg-blue rounded-lg px-5 py-2 text-white max-md:hidden">
                            <DownloadIcon class="w-6 h-6 mr-2" />
                            <span class="text-sm leading-[1.71] font-medium"> Download All </span>
                        </button>
                    </div>
                </div>
                <div class="mb-6">
                    <button class="flex items-center justify-center w-full bg-blue rounded-lg px-5 py-2 text-white mb-4 md:hidden">
                        <DownloadIcon class="w-6 h-6 mr-2" />
                        <span class="text-sm leading-[1.71] font-medium"> Download All </span>
                    </button>
                    <div
                        class="grid md:flex md:items-center xl:hidden"
                        :class="[activeFilters.length > 0 ? 'grid-cols-2 gap-4' : 'grid-cols-1']"
                    >
                        <button
                            class="flex items-center justify-center w-full bg-[#F2F2F2] rounded-lg px-6 py-2 text-gray-300 md:max-w-max"
                        >
                            <FilterIcon class="w-6 h-6 mr-2" />
                            <span class="text-sm leading-[1.71] font-medium"> Filter </span>
                        </button>
                        <button
                            v-if="activeFilters.length > 0"
                            class="group flex items-center justify-center w-full bg-[#F2F2F2] rounded-lg px-4 py-2 text-gray-300 transition-colors duration-300 md:max-w-max"
                            @click="clearFilters"
                        >
                            <span class="text-sm leading-[1.71] font-medium mr-2"> Clear Filters </span>
                            <XIcon class="w-6 h-6 group-hover:text-blue" />
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="activeFilters.length > 0" class="mb-6 md:flex md:items-start">
                <div class="leading-normal font-medium text-gray-300 mb-4 md:mr-4">Filters:</div>
                <div class="flex flex-wrap gap-4">
                    <div v-for="(filter, index) in activeFilters" :key="index" class="flex items-center p-1 bg-[#F2F2F2] rounded-md">
                        <span class="text-sm leading-[1.43] text-gray-300 mr-2">
                            {{ filter }}
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
        </div>
        <div class="flex flex-col gap-6 mb-6 md:flex-col-reverse lg:mb-9 lg:gap-9">
            <DashboardCustomersListPagination
                :at-page="atPage"
                :per-page="perPage"
                :items-count="listItems.length"
                position="top"
                class="flex-col"
                @page-change="atPage = $event"
                @per-page-change="perPage = $event"
            />
            <DashboardSearch v-model="searchVal" placeholder="Search #ID" size="md" class="xl:hidden" />
        </div>
        <DashboardControlPanelTransactionHistoryViewTable
            :items="visibleItemsFiltered"
            :loading="loading"
            :checkAll="checkAll"
            @check="handleCheck"
            @check-all="checkAll = !checkAll"
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
</template>

<script setup lang="ts">
import FilterIcon from '@/assets/icons/dashboard/filter.svg';
import XIcon from '@/assets/icons/dashboard/x.svg';
import DownloadIcon from '@/assets/icons/dashboard/download-2.svg';
import { DashboardControlPanelTransactionHistoryItem } from '~~/types';

const atPage = ref(1);
const perPage = ref(10);
const loading = ref(false);

const activeFilters = ref(['Filter 1', 'Filter 2']);

const clearFilters = async () => {
    activeFilters.value = [];
};

const removeFilter = async (index: number) => {
    activeFilters.value.splice(index, 1);
};

const searchVal = ref('');

const listItems = ref<DashboardControlPanelTransactionHistoryItem[]>([
    {
        id: '1V9VGU48XV1',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
        checked: false,
    },
    {
        id: '1V9VGU48XV2',
        invoiceId: 'ECS#00098',
        amount: `€ 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'pending',
        checked: false,
    },
    {
        id: '1V9VGU48XV3',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
        checked: false,
    },
    {
        id: '1V9VGU48XV4',
        invoiceId: 'ECS#00098',
        amount: `LEI 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'declined',
        checked: true,
    },
    {
        id: '1V9VGU48XV5',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
        checked: false,
    },
    {
        id: '1V9VGU48XV6',
        invoiceId: 'ECS#00098',
        amount: `€ 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'pending',
        checked: true,
    },
    {
        id: '1V9VGU48XV7',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
        checked: false,
    },
    {
        id: '1V9VGU48XV8',
        invoiceId: 'ECS#00098',
        amount: `LEI 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'declined',
        checked: false,
    },
    {
        id: '1V9VGU48XV9',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
        checked: false,
    },
    {
        id: '1V9VGU48XV10',
        invoiceId: 'ECS#00098',
        amount: `€ 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'pending',
        checked: false,
    },
    {
        id: '1V9VGU48XV11',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
        checked: false,
    },
    {
        id: '1V9VGU48XV12',
        invoiceId: 'ECS#00098',
        amount: `LEI 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'declined',
        checked: false,
    },
    {
        id: '1V9VGU48XV13',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
        checked: false,
    },
    {
        id: '1V9VGU48XV14',
        invoiceId: 'ECS#00098',
        amount: `€ 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'pending',
        checked: false,
    },
    {
        id: '1V9VGU48XV15',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
        checked: false,
    },
    {
        id: '1V9VGU48XV16',
        invoiceId: 'ECS#00098',
        amount: `LEI 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'declined',
        checked: false,
    },
    {
        id: '1V9VGU48XV17',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
        checked: false,
    },
    {
        id: '1V9VGU48XV18',
        invoiceId: 'ECS#00098',
        amount: `€ 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'pending',
        checked: false,
    },
    {
        id: '1V9VGU48XV19',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
        checked: false,
    },
    {
        id: '1V9VGU48XV20',
        invoiceId: 'ECS#00098',
        amount: `LEI 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'declined',
        checked: false,
    },
]);

const visibleItemsFiltered = computed(() => {
    return [...listItems.value].filter((e) => {
        return true;
    });
});

const checkAll = ref(false);

const handleCheck = (id: string) => {
    const item = listItems.value.find((e) => e.id === id);
    if (item) {
        item.checked = !item.checked;
    }
};

watch(checkAll, (newVal) => {
    if (newVal) {
        listItems.value.forEach((e) => {
            e.checked = true;
        });
    } else {
        listItems.value.forEach((e) => {
            e.checked = false;
        });
    }
});
</script>
