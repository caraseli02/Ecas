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
            handleSortChange(emits, 'id', idOrder);
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
            handleSortChange(emits, 'date', dateOrder);
        "
        @txStatusOrderChange="
            statusOrder === 0 ? (statusOrder = 1) : (statusOrder = 0);
            handleSortChange(emits, 'status', statusOrder);
        "
        @checkAll="$emit('checkAll', checkAll)"
        @check="(itemId) => $emit('check', itemId)"
        @orderAmountFilterChange="
            (buffer) => {
                orderAmount = buffer;
            }
        "
        @txTypeFilterChange="
            (event, item) => {
                txType = item.label;
            }
        "
        @txStatusFilterChange="
            (event, item) => {
                txStatus = item.label;
            }
        "
    />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { handleSortChange } from '~/services/dashboard/filter.service';
import CustomTable from '~/components/shared/tables/CustomTable.vue';
import CustomItem from '~/components/shared/tables/CustomItem.vue';
import { TransactionInterface } from '~/types/dashboard/transaction';

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