<template>
    <CustomTable :items="items" :loading="loading" :customItem="CustomItem" :filters="true" :fields="tableFields" :actionsMenuType="'customer-orders'"
        :actionsHeader="true" 
        :orderIdOrder="idOrder" :orderTypeOrder="typeOrder" :orderDateOrder="dateOrder" :orderStatusOrder="statusOrder" :orderTotalOrder="totalOrder"
        :orderId="id" :orderType="type" :orderDate="date" :orderStatus="status" :orderTotal="total"
        @orderIdOrderChange="
            idOrder === 0 ? (idOrder = 1) : (idOrder = 0);
            handleSortChange(emits, 'id', idOrder);"
        @orderTypeOrderChange="    
            typeOrder === 0 ? (typeOrder = 1) : (typeOrder = 0);
            handleSortChange(emits, 'type', typeOrder);"
        @orderDateOrderChange="
            dateOrder === 0 ? (dateOrder = 1) : (dateOrder = 0);
            handleSortChange(emits, 'date', dateOrder);"
        @orderStatusOrderChange="
            statusOrder === 0 ? (statusOrder = 1) : (statusOrder = 0);
            handleSortChange(emits, 'status', statusOrder);"
        @orderTotalOrderChange="
            totalOrder === 0 ? (totalOrder = 1) : (totalOrder = 0);
            handleSortChange(emits, 'total', totalOrder);"
        @orderIdFilterChange="   
            handleFilterChange(activeFilters, emits, 'id', $event);"
        @orderTypeFilterChange="(event: MouseEvent, item) => {
            type = item.label;
        }"
        @orderDateFilterChange="(buffer) => {
            date = buffer;
        }"
        @orderStatusFilterChange="(event: MouseEvent, item) => {
            status = item.label;
            handleFilterChange(activeFilters, emits, 'status', $event);
        }"
        @orderTotalFilterChange="(buffer) => {   
            total = buffer;
        }"
    />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { DashboardCustomerOrderItem } from '~~/types';
import { FilterInterface } from '~/model/dashboard/table/filters';
import { handleFilterChange, handleSortChange } from '~/services/dashboard/filter.service';
import CustomTable from '~/components/shared/tables/CustomTable.vue';
import CustomItem from '~/components/shared/tables/CustomItem.vue';

defineProps({
    items: {
        type: Array as PropType<DashboardCustomerOrderItem[]>,
        required: true,
    },
    loading: {
        type: Boolean,
        default: true,
    },
});

const emits = defineEmits(['active-filters', 'active-sort']);

const activeFilters: FilterInterface[] = [];

const tableFields = [
    'orderId',
    'orderType',
    'orderDate',
    'orderStatus',
    'orderTotal',
];

const id = ref('');
const idOrder: number = ref(0);
const type = ref('');
const typeOrder: number = ref(0);
const date = ref({
    start: null,
    end: null,
});

const dateOrder: number = ref(0);

const status = ref('');
const statusOrder: number = ref(0);

const total = ref([0, 0]);
const totalOrder: number = ref(0);
</script>
