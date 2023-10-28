<template>
    <CustomTable 
        :items="items" :loading="loading" :customItem="CustomItem" :fields="tableFields" :filters="true" actionsMenuType="tx-history"
        :actionsHeader="true"
        :orderIdOrder="idOrder" :invoiceIdOrder="invoiceIdOrder" :orderAmountOrder="amountOrder" :txTypeOrder="typeOrder" :txDateOrder="dateOrder" :txStatusOrder="statusOrder"
        :checkAll="checkAll" :tx-date-col-width="'228px'" :order-amount-inner-class="'justify-between w-full'"
        :orderId="orderId" :invoiceId="invoiceId" :orderAmount="orderAmount" :txType="txType" :txDate="txDate" :txStatus="txStatus"
        @orderIdOrderChange="
            idOrder === 0 ? (idOrder = 1) : (idOrder = 0);
            handleSortChange(emits, 'id', idOrder);"
        @invoiceIdOrderChange="
            invoiceIdOrder === 0 ? (invoiceIdOrder = 1) : (invoiceIdOrder = 0);
            handleSortChange(emits, 'invoiceId', invoiceIdOrder);"
        @orderAmountOrderChange="    
            amountOrder === 0 ? (amountOrder = 1) : (amountOrder = 0);
            handleSortChange(emits, 'amount', amountOrder);"
        @txTypeOrderChange="
            typeOrder === 0 ? (typeOrder = 1) : (typeOrder = 0);
            handleSortChange(emits, 'type', typeOrder);"
        @txDateOrderChange="
            dateOrder === 0 ? (dateOrder = 1) : (dateOrder = 0);
            handleSortChange(emits, 'date', dateOrder);"
        @txStatusOrderChange="
            statusOrder === 0 ? (statusOrder = 1) : (statusOrder = 0);
            handleSortChange(emits, 'status', statusOrder);"
        @checkAll="$emit('checkAll', checkAll);"
        @check="(itemId) => $emit('check', itemId)"
        @orderAmountFilterChange="(buffer) => {
            orderAmount = buffer
        }"
        @txTypeFilterChange="(event, item) => {
            txType = item.label
        }"
        @txStatusFilterChange="(event, item) => {
            txStatus = item.label
        }"
    />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { DashboardCustomerOrderItem } from '~~/types';
import { handleSortChange } from '~/services/dashboard/filter.service';
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
    checkAll: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(['active-filters', 'active-sort', 'check', 'checkAll']);

const tableFields = [
    'checkBox',
    'orderId',
    'invoiceId',
    'orderAmount',
    'txType',
    'txDate',
    'txStatus',
];

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
