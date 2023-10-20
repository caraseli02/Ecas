<template>
    <CustomTable
        :items="items"
        :error="error"
        :loading="loading"
        :fields="tableFields"
        :filters="true"
        :actions-menu-type="'orders-list'"
        :custom-item="CustomItem"
        :actions-header="true"
        :order-id-order="idOrder"
        :order-type-order="typeOrder"
        :order-date-order="dateOrder"
        :name-order="customerOrder"
        :payment-status-order="paymentOrder"
        :order-status-order="statusOrder"
        :order-total-order="totalOrder"
        :order-id="id"
        :order-type="type"
        :order-date="date"
        :name="customer"
        :payment-status="payment"
        :order-status="status"
        :order-total="total"
        :order-id-col-width="'158px'"
        :order-type-col-width="'149px'"
        :order-date-col-width="'228px'"
        :name-and-profile-col-width="'275px'"
        :payment-status-col-width="'141px'"
        :order-status-col-width="'220px'"
        :order-total-col-width="'136px'"
        :name-and-profile-class="'w-[calc(100%)]'"
        :order-total-inner-class="'justify-between w-full'"
        :order-status-title="'Order status'"
        :order-status-key="'status'"
        :profile-key="'customer'"
        :custom-general-header-class="'relative px-2 py-4 bg-[#F2F2F2] flex flex-col gap-4'"
        :order-id-header-class="'pl-4'"
        :order-id-item-class="'flex items-center gap-4 text-sm leading-[1.43] ' + [loading ? 'px-4 py-[22px]' : 'p-6']"
        :order-type-item-class="'p-5' + [loading ? 'px-2' : '']"
        :order-status-item-class="'p-5' + [loading ? 'px-3' : '']"
        :apply-custom-classes="true"
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
        @nameOrderChange="
            customerOrder === 0 ? (customerOrder = 1) : (customerOrder = 0);
            handleSortChange(emits, 'name', customerOrder);
        "
        @paymentStatusOrderChange="
            paymentOrder === 0 ? (paymentOrder = 1) : (paymentOrder = 0);
            handleSortChange(emits, 'paymentStatus', paymentOrder);
        "
        @orderStatusOrderChange="
            statusOrder === 0 ? (statusOrder = 1) : (statusOrder = 0);
            handleSortChange(emits, 'status', statusOrder);
        "
        @orderTotalOrderChange="
            totalOrder === 0 ? (totalOrder = 1) : (totalOrder = 0);
            handleSortChange(emits, 'total', totalOrder);
        "
        @nameFilterChange="handleFilterChange(activeFilters, emits, 'name', $event)"
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
        @paymentStatusFilterChange="(event: MouseEvent, item) => {
            paymentStatus = item.label;
            handleFilterChange(activeFilters, emits, 'paymentStatus', item.key, true);
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
import CustomTable from '~/components/shared/tables/CustomTable.vue';
import CustomItem from '~/components/shared/tables/CustomItem.vue';
import { formattedDate, handleFilterChange, handleSortChange } from '~/services/dashboard/filter.service';
import paymentStatus from '~/components/shared/tables/micro/row-items/PaymentStatus.vue';
import { FilterInterface } from '~/model/dashboard/table/filters';

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

const tableFields = ['orderId', 'orderType', 'orderDate', 'nameAndProfile', 'paymentStatus', 'orderStatus', 'orderTotal'];

const emits = defineEmits(['active-filters', 'active-sort']);

const activeFilters: FilterInterface[] = [];

const id = ref('');
const idOrder = ref(0);
const type = ref('');
const typeOrder = ref(0);
const date = ref({
    start: null,
    end: null,
});
const dateOrder = ref(0);
const customer = ref('');
const customerOrder = ref(0);
const paymentOrder = ref(0);
const payment = ref('');
const status = ref('');
const statusOrder = ref(0);
const total = ref([0, 0]);
const totalOrder = ref(0);
</script>