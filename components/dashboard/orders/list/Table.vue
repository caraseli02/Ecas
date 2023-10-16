<template>
    <CustomTable
        :items="items" :error="error" :loading="loading" :fields="tableFields" :filters="true" :actionsMenuType="'orders-list'" :customItem="CustomItem"
        :actionsHeader="true"
        :orderIdOrder="idOrder" :orderTypeOrder="typeOrder" :orderDateOrder="dateOrder" :nameOrder="customerOrder" :paymentStatusOrder="paymentOrder" :orderStatusOrder="fulfillmentOrder" :orderTotalOrder="totalOrder"
        :orderId="id" :orderType="type" :orderDate="date" :name="customer" :paymentStatus="payment" :orderStatus="fulfillment" :orderTotal="total"
        :orderIdColWidth="'158px'" :orderTypeColWidth="'149px'" :orderDateColWidth="'228px'" :nameAndProfileColWidth="'275px'" :paymentStatusColWidth="'141px'" :orderStatusColWidth="'220px'" :orderTotalColWidth="'136px'"
        :nameAndProfileClass="'w-[calc(100%)]'" :orderTotalInnerClass="'justify-between w-full'"
        :orderStatusTitle="'Fulfillment'"
        :orderStatusKey="'fulfillment'" :profileKey="'customer'"
        :customGeneralHeaderClass="'relative px-2 py-4 bg-[#F2F2F2] flex flex-col gap-4'"
        :orderIdHeaderClass="'pl-4'"
        :orderIdItemClass="'flex items-center gap-4 text-sm leading-[1.43] ' + [loading ? 'px-4 py-[22px]' : 'p-6']"
        :orderTypeItemClass="'p-5' + [loading ? 'px-2' : '']"
        :orderStatusItemClass="'p-5' + [loading ? 'px-3' : '']"
        :applyCustomClasses="true"
        @orderIdOrderChange="
            idOrder === 0 ? (idOrder = 1) : (idOrder = 0);"
        @orderTypeOrderChange="
            typeOrder === 0 ? (typeOrder = 1) : (typeOrder = 0);"
        @orderDateOrderChange="
            dateOrder === 0 ? (dateOrder = 1) : (dateOrder = 0);"
        @nameOrderChange="
            customerOrder === 0 ? (customerOrder = 1) : (customerOrder = 0);"
        @paymentStatusOrderChange="
            paymentOrder === 0 ? (paymentOrder = 1) : (paymentOrder = 0);"
        @orderStatusOrderChange="
            fulfillmentOrder === 0 ? (fulfillmentOrder = 1) : (fulfillmentOrder = 0);"
        @orderTotalOrderChange="
            totalOrder === 0 ? (totalOrder = 1) : (totalOrder = 0);"
        @orderIdFilterChange=""
        @orderTypeFilterChange="(event: MouseEvent, item) => {
            type = item.label;
        }"
        @orderDateFilterChange="(buffer) => {
            date = buffer;
        }"
        @nameFilterChange=""
        @paymentStatusFilterChange="(event: MouseEvent, item) => {
            payment = item.label;
        }"
        @orderStatusFilterChange="(event: MouseEvent, item) => {
            fulfillment = item.label;
        }"
        @orderTotalFilterChange="(buffer) => {
            total = buffer;
        }"
    />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { DashboardOrderItem } from '~~/types';
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
    error: {
        type: Boolean,
        default: false,
    },
});

const tableFields = [
    'orderId',
    'orderType',
    'orderDate',
    'nameAndProfile',
    'paymentStatus',
    'orderStatus',
    'orderTotal',
];

const emits = defineEmits(['active-filters', 'active-sort']);


const id = ref('');
const idOrder = ref(0);
const type = ref('');
const typeOrder = ref(0);
const date = ref({
    start: null,
    end: null,
});

const dateOrder = ref(0);

const customerOrder = ref(0);
const customer = ref('');

const paymentOrder = ref(0);
const payment = ref('');

const fulfillment = ref('');

const fulfillmentOrder = ref(0);

const total = ref([0, 0]);
const totalOrder = ref(0);
</script>
