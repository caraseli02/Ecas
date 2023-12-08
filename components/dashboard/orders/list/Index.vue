<template>
  <div>
    <div
        class="relative flex items-center gap-8 bg-white rounded-xl px-6 shadow-xs overflow-x-auto hide-scrollbar mb-6">
      <button
          v-for="(filter, index) in orderFilters"
          :key="index"
          class="ordersFilter flex items-center gap-3 relative z-10 text-sm font-medium leading-[1.71] py-5 flex-shrink-0 transition-colors duration-300 md:py-8"
          :class="[filter.value === activeOrderFilter.value ? 'text-blue' : 'hover:text-blue']"
          @click="
                    activeOrderFilter = filter;
                    setTableData(filter);
                "
      >
                <span>
                    {{ filter.label }}
                </span>
        <span
            class="px-2 rounded-[25px] text-xs leading-[1.66] font-medium min-w-[32px] transition-colors duration-300"
            :class="filter.value === activeOrderFilter.value ? 'text-white bg-blue' : 'text-gray-300 bg-gray-200'"
        >
                    {{ filter.total_items || '0' }}
                </span>
      </button>
      <div
          class="absolute bottom-0 bg-blue h-1 rounded-t-lg transition-all duration-300"
          :style="{
                    width: filterHighlightWidth + 'px',
                    left: filterHightlightLeft + 'px',
                }"
      />
    </div>
    <div class="bg-white rounded-xl p-4 shadow-xs md:p-6">
      <div class="flex flex-col mb-6 md:block lg:flex">
        <div class="flex items-center justify-between mb-6 lg:mb-0 md:items-start">
          <div class="flex items-center gap-3">
            <div class="leading-normal font-semibold md:text-[20px] md:leading-[1.4]">Orders list</div>
            <WarningIcon v-if="error" class="w-6 h-6"/>
          </div>
          <div class="flex items-center gap-4">
            <button
                v-if="activeFilters.length > 0"
                class="group flex items-center text-gray-300 transition-colors duration-300 hover:text-blue max-md:hidden"
                @click="clearFilters"
            >
              <span class="text-sm leading-[1.43] font-medium mr-2"> Clear Filters </span>
              <XIcon class="w-4 h-4"/>
            </button>
            <button class="flex items-center justify-center bg-[#F2F2F2] rounded-lg p-2 text-gray-300 max-md:hidden">
              <FilterIcon class="w-6 h-6"/>
            </button>
            <button class="flex items-center justify-center bg-blue rounded-lg px-6 py-2 text-white">
              <PlusIcon class="w-6 h-6 mr-2"/>
              <span class="text-sm leading-[1.71] font-medium"> New Order </span>
            </button>
          </div>
        </div>
        <div class="flex items-center justify-end gap-4 md:hidden">
          <button
              v-if="activeFilters.length > 0"
              class="group flex items-center text-gray-300 transition-colors duration-300 hover:text-blue"
              @click="clearFilters"
          >
            <span class="text-sm leading-[1.43] font-medium mr-2"> Clear Filters </span>
            <XIcon class="w-4 h-4"/>
          </button>
          <button class="flex items-center justify-center bg-[#F2F2F2] rounded-lg p-2 text-gray-300">
            <FilterIcon class="w-6 h-6"/>
          </button>
        </div>
      </div>
      <div v-if="activeFilters.filter((item) => !item.hidden).length > 0" class="mb-6 md:flex md:items-start">
        <div class="leading-normal font-medium text-gray-300 mb-4 md:mr-4">Filters:</div>
        <div class="flex flex-wrap gap-4">
          <div
              v-for="(filter, index) in activeFilters.filter((item) => !item.hidden) as unknown as FilterInterface"
              :key="index"
              class="flex items-center p-1 bg-[#F2F2F2] rounded-md"
          >
                        <span class="text-sm leading-[1.43] text-gray-300 mr-2">
                            {{ `${OrdersFilterLabelsEnum[filter.filter]}: ${filter.value}` }}
                        </span>
            <button
                class="flex text-gray-300 transition-colors duration-300 hover:text-blue"
                @click="removeFilter(index)">
              <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4">
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
      <div>
        <DashboardCustomersListPagination
            :at-page="atPage"
            :per-page="perPage"
            :items-count="totalItems"
            position="top"
            class="flex-col mb-6 md:mb-8"
            @page-change="atPage = $event"
            @per-page-change="perPage = $event"
        />
        <DashboardOrdersListTable
            :items="visibleItemsFiltered"
            :loading="loading"
            :error="error"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import PlusIcon from '@/assets/icons/dashboard/plus.svg';
import FilterIcon from '@/assets/icons/dashboard/filter-2.svg';
import XIcon from '@/assets/icons/dashboard/x.svg';
import {DashboardOrderItem, OrderInterface, OrderStatus, PaymentStatusEnum} from '~~/types';
import {OrdersFilterLabelsEnum} from '~/types/dashboard/filter';
import WarningIcon from '@/assets/icons/dashboard/warning.svg';
import {FilterInterface, SortInterface} from '~/model/dashboard/table/filters';
import moment from 'moment/moment';
import {useNuxtApp} from '#app';

