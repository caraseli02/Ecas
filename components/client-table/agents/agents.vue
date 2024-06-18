<script setup lang="ts">
import { columns } from './columns';
import _ from 'lodash';
import { CustomerTableColumns, UserInterface } from '~/types/auth/user-interface';
import { dataMuck } from './muck-data.js'

const { $api } = useNuxtApp();

const totalItems = ref(0);
const pageCount = ref(0);
const loading = ref(true);
const error = ref(false);
const emptyData = ref(false);
const listItems = ref<CustomerTableColumns[]>([]);

const fetchAndSetCustomersList = _.debounce(async (page: number, perPage: number, filters = {}, sort = {}) => {
    error.value = false;
    loading.value = true;

    // FIX to use userID

    const data = dataMuck
    
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
}, 500);

fetchAndSetCustomersList(1, 10);
</script>

<template>
    <div
        class="h-full flex-1 flex-col space-y-8 flex w-[393px] md:w-[640px] lg:w-[896px] xl:w-[1312px] 2xl:w-[1444px] shadow-xs p-2 pt-6 md:p-6 rounded-xl"
    >
        <DataTable
            v-if="listItems.length > 0"
            :fetch-fn="fetchAndSetCustomersList"
            :page-count="pageCount"
            :data="listItems"
            :columns="columns"
            :loading="loading"
            :total-items="totalItems"
        >
            <template #header="{ table, makeRefresh }">
                <DataTableHeadControls :error="error" title="Agents" :table="table" @refresh="makeRefresh()">
                    <!-- <UiButton class="flex-1 md:flex-grow-0 flex gap-2" size="sm">
                      <PlusIcon class="h-6 w-6" />
                      Create New
                    </UiButton> -->
                </DataTableHeadControls>
            </template>
            <template #toolbar="{ table }">
                <ClientTableAgentsToolbar :table="table" />
            </template>
        </DataTable>
    </div>
</template>
