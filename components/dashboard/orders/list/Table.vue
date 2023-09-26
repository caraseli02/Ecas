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
                    <button
                        class="flex items-center justify-between relative w-full border rounded-lg px-3 py-[7px] bg-white transition-colors duration-300"
                        :class="[!date.start && !date.end ? 'text-gray-100' : '', showDateRange ? 'border-blue' : 'border-border']"
                        @click="handleShowDate">
                        <span class="text-sm tracking-[-0.02em] flex-shrink-0 mr-1">
                            {{
                                date.start && date.end
                                ? `${formattedDate(date.start)} - ${formattedDate(date.end)}`
                                : '23/9/2023 - 23/9/2023'
                            }}
                        </span>
                        <CalendarIcon class="w-5 h-5 text-gray-300 flex-shrink-0" />
                    </button>
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
                    <button
                        class="flex items-center justify-between relative w-full border rounded-lg px-4 py-[7px] bg-white transition-colors duration-300"
                        :class="[!total[0] && !total[1] ? 'text-gray-100' : '', showTotalRange ? 'border-blue' : 'border-border']"
                        @click="handleShowTotalRange">
                        <span class="text-sm truncate flex-shrink-0 mr-2"
                            :class="[total[0] || total[1] ? '-tracking-widest' : '']">
                            {{ totalValue }}
                        </span>
                        <FilterIcon class="w-5 h-5 text-gray-300 flex-shrink-0" />
                    </button>
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
                }" :dropdownTop="paymentDropdownTop" :dropdownLeft="paymentDropdownLeft" :customClasses="'w-[160px]'" />
        </Transition>
        <Transition name="fade-bottom">
            <CustomSelectDropdown v-if="showFulfillmentOptions" v-click-outside="() => (showFulfillmentOptions = false)"
                :items="fulfillmentOptionsList" :selectedItem="fulfillment" @handleSelection="(event: MouseEvent, item) => {
                    fulfillment = item.label;
                    showFulfillmentOptions = false;
                }" :dropdownTop="fulfillmentDropdownTop" :dropdownLeft="fulfillmentDropdownLeft" :customClasses="'w-[224px]'" />
        </Transition>
        <Transition name="fade-bottom">
            <div v-if="showTotalRange" v-click-outside="() => (showTotalRange = false)"
                class="absolute z-10 -translate-x-full grid grid-cols-1 gap-1 rounded-lg bg-white p-6 w-[358px] shadow-m max-md:hidden"
                :style="{
                    left: totalRangeDropdownLeft + 'px',
                    top: totalRangeDropdownTop + 'px',
                }">
                <div class="text-sm leading-[1.71] font-semibold mb-8">Total range</div>
                <div class="mb-16">
                    <div class="flex items-end gap-3 mb-6">
                        <label>
                            <div class="text-sm leading-[1.43] text-gray-300 mb-4">From</div>
                            <div class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]">
                                <span class="font-medium mr-1">$</span>
                                <input v-model.number="totalBuffer[0]" type="number"
                                    class="bg-transparent py-2 w-full focus:outline-none" />
                            </div>
                        </label>
                        <div class="text-sm leading-[1.43] mb-3">-</div>
                        <label>
                            <div class="text-sm leading-[1.43] text-gray-300 mb-4">To</div>
                            <div class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]">
                                <span class="font-medium mr-1">$</span>
                                <input v-model.number="totalBuffer[1]" type="number"
                                    class="bg-transparent py-2 w-full focus:outline-none" />
                            </div>
                        </label>
                    </div>
                    <div class="flex items-center justify-between mb-3">
                        <div class="text-sm leading-[1.43] font-medium">${{ totalBuffer[0] }}</div>
                        <div class="text-sm leading-[1.43] font-medium">${{ totalBuffer[1] }}</div>
                    </div>
                    <Slider v-model="totalBuffer" :min="0" :max="100000" :step="10" :tooltips="false" class="rangeSlider"
                        @slide="totalBuffer = $event" />
                </div>
                <div class="grid grid-cols-[auto,1fr] gap-4">
                    <button
                        class="flex px-8 py-2 rounded-lg text-sm bg-gray-200 leading-[1.67] h-10 text-gray-300 font-medium"
                        @click="showTotalRange = false">
                        Cancel
                    </button>
                    <button
                        class="flex justify-center px-8 py-2 text-sm w-full rounded-lg bg-blue leading-[1.67] h-10 text-white font-medium"
                        @click="
                            total = totalBuffer;
                        showTotalRange = false;
                        ">
                        Apply Filter
                    </button>
                </div>
            </div>
        </Transition>
        <Transition name="fade">
            <div v-if="showTotalRange"
                class="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center md:hidden">
                <div class="relative z-10 w-[358px] max-w-[calc(100vw-32px)] p-6 bg-white rounded-xl shadow-xs">
                    <div class="grid grid-cols-1 gap-1">
                        <div class="flex items-center justify-between mb-8">
                            <div class="text-sm leading-[1.71] font-semibold">Total range</div>
                            <button class="w-8 h-8 bg-gray-200 flex items-center justify-center text-gray-300 rounded-lg"
                                @click="showTotalRange = false">
                                <XIcon class="w-6 h-6" />
                            </button>
                        </div>
                        <div class="mb-16">
                            <div class="flex items-end gap-3 mb-6">
                                <label>
                                    <div class="text-sm leading-[1.43] text-gray-300 mb-4">From</div>
                                    <div
                                        class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]">
                                        <span class="font-medium mr-1">$</span>
                                        <input v-model.number="totalBuffer[0]" type="number"
                                            class="bg-transparent py-2 w-full focus:outline-none" />
                                    </div>
                                </label>
                                <div class="text-sm leading-[1.43] mb-3">-</div>
                                <label>
                                    <div class="text-sm leading-[1.43] text-gray-300 mb-4">To</div>
                                    <div
                                        class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]">
                                        <span class="font-medium mr-1">$</span>
                                        <input v-model.number="totalBuffer[1]" type="number"
                                            class="bg-transparent py-2 w-full focus:outline-none" />
                                    </div>
                                </label>
                            </div>
                            <div class="flex items-center justify-between mb-3">
                                <div class="text-sm leading-[1.43] font-medium">${{ totalBuffer[0] }}</div>
                                <div class="text-sm leading-[1.43] font-medium">${{ totalBuffer[1] }}</div>
                            </div>
                            <Slider v-model="totalBuffer" :min="0" :max="100000" :step="10" :tooltips="false"
                                class="rangeSlider" @slide="totalBuffer = $event" />
                        </div>
                        <div class="grid grid-cols-[auto,1fr] gap-4">
                            <button
                                class="flex px-8 py-2 rounded-lg text-sm bg-gray-200 leading-[1.67] h-10 text-gray-300 font-medium"
                                @click="showTotalRange = false">
                                Cancel
                            </button>
                            <button
                                class="flex justify-center px-8 py-2 text-sm w-full rounded-lg bg-blue leading-[1.67] h-10 text-white font-medium"
                                @click="
                                    total = totalBuffer;
                                showTotalRange = false;
                                ">
                                Apply Filter
                            </button>
                        </div>
                    </div>
                </div>
                <div class="absolute top-0 left-0 w-full h-full bg-[#2F3241]/10 backdrop-blur-[7.5px] cursor-pointer"
                    @click="showTotalRange = false" />
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import Slider from '@vueform/slider';
import CalendarIcon from '@/assets/icons/dashboard/calendar.svg';
import FilterIcon from '@/assets/icons/dashboard/filter-2.svg';
import { DashboardOrderItem } from '~~/types';
import XIcon from '@/assets/icons/dashboard/x.svg';
import EmojiSadIcon from '@/assets/icons/dashboard/emoji-sad.svg';
import { DatePicker } from 'v-calendar';
import { FilterInterface } from '~/model/dashboard/table/filters';
import { handleFilterChange, handleSortChange } from '~/services/dashboard/filter.service';
import SortAscDesc from '~/components/shared/tables/micro/SortAscDesc.vue';
import CustomSelect from '~/components/shared/tables/micro/CustomSelect.vue';
import CustomSelectDropdown from '~/components/shared/tables/micro/CustomSelectDropdown.vue';

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

const formattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB');
};

const isScrolling = ref(false);
const scrollTimeout = ref();

const handleScroll = () => {
    showTypeOptions.value = false;
    showDateRange.value = false;
    showFulfillmentOptions.value = false;
    showTotalRange.value = false;
    isScrolling.value = true;
    clearTimeout(scrollTimeout.value);
    scrollTimeout.value = setTimeout(() => {
        isScrolling.value = false;
    }, 66);
};
</script>
