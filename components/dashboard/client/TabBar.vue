<template>
    <div class="relative flex items-center gap-8 bg-white rounded-xl px-6 shadow-xs overflow-x-auto hide-scrollbar">
        <button
            v-for="(filter, index) in computedOrderFilters"
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
import { useAuthStore } from '@/store/authStore';
import { storeToRefs } from 'pinia';

interface TabFilter {
    label?: string;
    value: string;
    key?: any;
    total_items?: number;
    items?: OrderInterface[];
    icon?: string;
    requiredPermission?: string;
}

const authStore = useAuthStore();
const { loggedInUser } = storeToRefs(authStore);
const orderFilters = ref<TabFilter[]>([
    {
        icon: 'dashboard',
        value: 'home',
    },
    {
        label: 'Orders',
        value: 'orders',
        requiredPermission: 'read:orders'
    },
    {
        label: 'Favorites',
        value: 'favorites',
        requiredPermission: 'read:favourite'
    },
    {
        label: 'Messages',
        value: 'messages',
        requiredPermission: 'read:message'
    },
    {
        label: 'Organization',
        value: 'organization',
        requiredPermission: 'read:organization'

    },
    {
        label: 'Agents',
        value: 'agents',
        requiredPermission: 'read:agents'
    },
    {
        label: 'Transaction History',
        value: 'transaction_history',
        requiredPermission: 'read:payment'
    },
    {
        label: 'Activity Logs',
        value: 'activityLogs',
        requiredPermission: 'read:audit'
    },
    {
        label: 'Settings',
        value: 'settings',
    },
]);

const computedOrderFilters = computed(() => {
    return orderFilters.value.filter(filter => 
        !filter.requiredPermission || loggedInUser.value?.permissions.includes(filter.requiredPermission)
    );
});

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
    const index = computedOrderFilters.value.findIndex((filter) => filter.label === activeFilter?.label);

    nextTick(() => {
        if (index !== -1) {
        const filterElement = document.querySelectorAll('.ordersFilter')[index] as HTMLElement;

        if (filterElement) {
            filterHighlightWidth.value = filterElement.clientWidth;
            filterHightlightLeft.value = filterElement.offsetLeft;
        }
    }
    });

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
