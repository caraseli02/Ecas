<script setup lang="ts">
import { columns } from './transactionCols'
import { FilterInterface, SortInterface } from '~/model/dashboard/table/filters';
import _ from 'lodash';
import moment from 'moment';
import { TransactionInterface } from '~/types/dashboard/transaction';

const { $api } = useNuxtApp();

const totalItems = ref(0);
const pageCount = ref(0);
const loading = ref(true);
const error = ref(false);
const activeFilters = ref([] as FilterInterface[]);
const activeSort = ref({} as SortInterface);
const listItems = ref<TransactionInterface[]>([]);

const fetchAndSetTransactionList = _.debounce(async (page: number, perPage: number, filters = {}, sort = {}) => {
  error.value = false;

  // filters['userId'] = props.id;

  const data = await $api.controlPanel.fetchTransactions(page, perPage, filters, sort);

  if (!data || data.status !== 'success') {
    loading.value = false;
    error.value = true;
    return;
  }

  loading.value = false;
  totalItems.value = data.data.total_items;

  listItems.value = data.data.items as TransactionInterface[];
  pageCount.value = data.data.page_count;
  // listItems.value.forEach((item: TransactionInterface) => {
  //   item.createdAt = moment(item.createdAt).format('DD/MM/YYYY');
  //   item.amount = Number(item.amount).toFixed(2);
  //   item.invoiceId = item.invoiceId || '-';
  // });

  return data.data;
}, 250);

await fetchAndSetTransactionList(1, 10, activeFilters.value, activeSort.value);

</script>

<template>
  <div
    class="h-full flex-1 flex-col space-y-8 flex w-[358px] md:w-[736px] lg:w-[976px] xl:w-[1392px] shadow-xs p-2 pt-6 md:p-6 rounded-xl">
    <DataTable 
    v-if="!loading" 
    :fetch-fn="fetchAndSetTransactionList" 
    :page-count="pageCount" 
    :data="listItems"
    :columns="columns">
      <template #header="{ table }">
        <DataTableHeadControls :table="table" />
      </template>
    </DataTable>
  </div>
</template>
