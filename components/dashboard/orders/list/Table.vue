<template>
    <div class="mb-6 min-h-[350px] md:mb-8">
        <div class="dashboardTable grid grid-cols-1 gap-1 rounded-t-lg overflow-x-auto scrollbar-thin"
            @scroll="handleScroll">
            <div class="grid grid-cols-[158px,149px,228px,275px,141px,220px,136px,85px] items-center rounded-t-lg">
                <div class="p-4 pr-2 bg-[#F2F2F2] rounded-l-lg">
                    <div class="mb-4">
                        <SortAscDesc @sortChange="
                            idOrder === 0 ? (idOrder = 1) : (idOrder = 0);
                        handleSortChange(emits, 'id', idOrder);" :order="idOrder" :title="'Order #ID'" />
                    </div>
                    <DashboardSearch v-model="id" placeholder="Search #ID" size="sm" class="w-full"
                        @input="handleFilterChange(activeFilters, emits, 'id', $event)" />
                </div>
                <div class="relative px-2 py-4 bg-[#F2F2F2]">
                    <div class="mb-4">
                        <SortAscDesc @sortChange="
                            typeOrder === 0 ? (typeOrder = 1) : (typeOrder = 0);
                        handleSortChange(emits, 'type', typeOrder);" :order="typeOrder" :title="'Type'" />
                    </div>
                    <CustomSelect :selectedItem="type" :optionsVisible="showTypeOptions"
                        @handleShow="handleShowTypeOptions" />
                </div>
                <div class="relative px-2 py-4 bg-[#F2F2F2]">
                    <div class="mb-4">
                        <SortAscDesc @sortChange="
                            dateOrder === 0 ? (dateOrder = 1) : (dateOrder = 0);
                        handleSortChange(emits, 'date', dateOrder);" :order="dateOrder" :title="'Date'" />
                    </div>
                    <DatePickerButton :range="date" :datePickerVisible="showDateRange" @showDatePicker="handleShowDate" />
                </div>
                <div class="relative px-2 py-4 bg-[#F2F2F2]">
                    <div class="mb-4">
                        <SortAscDesc @sortChange="
                            customerOrder === 0 ? (customerOrder = 1) : (customerOrder = 0);
                        handleSortChange(emits, 'customer', customerOrder);" :order="customerOrder"
                            :title="'Customer'" />
                    </div>
                    <DashboardSearch v-model="customer" placeholder="Search name, email, country" size="sm"
                        class="w-full" />
                </div>
                <div class="relative px-2 py-4 bg-[#F2F2F2]">
                    <div class="mb-4">
                        <SortAscDesc @sortChange="
                            paymentOrder === 0 ? (paymentOrder = 1) : (paymentOrder = 0);
                        handleSortChange(emits, 'payment', paymentOrder);" :order="paymentOrder" :title="'Payment'" />
                    </div>
                    <CustomSelect :selectedItem="payment" :optionsVisible="showPaymentOptions"
                        @handleShow="handleShowPaymentOptions" />
                </div>
                <div class="relative px-2 py-4 bg-[#F2F2F2]">
                    <div class="mb-4">
                        <SortAscDesc @sortChange="
                            fulfillmentOrder === 0 ? (fulfillmentOrder = 1) : (fulfillmentOrder = 0);
                        handleSortChange(emits, 'fulfillment', fulfillmentOrder);" :order="fulfillmentOrder"
                            :title="'Fulfillment'" />
                    </div>
                    <CustomSelect :selectedItem="fulfillment" :optionsVisible="showFulfillmentOptions"
                        @handleShow="handleShowFulfillmentOptions" />
                </div>
                <div class="relative px-2 py-4 bg-[#F2F2F2]">
                    <div class="mb-4">
                        <SortAscDesc @sortChange="
                            totalOrder === 0 ? (totalOrder = 1) : (totalOrder = 0);
                        handleSortChange(emits, 'total', totalOrder);" :order="totalOrder" :title="'Total'" />
                    </div>
                    <FilterButton :rangeValue="totalValue" :rangeVisible="showTotalRange"
                        :textGrayCondition="!total[0] && !total[1]" :trackingWidestCondition="total[0] || total[1]"
                        @showSpentRange="handleShowTotalRange" customClasses="justify-between w-full" />
                </div>
                <div class="p-4 w-full rounded-r-lg bg-[#F2F2F2] self-stretch">
                    <div class="relative">
                        <div class="flex items-center justify-end mb-4">
                            <span class="text-sm leading-[1.43] font-medium"> Actions </span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="items.length === 0 || error"
                class="flex flex-col items-center justify-center flex-1 my-20 lg:my-[200px] xl:my-[320px]">
                <EmojiSadIcon class="w-[52px] h-[52px] mb-4" />
                <div class="text-sm font-medium leading-[1.43] text-gray-100">No data available</div>
            </div>
            <template v-else>
                <DashboardOrdersListItem v-for="(item, index) in items" :key="index" :item="item" :index="index"
                    :is-scrolling="isScrolling" :loading="loading" />
            </template>
        </div>
    </div>
    <Teleport to="body">
        <Transition name="fade-bottom">
            <CustomSelectDropdown v-if="showTypeOptions" v-click-outside="() => (showTypeOptions = false)"
                :items="typeOptionsList" :selectedItem="type" @handleSelection="(event: MouseEvent, item) => {
                    type = item.label;
                    showTypeOptions = false;
                }" :dropdownTop="typeDropdownTop" :dropdownLeft="typeDropdownLeft" :customClasses="'w-[160px]'" />
        </Transition>
        <Transition name="fade-bottom">
            <div v-if="showDateRange" v-click-outside="() => (showDateRange = false)"
                class="absolute z-10 -translate-x-full rounded-lg overflow-hidden shadow-m" :style="{
                    left: dateDropdownLeft + 'px',
                    top: dateDropdownTop + 'px',
                }">
                <DatePicker v-model.range="date" borderless />
            </div>
        </Transition>
        <Transition name="fade-bottom">
            <CustomSelectDropdown v-if="showPaymentOptions" v-click-outside="() => (showPaymentOptions = false)"
                :items="paymentOptionsList" :selectedItem="payment" @handleSelection="(event: MouseEvent, item) => {
                    payment = item.label;
                    showPaymentOptions = false;
                }" :dropdownTop="paymentDropdownTop" :dropdownLeft="paymentDropdownLeft"
                :customClasses="'w-[160px]'" />
        </Transition>
        <Transition name="fade-bottom">
            <CustomSelectDropdown v-if="showFulfillmentOptions" v-click-outside="() => (showFulfillmentOptions = false)"
                :items="fulfillmentOptionsList" :selectedItem="fulfillment" @handleSelection="(event: MouseEvent, item) => {
                    fulfillment = item.label;
                    showFulfillmentOptions = false;
                }" :dropdownTop="fulfillmentDropdownTop" :dropdownLeft="fulfillmentDropdownLeft"
                :customClasses="'w-[224px]'" />
        </Transition>
        <Transition name="fade-bottom">
            <RangeFilter v-if="showTotalRange" v-click-outside="() => (showTotalRange = false)" :title="'Total'"
                :range="total" :dropdownTop="totalRangeDropdownTop" :dropdownLeft="totalRangeDropdownLeft"
                @cancel="showTotalRange = false" @apply="(buffer) => {
                    showTotalRange = false
                    total = buffer;
                }" />
        </Transition>
        <Transition name="fade">
            <RangeFilterMobile v-if="showTotalRange" :title="'Total'"
                :range="total" @cancel="showTotalRange = false" @apply="(buffer) => {
                    showTotalRange = false
                    total = buffer;
                }" />
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { DashboardOrderItem } from '~~/types';
import EmojiSadIcon from '@/assets/icons/dashboard/emoji-sad.svg';
import { DatePicker } from 'v-calendar';
import { FilterInterface } from '~/model/dashboard/table/filters';
import { handleFilterChange, handleSortChange } from '~/services/dashboard/filter.service';
import SortAscDesc from '~/components/shared/tables/micro/SortAscDesc.vue';
import CustomSelect from '~/components/shared/tables/micro/CustomSelect.vue';
import CustomSelectDropdown from '~/components/shared/tables/micro/CustomSelectDropdown.vue';
import DatePickerButton from '~/components/shared/tables/micro/DatePickerButton.vue';
import FilterButton from '~/components/shared/tables/micro/FilterButton.vue';
import RangeFilter from '~/components/shared/tables/micro/RangeFilter.vue';
import RangeFilterMobile from '~/components/shared/tables/micro/RangeFilterMobile.vue';

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
const showTypeOptions = ref(false);
const typeDropdownLeft = ref(0);
const typeDropdownTop = ref(0);
const handleShowTypeOptions = (event: MouseEvent) => {
    showTypeOptions.value = !showTypeOptions.value;
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    typeDropdownLeft.value = rect.right;
    typeDropdownTop.value = rect.bottom + window.scrollY + 8;
};
const typeOptionsList = [
    {
        label: 'Stock Order',
        value: 'Stock Order',
    },
    {
        label: 'Back order',
        value: 'Back order',
    },
    {
        label: 'Mixed Order',
        value: 'Mixed Order',
    },]

