<script setup lang="ts">
import _ from 'lodash';
import { columns } from './columns';
import type { CustomerTableColumns, UserInterface } from '~/types/auth/user-interface';
import { useAuthStore } from '~/store/authStore';

const emit = defineEmits<{
  showTotalItems: [val: number];
}>();

const { $api } = useNuxtApp();
const totalItems = ref(0);
const pageCount = ref(0);
const loading = ref(true);
const error = ref(false);
const _emptyData = ref(false);
const listItems = ref<CustomerTableColumns[]>([]);

const authStore = useAuthStore();
const token = authStore.getToken();

const fetchAndSetCustomersList = _.debounce(async (page: number, perPage: number, filters = {}, sort = {}) => {
  error.value = false;
  // FIX to use userID

  // const data = await $api.userDashboard.fetchCustomersList(page, perPage, filters, sort);
  const data = await $api.controlPanel.fetchActivityLogs(page, perPage, filters, sort, token);

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
  listItems.value = data.data.items as unknown as UserInterface[];
  loading.value = false;
  emit('showTotalItems', data.data.total_items);
  return data.data;
}, 500);

fetchAndSetCustomersList(1, 10);
</script>

<template>
  <div
    class="h-full flex-1 flex-col space-y-8 flex min-h-[870px] w-[358px] md:w-[736px] lg:w-[976px] xl:w-[1392px] shadow-xs p-2 pt-6 md:p-6 rounded-xl"
  >
    <DataTable
      v-if="!loading"
      :fetch-fn="fetchAndSetCustomersList"
      :page-count="pageCount"
      :data="listItems"
      :columns="columns"
      :loading="loading"
      :total-items="totalItems"
    >
      <template #header="{ table, makeRefresh }">
        <DataTableHeadControls
          :error="error"
          title="Activity Log"
          :table="table"
          @refresh="makeRefresh()"
        >
          <!-- <UiButton class="flex-1 md:flex-grow-0 flex gap-2" size="sm">
<PlusIcon class="h-6 w-6" />
Create New
</UiButton> -->
        </DataTableHeadControls>
      </template>
      <template #toolbar="{ table }">
        <ClientTableLogsToolbar :table="table" />
      </template>
    </DataTable>
    <!-- <UiSkeleton v-else class="w-full h-full" /> -->
  </div>
</template>
