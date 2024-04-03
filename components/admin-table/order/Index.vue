<script setup lang="ts">
import { type OrderInterface, OrderStatus, OrderTableColumns } from '~/types';
import { columns } from './columns';
import moment from 'moment/moment';

interface TabFilter {
    label: string;
    value: string;
    key?: any;
    total_items: number;
    items?: OrderInterface[];
}

const { $api } = useNuxtApp();

const totalItems = ref(0);
const pageCount = ref(0);
const loading = ref(true);
const error = ref(false);
const emptyData = ref(false);
const listItems = ref<OrderTableColumns[]>([]);

const fetchAndSetOrdersList = async (page: number, perPage: number, filters = {}, sort = {}) => {
    error.value = false;

    // FIX to use userID
    const data = await $api.orders.fetchOrders(page, perPage, filters, sort);

    if (!data || data.status !== 'success') {
        loading.value = false;
        error.value = true;
        totalItems.value = 0;
        pageCount.value = 0;
        listItems.value = [];
        return;
    }

    totalItems.value = data.data.total_items;
    pageCount.value = data.data.page_count;
    listItems.value = data.data.items as unknown as OrderInterface[];
    loading.value = false;
    console.log(totalItems.value);
    return data.data;
};

const orderFilters = ref<TabFilter[]>([
    {
        label: 'All orders',
        total_items: 0,
    },
    {
        label: 'Active',
        value: 'status',
        key: [OrderStatus.Completed, OrderStatus.Canceled],
        total_items: 0,
    },
    {
        label: 'Last 24h',
        value: 'startDate',
        key: [moment.utc().subtract(24, 'hours').format('DD/MM/YYYY HH:mm:ss')],
        total_items: 0,
    },
    {
        label: 'Awaiting Processing',
        value: 'status',
        key: [
            OrderStatus.VerificationRequired,
            OrderStatus.Processing,
            OrderStatus.Pending,
            OrderStatus.AwaitingFulfillment,
            OrderStatus.AwaitingShipment,
            OrderStatus.AwaitingPickup,
            OrderStatus.AwaitingPayment,
        ],
        total_items: 0,
    },
    {
        label: 'Fulfilled',
        value: 'status',
        key: [OrderStatus.Shipped, OrderStatus.PartiallyShipped],
        total_items: 0,
    },
    {
        label: 'Completed',
        value: 'status',
        key: [OrderStatus.Completed],
        total_items: 0,
    },
    {
        label: 'Canceled',
        value: 'status',
        key: [OrderStatus.Canceled],
        total_items: 0,
    },
] as TabFilter[]);

const activeOrderFilter = ref<TabFilter>(orderFilters.value[0]);
const filterHighlightWidth = ref(0);
const filterHightlightLeft = ref(0);

const loadTabFilters = async () => {
    for (const filter of orderFilters.value) {
        const filterObj = {} as any;

        if (filter.key?.length) {
            filterObj['status'] = filter.key.join(',');
        }

        const data = await fetchAndSetOrdersList(pageCount.value, 10, filterObj, {});
        filter.total_items = data?.total_items ?? 0;
    }
};

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
    async () => {
        setActiveFilterHighlight();

        const filter = {} as any;
        if (activeOrderFilter.value.key?.length) {
            filter['status'] = activeOrderFilter.value.key.join(',');
        }

        await fetchAndSetOrdersList(1, 10, filter, {});
    },
    { deep: true }
);

await loadTabFilters();
await fetchAndSetOrdersList(1, 10);

onMounted(() => {
    setActiveFilterHighlight();

    setTimeout(() => {
        loading.value = false;
    }, 1000);
});
</script>

<template>
    <div class="relative flex items-center gap-8 bg-white rounded-xl px-6 shadow-xs overflow-x-auto hide-scrollbar mb-6">
        <button
            v-for="(filter, index) in orderFilters"
            :key="index"
            class="ordersFilter flex items-center gap-3 relative z-10 text-sm font-medium leading-[1.71] py-5 flex-shrink-0 transition-colors duration-300 md:py-8"
            :class="[filter.label === activeOrderFilter.label ? 'text-blue-500' : 'hover:text-blue-500']"
            @click="activeOrderFilter = filter"
        >
            <span>
                {{ filter.label }}
            </span>
            <span
                class="px-2 rounded-[25px] text-xs leading-[1.66] font-medium min-w-[32px] transition-colors duration-300"
                :class="filter.label === activeOrderFilter.label ? 'text-white bg-blue-500' : 'text-slate-500 bg-gray-100'"
            >
                {{ filter.total_items || '0' }}
            </span>
        </button>
        <div
            class="absolute bottom-0 bg-blue-500 h-1 rounded-t-lg transition-all duration-300"
            :style="{
                width: filterHighlightWidth + 'px',
                left: filterHightlightLeft + 'px',
            }"
        />
    </div>
    <div
        class="h-full flex-1 flex-col space-y-8 flex w-[358px] md:w-[736px] lg:w-[976px] xl:w-[1392px] shadow-xs p-2 pt-6 md:p-6 rounded-xl"
    >
        <DataTable
            v-if="!loading"
            :fetch-fn="fetchAndSetOrdersList"
            :page-count="pageCount"
            :data="listItems"
            :columns="columns"
            :loading="loading"
            :total-items="totalItems"
        >
            <template #header="{ table, makeRefresh }">
                <DataTableHeadControls :error="error" title="Orders List" :table="table" @refresh="makeRefresh()">
                    <!-- <UiButton class="flex-1 md:flex-grow-0 flex gap-2" size="sm">
                      <PlusIcon class="h-6 w-6" />
                      Create New
                    </UiButton> -->
                </DataTableHeadControls>
            </template>
            <template #toolbar="{ table }">
                <AdminTableOrderToolbar :table="table" />
            </template>
        </DataTable>
    </div>
</template>