const {$api} = useNuxtApp();

interface TabFilter {
  label: string;
  value: string;
  key?: any;
  total_items: number;
  items?: OrderInterface[];
}

const orderFilters = ref<TabFilter[]>([
  {
    label: 'All orders',
    value: 'all-orders',
    total_items: 0,
  },
  {
    label: 'Active',
    value: 'active',
    key: [OrderStatus.Completed, OrderStatus.Canceled],
    total_items: 0,
  },
  {
    label: 'Last 24h',
    value: 'startDate',
    key: moment.utc().subtract(24, 'hours').format('DD/MM/YYYY HH:mm:ss'),
    total_items: 0,
  },
  {
    label: 'Awaiting Processing',
    value: 'awaitingProcessing',
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
    value: 'fulfilled',
    key: [OrderStatus.Shipped, OrderStatus.PartiallyShipped],
    total_items: 0,
  },
  {
    label: 'Completed',
    value: 'completed',
    key: OrderStatus.Completed,
    total_items: 0,
  },
  {
    label: 'Canceled',
    value: 'canceled',
    key: OrderStatus.Canceled,
    total_items: 0,
  },
] as TabFilter[]);

const activeOrderFilter = ref<TabFilter>(orderFilters.value[0]);
const filterHighlightWidth = ref(0);
const filterHightlightLeft = ref(0);

const activeFilters = ref([] as FilterInterface[]);
const activeSort = ref({} as SortInterface);

const loadTabFilters = async () => {
  for (const filter of orderFilters.value) {
    const filterObj = {};

    activeFilters.value = [];
    filterObj[filter.value] = `${filter.key}`;

    const data = await fetchAndSetOrdersList(
        atPage.value,
        perPage.value,
        filter.value === 'all-orders' ? {} : filterObj,
        activeSort.value
    );

    filter.total_items = data?.total_items;
  }
};

const setTableData = async (filter: TabFilter) => {
  const filterObj = {};

  filterObj[filter.value] = `${filter.key}`;
  atPage.value = 1;

  await fetchAndSetOrdersList(atPage.value, perPage.value, filter.value === 'all-orders' ? {} : filterObj, activeSort.value);
};

const setActiveFilterHighlight = () => {
  const activeFilter = activeOrderFilter.value;
  const index = orderFilters.value.findIndex((filter) => filter.value === activeFilter.value);

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
    {deep: true}
);

const clearFilters = async () => {
  activeFilters.value = [];
};

const removeFilter = async (index: number) => {
  activeFilters.value.splice(index, 1);
};

const listItems = ref<DashboardOrderItem[]>([]);

const atPage = ref(1);
const perPage = ref(10);
const loading = ref(true);
const error = ref(false);
const totalItems = ref(0);

const fetchAndSetOrdersList = async (page: number, perPage: number, filters = {}, sort = {}) => {
  loading.value = true;
  error.value = false;

  const data = await $api.orders.fetchOrders(page, perPage, filters, sort);

  if (!data || data.status !== 'success') {
    loading.value = false;
    error.value = true;
    return;
  }

  loading.value = false;
  totalItems.value = data.data.total_items;

  const paginatedOrders = data.data.items as OrderInterface[];

  if (paginatedOrders) {
    listItems.value = paginatedOrders.map((order) => ({
      id: order.shortId,
      type: order.type,
      name: order.userName || '-',
      date: moment(order.createdAt).format('DD/MM/YYYY'),
      firebaseId: order.userId,
      payment: order.paymentDetails?.status || PaymentStatusEnum.Pending,
      status: order.status,
      total: Number(order.total.toFixed(2))
    })) as unknown as DashboardOrderItem[];
  }

  return data.data;
};

await loadTabFilters();
await fetchAndSetOrdersList(atPage.value, perPage.value, activeFilters.value, activeSort.value);

const visibleItemsFiltered = computed(() => {
  return [...listItems.value].filter((e) => {
    return true;
  });
});

watch(
    [atPage, perPage, activeFilters, activeSort],
    async ([newAtPage, newPerPage, newActiveFilters, newActiveSort]) => {
      const filterParams = {};

      if (activeOrderFilter.value && activeOrderFilter.value.value !== 'all-orders') {
        filterParams[activeOrderFilter.value.value] = `${activeOrderFilter.value.key}`;
      }

      for (const filter of newActiveFilters) {
        filterParams[filter.filter] = filter.value;
      }

      if (Object.keys(filterParams).length) {
        atPage.value = 1;
        newAtPage = 1;
      }

      await fetchAndSetOrdersList(newAtPage, newPerPage, filterParams, newActiveSort);
    },
    {deep: true}
);

onMounted(() => {
  setActiveFilterHighlight();

  setTimeout(() => {
    loading.value = false;
  }, 5000);
});
</script>