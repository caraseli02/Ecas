<template>
    <CustomTable
        :items="items"
        :loading="loading"
        :custom-item="CustomItem"
        :fields="tableFields"
        :filters="true"
        actions-menu-type="tx-history"
        :actions-header="true"
        :order-id-order="idOrder"
        :invoice-id-order="invoiceIdOrder"
        :order-amount-order="amountOrder"
        :tx-type-order="typeOrder"
        :tx-date-order="dateOrder"
        :tx-status-order="statusOrder"
        :check-all="checkAll"
        tx-date-col-width="228px"
        :order-amount-inner-class="'justify-between w-full'"
        :order-id="orderId"
        :invoice-id="invoiceId"
        :order-amount="orderAmount"
        :tx-type="txType"
        :tx-date="txDate"
        :tx-status="txStatus"
        @orderIdOrderChange="
            idOrder === 0 ? (idOrder = 1) : (idOrder = 0);
            handleSortChange(emits, 'orderShortId', idOrder);
        "
        @invoiceIdOrderChange="
            invoiceIdOrder === 0 ? (invoiceIdOrder = 1) : (invoiceIdOrder = 0);
            handleSortChange(emits, 'invoiceId', invoiceIdOrder);
        "
        @orderAmountOrderChange="
            amountOrder === 0 ? (amountOrder = 1) : (amountOrder = 0);
            handleSortChange(emits, 'amount', amountOrder);
        "
        @txTypeOrderChange="
            typeOrder === 0 ? (typeOrder = 1) : (typeOrder = 0);
            handleSortChange(emits, 'type', typeOrder);
        "
        @txDateOrderChange="
            dateOrder === 0 ? (dateOrder = 1) : (dateOrder = 0);
            handleSortChange(emits, 'createdAt', dateOrder);
        "
        @txStatusOrderChange="
            statusOrder === 0 ? (statusOrder = 1) : (statusOrder = 0);
            handleSortChange(emits, 'status', statusOrder);
        "
        @checkAll="$emit('checkAll', checkAll)"
        @check="(itemId) => $emit('check', itemId)"
        @txDateFilterChange="
            (buffer) => {
                txDate = buffer;
                handleFilterChange(activeFilters, emits, 'startDate', formattedDate(buffer.start), true);
                handleFilterChange(activeFilters, emits, 'endDate', formattedDate(buffer.end), true);
            }
        "
        @orderIdFilterChange="handleFilterChange(activeFilters, emits, 'orderShortId', $event, false)"
        @invoiceIdFilterChange="handleFilterChange(activeFilters, emits, 'invoiceId', $event, false)"
        @orderAmountFilterChange="
            (buffer) => {
                orderAmount = buffer;
                handleFilterChange(activeFilters, emits, 'amountFrom', buffer[0], true);
                handleFilterChange(activeFilters, emits, 'amountTo', buffer[1], true);
            }
        "
        @txTypeFilterChange="
            (event, item) => {
                txType = item.label;
                handleFilterChange(activeFilters, emits, 'type', item.key, true);
            }
        "
        @txStatusFilterChange="
            (event, item) => {
                txStatus = item.label;
                handleFilterChange(activeFilters, emits, 'status', item.key, true);
            }
        "
    />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { formattedDate, handleFilterChange, handleSortChange } from '~/services/dashboard/filter.service';
import CustomTable from '~/components/shared/tables/CustomTable.vue';
import CustomItem from '~/components/shared/tables/CustomItem.vue';
import { TransactionInterface } from '~/types/dashboard/transaction';
import { FilterInterface } from '~/model/dashboard/table/filters';

defineProps({
    items: {
        type: Array as PropType<TransactionInterface[]>,
        required: true,
    },
    loading: {
        type: Boolean,
        default: true,
    },
    checkAll: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(['active-filters', 'active-sort', 'check', 'checkAll']);

const activeFilters: FilterInterface[] = [];

const tableFields = ['checkBox', 'orderId', 'invoiceId', 'orderAmount', 'txType', 'txDate', 'txStatus'];

const orderId = ref('');
const invoiceId = ref('');
const orderAmount = ref([0, 0]);
const txType = ref('');
const txDate = ref({
    start: null,
    end: null,
});
const txStatus = ref('');

const idOrder = ref(0);
const invoiceIdOrder = ref(0);
const amountOrder = ref(0);
const typeOrder = ref(0);
const dateOrder = ref(0);
const statusOrder = ref(0);
</script>