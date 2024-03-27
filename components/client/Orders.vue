<script setup lang="ts">
import { OrderTableColumns, type OrderInterface } from '~~/types';
import { columns } from './columns'
import _ from 'lodash';
import { PlusIcon } from 'lucide-vue-next';

const { $api } = useNuxtApp();

const totalItems = ref(0);
const pageCount = ref(0);
const loading = ref(true);
const error = ref(false);
const emptyData = ref(false);
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

await fetchAndSetOrdersList(1, 10);

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
    :loading="loading"
    :total-items="totalItems" 
    >
      <template #header="{table, makeRefresh}">
        <DataTableHeadControls 
          :error="error"
          title="Orders List" 
          :table="table" 
          @refresh="makeRefresh()"
        >
          <!-- <UiButton class="flex-1 md:flex-grow-0 flex gap-2" size="sm">
            <PlusIcon class="h-6 w-6" />
            Create New
          </UiButton> -->
        </DataTableHeadControls>
      </template>
      <template #toolbar="{table}">
        <ClientOrdersToolbar :table="table" />
      </template>
    </DataTable>
    <UiSkeleton v-if="loading" class="w-full h-full rounded absolute inset-0 z-0 p-4" />
  </div>
</template>
