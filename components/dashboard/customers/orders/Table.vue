<template>
    <div class="mb-6 min-h-[350px] md:mb-8">
        <div class="dashboardTable grid grid-cols-1 gap-1 rounded-t-lg overflow-x-auto scrollbar-thin" @scroll="handleScroll">
            <div class="grid grid-cols-[212px,212px,256px,256px,232px,224px] items-center rounded-t-lg">
                <div class="p-4 bg-[#F2F2F2] rounded-l-lg h-[104px]">
                    <div class="mb-4">
                        <button
                            class="relative flex items-center h-5"
                            @click="
                                idOrder === 0 ? (idOrder = 1) : (idOrder = 0);
                                handleSortChange(emits, 'id', idOrder);
                            "
                        >
                            <span class="text-sm leading-[1.43] font-medium mr-1"> Order #ID </span>
                            <SortDownIcon v-if="idOrder === 0" class="w-5 h-5 rounded-full" />
                            <SortUpIcon v-else class="w-5 h-5 rounded-full" />
                        </button>
                    </div>
                    <DashboardSearch
                        v-model="id"
                        placeholder="Search #ID"
                        size="sm"
                        class="w-full"
                        @input="handleFilterChange(activeFilters, emits, 'id', $event)"
                    />
                </div>
                <div class="relative p-4 bg-[#F2F2F2]">
                    <div class="mb-4">
                        <button
                            class="relative flex items-center h-5"
                            @click="
                                typeOrder === 0 ? (typeOrder = 1) : (typeOrder = 0);
                                handleSortChange(emits, 'type', typeOrder);
                            "
                        >
                            <span class="text-sm leading-[1.43] font-medium mr-1"> Order Type </span>
                            <SortDownIcon v-if="typeOrder === 0" class="w-5 h-5 rounded-full" />
                            <SortUpIcon v-else class="w-5 h-5 rounded-full" />
                        </button>
                    </div>
                    <button
                        class="flex items-center justify-between relative w-full border rounded-lg px-3 py-[7px] bg-white transition-colors duration-300"
                        :class="[!type ? 'text-gray-100' : '', showTypeOptions ? 'border-blue' : 'border-border']"
                        @click="handleShowTypeOptions"
                    >
                        <span class="text-sm flex-shrink-0 mr-1">
                            {{ type || 'Stock Order' }}
                        </span>
                        <ChevronDownIcon
                            class="w-5 h-5 text-gray-300 flex-shrink-0 rounded-full"
                            :class="[showTypeOptions ? 'rotate-180' : '']"
                        />
                    </button>
                </div>
                <div class="relative p-4 bg-[#F2F2F2]">
                    <div class="mb-4">
                        <button
                            class="relative flex items-center h-5"
                            @click="
                                dateOrder === 0 ? (dateOrder = 1) : (dateOrder = 0);
                                handleSortChange(emits, 'date', dateOrder);
                            "
                        >
                            <span class="text-sm leading-[1.43] font-medium mr-1"> Order Date </span>
                            <SortDownIcon v-if="dateOrder === 0" class="w-5 h-5 rounded-full" />
                            <SortUpIcon v-else class="w-5 h-5 rounded-full" />
                        </button>
                    </div>
                    <button
                        class="flex items-center justify-between relative w-full border rounded-lg px-3 py-[7px] bg-white transition-colors duration-300"
                        :class="[!date.start && !date.end ? 'text-gray-100' : '', showDateRange ? 'border-blue' : 'border-border']"
                        @click="handleShowDate"
                    >
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
                <div class="relative p-4 bg-[#F2F2F2]">
                    <div class="mb-4">
                        <button
                            class="relative flex items-center h-5"
                            @click="
                                statusOrder === 0 ? (statusOrder = 1) : (statusOrder = 0);
                                handleSortChange(emits, 'status', statusOrder);
                            "
                        >
                            <span class="text-sm leading-[1.43] font-medium mr-1"> Order Status </span>
                            <SortDownIcon v-if="statusOrder === 0" class="w-5 h-5 rounded-full" />
                            <SortUpIcon v-else class="w-5 h-5 rounded-full" />
                        </button>
                    </div>
                    <button
                        class="flex items-center justify-between relative w-full border rounded-lg px-3 py-[7px] bg-white transition-colors duration-300"
                        :class="[!status ? 'text-gray-100' : '', showStatusOptions ? 'border-blue' : 'border-border']"
                        @click="handleShowStatusOptions"
                    >
                        <span class="text-sm flex-shrink-0 mr-1">
                            {{ status || 'Select' }}
                        </span>
                        <ChevronDownIcon
                            class="w-5 h-5 text-gray-300 flex-shrink-0 rounded-full"
                            :class="[showStatusOptions ? 'rotate-180' : '']"
                        />
                    </button>
                </div>
                <div class="relative p-4 bg-[#F2F2F2]">
                    <div class="mb-4">
                        <button
                            class="relative flex items-center h-5"
                            @click="
                                totalOrder === 0 ? (totalOrder = 1) : (totalOrder = 0);
                                handleSortChange(emits, 'total', totalOrder);
                            "
                        >
                            <span class="text-sm leading-[1.43] font-medium mr-1"> Total </span>
                            <SortDownIcon v-if="totalOrder === 0" class="w-5 h-5 rounded-full" />
                            <SortUpIcon v-else class="w-5 h-5 rounded-full" />
                        </button>
                    </div>
                    <button
                        class="flex items-center justify-center relative w-full border rounded-lg px-2.5 py-[7px] bg-white transition-colors duration-300"
                        :class="[!total[0] && !total[1] ? 'text-gray-100' : '', showTotalRange ? 'border-blue' : 'border-border']"
                        @click="handleShowTotalRange"
                    >
                        <span class="text-sm truncate flex-shrink-0 mr-2" :class="[total[0] || total[1] ? '-tracking-widest' : '']">
                            {{ totalValue }}
                        </span>
                        <FilterIcon class="w-5 h-5 text-gray-300 flex-shrink-0" />
                    </button>
                </div>
                <div class="p-4 pr-[50px] w-full rounded-r-lg bg-[#F2F2F2] self-stretch">
                    <div class="relative">
                        <div class="flex items-center justify-end mb-4">
                            <span class="text-sm leading-[1.43] font-medium"> Actions </span>
                        </div>
                    </div>
                </div>
            </div>
            <DashboardCustomersOrdersItem
                v-for="(item, index) in items"
                :key="index"
                :item="item"
                :index="index"
                :is-scrolling="isScrolling"
                :loading="loading"
            />
        </div>
    </div>
    <Teleport to="body">
        <Transition name="fade-bottom">
            <div
                v-if="showTypeOptions"
                v-click-outside="() => (showTypeOptions = false)"
                class="absolute z-10 -translate-x-full grid grid-cols-1 gap-1 rounded-lg bg-white p-3 w-[180px] shadow-m"
                :style="{
                    top: typeDropdownTop + 'px',
                    left: typeDropdownLeft + 'px',
                }"
            >
                <button
                    class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                    :class="[type === 'Stock Order' ? 'text-blue bg-[#F2F2F2]' : '']"
                    @click="
                        type = 'Stock Order';
                        showTypeOptions = false;
                    "
                >
                    <span class="text-sm leading-[1.71]">Stock Order</span>
                </button>
                <button
                    class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                    :class="[type === 'Backorder' ? 'text-blue bg-[#F2F2F2]' : '']"
                    @click="
                        type = 'Backorder';
                        showTypeOptions = false;
                    "
                >
                    <span class="text-sm leading-[1.71]">Backorder</span>
                </button>
                <button
                    class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                    :class="[type === 'Mixed Order' ? 'text-blue bg-[#F2F2F2]' : '']"
                    @click="
                        type = 'Mixed Order';
                        showTypeOptions = false;
                    "
                >
                    <span class="text-sm leading-[1.71]">Mixed Order</span>
                </button>
                <button
                    class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                    @click="
                        type = '';
                        showTypeOptions = false;
                    "
                >
                    <span class="text-sm leading-[1.71]">All Orders</span>
                </button>
            </div>
        </Transition>
        <Transition name="fade-bottom">
            <div
                v-if="showDateRange"
                v-click-outside="() => (showDateRange = false)"
                class="absolute z-10 -translate-x-full rounded-lg overflow-hidden shadow-m"
                :style="{
                    left: dateDropdownLeft + 'px',
                    top: dateDropdownTop + 'px',
                }"
            >
                <DatePicker v-model.range="date" borderless />
            </div>
        </Transition>
        <Transition name="fade-bottom">
            <div
                v-if="showStatusOptions"
                v-click-outside="() => (showStatusOptions = false)"
                class="absolute z-10 -translate-x-full grid grid-cols-1 gap-1 rounded-lg bg-white py-3 pr-1 w-[224px] shadow-m"
                :style="{
                    top: statusDropdownTop + 'px',
                    left: statusDropdownLeft + 'px',
                }"
            >
                <div class="grid grid-cols-1 gap-1 max-h-[304px] overflow-y-auto scrollbar-thin pl-3 pr-2">
                    <button
                        v-for="(option, index) in statusOptions"
                        :key="index"
                        class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                        :class="[status === option ? 'text-blue bg-[#F2F2F2]' : '']"
                        @click="
                            status = option;
                            showStatusOptions = false;
                        "
                    >
                        <span class="text-sm leading-[1.71]">{{ option }}</span>
                    </button>
                    <button
                        class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                        @click="
                            status = '';
                            showStatusOptions = false;
                        "
                    >
                        <span class="text-sm leading-[1.71]">All Statuses</span>
                    </button>
                </div>
            </div>
        </Transition>
        <Transition name="fade-bottom">
            <div
                v-if="showTotalRange"
                v-click-outside="() => (showTotalRange = false)"
                class="absolute z-10 -translate-x-full grid grid-cols-1 gap-1 rounded-lg bg-white p-6 w-[358px] shadow-m max-md:hidden"
                :style="{
                    left: totalRangeDropdownLeft + 'px',
                    top: totalRangeDropdownTop + 'px',
                }"
            >
                <div class="text-sm leading-[1.71] font-semibold mb-8">Total range</div>
                <div class="mb-16">
                    <div class="flex items-end gap-3 mb-6">
                        <label>
                            <div class="text-sm leading-[1.43] text-gray-300 mb-4">From</div>
                            <div class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]">
                                <span class="font-medium mr-1">$</span>
                                <input
                                    v-model.number="totalBuffer[0]"
                                    type="number"
                                    class="bg-transparent py-2 w-full focus:outline-none"
                                />
                            </div>
                        </label>
                        <div class="text-sm leading-[1.43] mb-3">-</div>
                        <label>
                            <div class="text-sm leading-[1.43] text-gray-300 mb-4">To</div>
                            <div class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]">
                                <span class="font-medium mr-1">$</span>
                                <input
                                    v-model.number="totalBuffer[1]"
                                    type="number"
                                    class="bg-transparent py-2 w-full focus:outline-none"
                                />
                            </div>
                        </label>
                    </div>
                    <div class="flex items-center justify-between mb-3">
                        <div class="text-sm leading-[1.43] font-medium">${{ totalBuffer[0] }}</div>
                        <div class="text-sm leading-[1.43] font-medium">${{ totalBuffer[1] }}</div>
                    </div>
                    <Slider
                        v-model="totalBuffer"
                        :min="0"
                        :max="100000"
                        :step="10"
                        :tooltips="false"
                        class="rangeSlider"
                        @slide="totalBuffer = $event"
                    />
                </div>
                <div class="grid grid-cols-[auto,1fr] gap-4">
                    <button
                        class="flex px-8 py-2 rounded-lg text-sm bg-gray-200 leading-[1.67] h-10 text-gray-300 font-medium"
                        @click="showTotalRange = false"
                    >
                        Cancel
                    </button>
                    <button
                        class="flex justify-center px-8 py-2 text-sm w-full rounded-lg bg-blue leading-[1.67] h-10 text-white font-medium"
                        @click="
                            total = totalBuffer;
                            showTotalRange = false;
                        "
                    >
                        Apply Filter
                    </button>
                </div>
            </div>
        </Transition>
        <Transition name="fade">
            <div v-if="showTotalRange" class="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center md:hidden">
                <div class="relative z-10 w-[358px] max-w-[calc(100vw-32px)] p-6 bg-white rounded-xl shadow-xs">
                    <div class="grid grid-cols-1 gap-1">
                        <div class="flex items-center justify-between mb-8">
                            <div class="text-sm leading-[1.71] font-semibold">Total range</div>
                            <button
                                class="w-8 h-8 bg-gray-200 flex items-center justify-center text-gray-300 rounded-lg"
                                @click="showTotalRange = false"
                            >
                                <XIcon class="w-6 h-6" />
                            </button>
                        </div>
                        <div class="mb-16">
                            <div class="flex items-end gap-3 mb-6">
                                <label>
                                    <div class="text-sm leading-[1.43] text-gray-300 mb-4">From</div>
                                    <div class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]">
                                        <span class="font-medium mr-1">$</span>
                                        <input
                                            v-model.number="totalBuffer[0]"
                                            type="number"
                                            class="bg-transparent py-2 w-full focus:outline-none"
                                        />
                                    </div>
                                </label>
                                <div class="text-sm leading-[1.43] mb-3">-</div>
                                <label>
                                    <div class="text-sm leading-[1.43] text-gray-300 mb-4">To</div>
                                    <div class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]">
                                        <span class="font-medium mr-1">$</span>
                                        <input
                                            v-model.number="totalBuffer[1]"
                                            type="number"
                                            class="bg-transparent py-2 w-full focus:outline-none"
                                        />
                                    </div>
                                </label>
                            </div>
                            <div class="flex items-center justify-between mb-3">
                                <div class="text-sm leading-[1.43] font-medium">${{ totalBuffer[0] }}</div>
                                <div class="text-sm leading-[1.43] font-medium">${{ totalBuffer[1] }}</div>
                            </div>
                            <Slider
                                v-model="totalBuffer"
                                :min="0"
                                :max="100000"
                                :step="10"
                                :tooltips="false"
                                class="rangeSlider"
                                @slide="totalBuffer = $event"
                            />
                        </div>
                        <div class="grid grid-cols-[auto,1fr] gap-4">
                            <button
                                class="flex px-8 py-2 rounded-lg text-sm bg-gray-200 leading-[1.67] h-10 text-gray-300 font-medium"
                                @click="showTotalRange = false"
                            >
                                Cancel
                            </button>
                            <button
                                class="flex justify-center px-8 py-2 text-sm w-full rounded-lg bg-blue leading-[1.67] h-10 text-white font-medium"
                                @click="
                                    total = totalBuffer;
                                    showTotalRange = false;
                                "
                            >
                                Apply Filter
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    class="absolute top-0 left-0 w-full h-full bg-[#2F3241]/10 backdrop-blur-[7.5px] cursor-pointer"
                    @click="showTotalRange = false"
                />
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import Slider from '@vueform/slider';
import ChevronDownIcon from '@/assets/icons/dashboard/chevron-down.svg';
import CalendarIcon from '@/assets/icons/dashboard/calendar.svg';
import FilterIcon from '@/assets/icons/dashboard/filter-2.svg';
import { DashboardCustomerOrderItem } from '~~/types';
import XIcon from '@/assets/icons/dashboard/x.svg';
import SortUpIcon from '@/assets/icons/dashboard/sort-up.svg';
import SortDownIcon from '@/assets/icons/dashboard/sort-down.svg';
import { DatePicker } from 'v-calendar';
import { FilterInterface } from '~/model/dashboard/table/filters';
import { handleFilterChange, handleSortChange } from '~/services/dashboard/filter.service';

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

const id = ref('');
const idOrder: number = ref(0);
const type = ref('');
const typeOrder: number = ref(0);
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

const dateOrder: number = ref(0);
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

const status = ref('');
const statusOptions = [
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
const statusOrder: number = ref(0);
const showStatusOptions = ref(false);
const statusDropdownLeft = ref(0);
const statusDropdownTop = ref(0);
const handleShowStatusOptions = (event: MouseEvent) => {
    showStatusOptions.value = !showStatusOptions.value;
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    statusDropdownLeft.value = rect.right;
    statusDropdownTop.value = rect.bottom + window.scrollY + 8;
};

const totalBuffer = ref([0, 0]);
const total = ref([0, 0]);
const totalOrder: number = ref(0);
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
    showStatusOptions.value = false;
    showTotalRange.value = false;
    isScrolling.value = true;
    clearTimeout(scrollTimeout.value);
    scrollTimeout.value = setTimeout(() => {
        isScrolling.value = false;
    }, 66);
};
</script>
