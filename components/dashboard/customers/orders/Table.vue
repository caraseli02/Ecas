<template>
    <CustomTable
        :items="items"
        :loading="loading"
        :custom-item="CustomItem"
        :filters="true"
        :fields="tableFields"
        :actions-menu-type="'customer-orders'"
        :actions-header="true"
        :order-id-order="idOrder"
        :order-type-order="typeOrder"
        :order-date-order="dateOrder"
        :order-status-order="statusOrder"
        :order-total-order="totalOrder"
        :order-id="id"
        :order-type="type"
        :order-date="date"
        :order-status="status"
        :order-total="total"
        :order-status-key="'status'"
        @orderIdOrderChange="
            idOrder === 0 ? (idOrder = 1) : (idOrder = 0);
            handleSortChange(emits, 'shortId', idOrder);
        "
        @orderTypeOrderChange="
            typeOrder === 0 ? (typeOrder = 1) : (typeOrder = 0);
            handleSortChange(emits, 'type', typeOrder);
        "
        @orderDateOrderChange="
            dateOrder === 0 ? (dateOrder = 1) : (dateOrder = 0);
            handleSortChange(emits, 'createdAt', dateOrder);
        "
        @orderStatusOrderChange="
            statusOrder === 0 ? (statusOrder = 1) : (statusOrder = 0);
            handleSortChange(emits, 'status', statusOrder);
        "
        @orderTotalOrderChange="
            totalOrder === 0 ? (totalOrder = 1) : (totalOrder = 0);
            handleSortChange(emits, 'total', totalOrder);
        "
        @orderIdFilterChange="handleFilterChange(activeFilters, emits, 'shortId', $event)"
        @orderTypeFilterChange="(event: MouseEvent, item) => {
            type = item.label;
            handleFilterChange(activeFilters, emits, 'type', item.key, true);
        }"
        @orderDateFilterChange="
            (buffer) => {
                date = buffer;
                handleFilterChange(activeFilters, emits, 'startDate', formattedDate(buffer.start), true);
                handleFilterChange(activeFilters, emits, 'endDate', formattedDate(buffer.end), true);
            }
        "
        @orderStatusFilterChange="(event: MouseEvent, item) => {
            status = item.label;
            handleFilterChange(activeFilters, emits, 'status', status, true);
        }"
        @orderTotalFilterChange="
            (buffer) => {
                total = buffer;
                handleFilterChange(activeFilters, emits, 'totalFrom', buffer[0], true);
                handleFilterChange(activeFilters, emits, 'totalTo', buffer[1], true);
            }
        "
    />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { DashboardOrderItem } from '~~/types';
import { FilterInterface } from '~/model/dashboard/table/filters';
import { formattedDate, handleFilterChange, handleSortChange } from '~/services/dashboard/filter.service';
import CustomTable from '~/components/shared/tables/CustomTable.vue';
import CustomItem from '~/components/shared/tables/CustomItem.vue';

defineProps({
    items: {
        type: Array as PropType<DashboardOrderItem[]>,
        required: true,
    },
    loading: {
        type: Boolean,
        default: true,
    },
});

const emits = defineEmits(['active-filters', 'active-sort']);

const activeFilters: FilterInterface[] = [];

const tableFields = ['orderId', 'orderType', 'orderDate', 'orderStatus', 'orderTotal'];

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