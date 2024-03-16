<script setup lang="ts">
import { OrderTableColumns, type OrderInterface } from '~~/types';
import { columns } from './columns'
import { FilterInterface, SortInterface } from '~/model/dashboard/table/filters';
import _ from 'lodash';

const { $api } = useNuxtApp();

const totalItems = ref(0);
const pageCount = ref(0);
const loading = ref(true);
const error = ref(false);
const emptyData = ref(false);
const activeFilters = ref([] as FilterInterface[]);
const activeSort = ref({} as SortInterface);
const listItems = ref<OrderTableColumns[]>([]);
const fetchAndSetOrdersList = _.debounce(async (page: number, perPage: number, filters = {}, sort = {}) => {
  error.value = false;

  // FIX to use userID

  const data = await $api.orders.fetchOrders(page, perPage, filters, sort);

  if (!data || data.status !== 'success') {
    loading.value = false;
    error.value = true;
    return;
  }

  totalItems.value = data.data.total_items;
  pageCount.value = data.data.page_count;
  listItems.value = data.data.items as unknown as OrderInterface[];
  loading.value = false
}, 500);

await fetchAndSetOrdersList(1, 10, activeFilters.value, activeSort.value);

</script>

<template>
  <div
    class="h-full flex-1 flex-col space-y-8 flex w-[358px] md:w-[736px] lg:w-[976px] xl:w-[1392px] shadow-xs p-2 pt-6 md:p-6 rounded-xl">
    <DataTable 
    v-if="!loading" 
    :fetch-fn="fetchAndSetOrdersList" 
    :page-count="pageCount" 
    :data="listItems"
    :columns="columns"
    >
      <template #header="{table}">
        <DataTableHeadControls :table="table" />
      </template>
  </DataTable>
</div></template>
