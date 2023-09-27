<template>
    <div class="mb-6 min-h-[350px] md:mb-8">
        <div class="dashboardTable grid grid-cols-1 gap-1 rounded-t-lg overflow-x-auto scrollbar-thin"
            @scroll="handleScroll">
            <div class="grid grid-cols-[212px,212px,256px,256px,232px,224px] items-center rounded-t-lg">
                <div class="p-4 bg-[#F2F2F2] rounded-l-lg flex flex-col gap-4">
                    <SortAscDesc @sortChange="
                        idOrder === 0 ? (idOrder = 1) : (idOrder = 0);
                    handleSortChange(emits, 'id', idOrder);" :order="idOrder" :title="'Order #ID'" />
                    <DashboardSearch v-model="id" placeholder="Search #ID" size="sm" class="w-full"
                        @input="handleFilterChange(activeFilters, emits, 'id', $event)" />
                </div>
                <div class="relative p-4 bg-[#F2F2F2] flex flex-col gap-4">
                    <SortAscDesc @sortChange="
                        typeOrder === 0 ? (typeOrder = 1) : (typeOrder = 0);
                    handleSortChange(emits, 'type', typeOrder);" :order="typeOrder" :title="'Order Type'" />
                    <CustomSelect :selectedItem="type" :optionsVisible="showTypeOptions"
                        @handleShow="handleShowTypeOptions" />
                </div>
                <div class="relative p-4 bg-[#F2F2F2] flex flex-col gap-4">
                    <SortAscDesc @sortChange="
                        dateOrder === 0 ? (dateOrder = 1) : (dateOrder = 0);
                    handleSortChange(emits, 'date', dateOrder);" :order="dateOrder" :title="'Order Date'" />
                    <DatePickerButton :range="date" :datePickerVisible="showDateRange" @showDatePicker="handleShowDate" />
                </div>
                <div class="relative p-4 bg-[#F2F2F2] flex flex-col gap-4">
                    <SortAscDesc @sortChange="
                        statusOrder === 0 ? (statusOrder = 1) : (statusOrder = 0);
                    handleSortChange(emits, 'status', statusOrder);" :order="statusOrder" :title="'Order Status'" />
                    <CustomSelect :selectedItem="status" :optionsVisible="showStatusOptions"
                        @handleShow="handleShowStatusOptions" />
                </div>
                <div class="relative p-4 bg-[#F2F2F2] flex flex-col gap-4">
                    <SortAscDesc @sortChange="
                        totalOrder === 0 ? (totalOrder = 1) : (totalOrder = 0);
                    handleSortChange(emits, 'total', totalOrder);" :order="totalOrder" :title="'Total'" />
                    <FilterButton :rangeValue="totalValue" :rangeVisible="showTotalRange"
                        :textGrayCondition="!total[0] && !total[1]" :trackingWidestCondition="total[0] || total[1]"
                        @showSpentRange="handleShowTotalRange" customClasses="justify-center gap-2 w-[120px]" />
                </div>
                <div class="p-4 pr-[50px] w-full rounded-r-lg bg-[#F2F2F2] self-stretch">
                    <div class="relative">
                        <div class="flex items-center justify-end mb-4">
                            <span class="text-sm leading-[1.43] font-medium"> Actions </span>
                        </div>
                    </div>
                </div>
            </div>
            <DashboardCustomersOrdersItem v-for="(item, index) in items" :key="index" :item="item" :index="index"
                :is-scrolling="isScrolling" :loading="loading" />
        </div>
    </div>
    <Teleport to="body">
        <Transition name="fade-bottom">
            <CustomSelectDropdown v-if="showTypeOptions" v-click-outside="() => (showTypeOptions = false)"
                :items="typeOptions" :dropdownTop="typeDropdownTop" :dropdownLeft="typeDropdownLeft" :selectedItem="type"
                @handleSelection="(event: MouseEvent, item) => {
                    type = item.label;
                    showTypeOptions = false;
                }" :customClasses="'w-[180px]'" />
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
            <CustomSelectDropdown v-if="showStatusOptions" v-click-outside="() => (showStatusOptions = false)"
                :items="statusOptionsList" :dropdownTop="statusDropdownTop" :dropdownLeft="statusDropdownLeft"
                :selectedItem="status" @handleSelection="(event: MouseEvent, item) => {
                    status = item.label;
                    showStatusOptions = false;
                }" :customClasses="'w-[224px]'" />
        </Transition>
        <Transition name="fade-bottom">
            <RangeFilter v-if="showTotalRange" v-click-outside="() => (showTotalRange = false)" :title="'Total'"
                :range="total" :dropdownTop="totalRangeDropdownTop" :dropdownLeft="totalRangeDropdownLeft" @apply="(buffer) => {
                    total = buffer;
                    showTotalRange = false;
                }" @cancel="() => showTotalRange = false" />
        </Transition>
        <Transition name="fade">
            <RangeFilterMobile v-if="showTotalRange" :title="'Total'"
                :range="total" @apply="(buffer) => {
                    total = buffer;
                    showTotalRange = false;
                }" @cancel="() => showTotalRange = false" />
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { DashboardCustomerOrderItem } from '~~/types';
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

const typeOptions = [
    {
        label: 'Stock Order',
    },
    {
        label: 'Backorder',
    },
    {
        label: 'Mixed Order',
    },
];

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
const statusOptionsList = statusOptions.map((option) => {
    return {
        label: option,
    };
});
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
