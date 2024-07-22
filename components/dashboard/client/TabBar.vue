<template>
    <div class="relative flex items-center gap-8 bg-white rounded-xl px-6 shadow-xs overflow-x-auto hide-scrollbar">
        <button
            v-for="(filter, index) in orderFilters"
            :key="index"
            class="ordersFilter flex items-center gap-3 relative z-10 text-sm font-medium leading-[1.71] py-5 flex-shrink-0 transition-colors duration-300 md:py-8"
            :class="[filter.label === activeOrderFilter?.label ? 'text-blue-500' : 'hover:text-blue-500']"
            @click="activeOrderFilter = filter"
        >
            <span v-if="filter.label">
                {{ filter.label }}
            </span>
            <span
                v-if="filter.total_items"
                class="px-2 rounded-[25px] text-xs leading-[1.66] font-medium min-w-[32px] transition-colors duration-300"
                :class="filter.label === activeOrderFilter?.label ? 'text-white bg-blue-500' : 'text-slate-500 bg-gray-100'"
            >
                {{ filter.total_items }}
            </span>
            <template v-if="filter.icon === 'dashboard'">
                <DashboardIcon />
            </template>
        </button>
        <div
            class="absolute bottom-0 bg-blue-500 h-1 rounded-t-lg transition-all duration-300"
            :style="{
                width: filterHighlightWidth + 'px',
                left: filterHightlightLeft + 'px',
            }"
        />
    </div>
</template>

<script setup lang="ts">
import { OrderInterface } from '~~/types';
import DashboardIcon from '@/assets/icons/dashboard/dashboard.svg';
import Emitter from 'tiny-emitter/instance.js';

interface TabFilter {
    label?: string;
    value: string;
    key?: any;
    total_items?: number;
    items?: OrderInterface[];
    icon?: string;
}

const orderFilters = ref<TabFilter[]>([
    {
        icon: 'dashboard',
        value: 'home',
    },
    {
        label: 'Orders',
        value: 'orders',
        total_items: 130, // Assuming the number in the image represents the total_items
    },
    {
        label: 'Favorites',
        value: 'favorites',
        total_items: 130, // Update this number as needed
    },
    // {
    //     label: 'Messages',
    //     value: 'messages',
    //     total_items: 130, // Update this number as needed
    // },
    {
        label: 'Organization',
        value: 'organization',
    },
    {
        label: 'Agents',
        value: 'agents',
        total_items: 0, // Update this number as needed
    },
    {
        label: 'Transaction History',
        value: 'transaction_history',
    },
    // {
    //     label: 'Docs',
    //     value: 'docs',
    //     total_items: 130, // Update this number as needed
    // },
    {
        label: 'Activity Logs',
        value: 'activityLogs',
    },
    {
        label: 'Settings',
        value: 'settings',
    },
]);

const activeOrderFilter = defineModel<TabFilter>();

const filterHighlightWidth = ref(0);
const filterHightlightLeft = ref(0);

Emitter.on('customer-dashboard-nav-tab', async (tab: { label: string; value: string }) => {
    if (tab) {
        activeOrderFilter.value = tab;
    }
});

const setActiveFilterHighlight = () => {
    const activeFilter = activeOrderFilter.value;
    const index = orderFilters.value.findIndex((filter) => filter.label === activeFilter.label);

    if (index !== -1) {
        const filterElement = document.querySelectorAll('.ordersFilter')[index] as HTMLElement;

        if (filterElement) {
            filterHighlightWidth.value = filterElement.clientWidth;
            filterHightlightLeft.value = filterElement.offsetLeft;
        }
    }
};

watch(
    activeOrderFilter,
    () => {
        setActiveFilterHighlight();
    },
    { deep: true }
);

onMounted(() => {
    setActiveFilterHighlight();
});
</script>

<style scoped></style>