const dateOrder = ref(0);
const showDateRange = ref(false);
const dateDropdownLeft = ref(0);
const dateDropdownTop = ref(0);
const handleShowDate = (event: MouseEvent) => {
    showDateRange.value = !showDateRange.value;
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    dateDropdownTop.value = rect.bottom + window.scrollY + 8;
    dateDropdownLeft.value = rect.right;
};

const customerOrder = ref(0);
const customer = ref('');

const paymentOrder = ref(0);
const payment = ref('');
const showPaymentOptions = ref(false);
const paymentDropdownLeft = ref(0);
const paymentDropdownTop = ref(0);
const handleShowPaymentOptions = (event: MouseEvent) => {
    showPaymentOptions.value = !showPaymentOptions.value;
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    paymentDropdownLeft.value = rect.right;
    paymentDropdownTop.value = rect.bottom + window.scrollY + 8;
};
const paymentOptionsList = [
    {
        label: 'Paid',
        value: 'Paid',
    },
    {
        label: 'Pending',
        value: 'Pending',
    },
    {
        label: 'Canceled',
        value: 'Canceled',
    },
    {
        label: 'Declined',
        value: 'Declined',
    },]

const fulfillment = ref('');
const fulfillmentOptions = [
    'Processing',
    'Verification Required',
    'Abandoned Checkout',
    'Delivered',
    'Shipped',
    'Partially Shipped',
    'Refunded',
    'Partially Refunded',
    'Disputed',
    'On Dispute',
    'Canceled',
    'Completed',
    'Pending',
    'Awaiting Payment',
    'Awaiting Fulfillment',
    'Awaiting Shipment',
    'Awaiting Pickup',
    'Payment Received',
    'Payment Declined',
];
const fulfillmentOptionsList = fulfillmentOptions.map((option) => ({
    label: option,
    value: option,
}));
const fulfillmentOrder = ref(0);
const showFulfillmentOptions = ref(false);
const fulfillmentDropdownLeft = ref(0);
const fulfillmentDropdownTop = ref(0);
const handleShowFulfillmentOptions = (event: MouseEvent) => {
    showFulfillmentOptions.value = !showFulfillmentOptions.value;
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    fulfillmentDropdownLeft.value = rect.right;
    fulfillmentDropdownTop.value = rect.bottom + window.scrollY + 8;
};

const totalBuffer = ref([0, 0]);
const total = ref([0, 0]);
const totalOrder = ref(0);
const showTotalRange = ref(false);
const totalRangeDropdownLeft = ref(0);
const totalRangeDropdownTop = ref(0);
const handleShowTotalRange = (event: MouseEvent) => {
    showTotalRange.value = !showTotalRange.value;
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    totalRangeDropdownTop.value = rect.bottom + window.scrollY + 8;
    totalRangeDropdownLeft.value = rect.right;
};

const totalValue = computed(() => {
    const totalValue = total.value
        ?.map((value) => {
            if (value >= 1000) {
                return `${Math.round(value / 1000)}K`;
            }
            return Math.round(value);
        })
        .join(' - ');

    return total.value[0] || total.value[1] ? totalValue : 'Filter';
});

const isScrolling = ref(false);
const scrollTimeout = ref();

const handleScroll = () => {
    showTypeOptions.value = false;
    showDateRange.value = false;
    showFulfillmentOptions.value = false;
    showTotalRange.value = false;
    showPaymentOptions.value = false;
    isScrolling.value = true;
    clearTimeout(scrollTimeout.value);
    scrollTimeout.value = setTimeout(() => {
        isScrolling.value = false;
    }, 66);
};
</script>
