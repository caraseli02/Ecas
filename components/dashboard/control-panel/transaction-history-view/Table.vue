<template>
    <div class="mb-6 min-h-[350px] md:mb-8">
        <div class="dashboardTable grid grid-cols-1 gap-1 rounded-t-lg overflow-x-auto scrollbar-thin">
            <div class="grid grid-cols-[50px,191px,191px,191px,191px,191px,191px,minmax(197px,1fr)] items-center rounded-t-lg">
                <div class="flex justify-center items-center py-4 bg-[#F2F2F2] rounded-l-lg">
                    <span class="text-sm font-medium leading-[1.43]"> CH </span>
                </div>
                <div class="px-2 py-4 bg-[#F2F2F2]">
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
                <div class="px-2 py-4 bg-[#F2F2F2]">
                    <button
                        class="relative flex items-center h-5"
                        @click="
                            invoiceIdOrder === 0 ? (invoiceIdOrder = 1) : (invoiceIdOrder = 0);
                            handleSortChange(emits, 'invoiceId', invoiceIdOrder);
                        "
                    >
                        <span class="text-sm leading-[1.43] font-medium mr-1"> Invoice #ID </span>
                        <SortDownIcon v-if="invoiceIdOrder === 0" class="w-5 h-5 rounded-full" />
                        <SortUpIcon v-else class="w-5 h-5 rounded-full" />
                    </button>
                </div>
                <div class="px-2 py-4 bg-[#F2F2F2]">
                    <button
                        class="relative flex items-center h-5"
                        @click="
                            amountOrder === 0 ? (amountOrder = 1) : (amountOrder = 0);
                            handleSortChange(emits, 'amount', amountOrder);
                        "
                    >
                        <span class="text-sm leading-[1.43] font-medium mr-1"> Amount </span>
                        <SortDownIcon v-if="amountOrder === 0" class="w-5 h-5 rounded-full" />
                        <SortUpIcon v-else class="w-5 h-5 rounded-full" />
                    </button>
                </div>
                <div class="px-2 py-4 bg-[#F2F2F2]">
                    <button
                        class="relative flex items-center h-5"
                        @click="
                            typeOrder === 0 ? (typeOrder = 1) : (typeOrder = 0);
                            handleSortChange(emits, 'type', typeOrder);
                        "
                    >
                        <span class="text-sm leading-[1.43] font-medium mr-1"> Type </span>
                        <SortDownIcon v-if="typeOrder === 0" class="w-5 h-5 rounded-full" />
                        <SortUpIcon v-else class="w-5 h-5 rounded-full" />
                    </button>
                </div>
                <div class="px-2 py-4 bg-[#F2F2F2]">
                    <button
                        class="relative flex items-center h-5"
                        @click="
                            dateOrder === 0 ? (dateOrder = 1) : (dateOrder = 0);
                            handleSortChange(emits, 'date', dateOrder);
                        "
                    >
                        <span class="text-sm leading-[1.43] font-medium mr-1"> Date </span>
                        <SortDownIcon v-if="dateOrder === 0" class="w-5 h-5 rounded-full" />
                        <SortUpIcon v-else class="w-5 h-5 rounded-full" />
                    </button>
                </div>
                <div class="px-2 py-4 bg-[#F2F2F2]">
                    <button
                        class="relative flex items-center h-5"
                        @click="
                            statusOrder === 0 ? (statusOrder = 1) : (statusOrder = 0);
                            handleSortChange(emits, 'status', statusOrder);
                        "
                    >
                        <span class="text-sm leading-[1.43] font-medium mr-1"> Status </span>
                        <SortDownIcon v-if="statusOrder === 0" class="w-5 h-5 rounded-full" />
                        <SortUpIcon v-else class="w-5 h-5 rounded-full" />
                    </button>
                </div>
                <div class="flex justify-center px-2 py-4 bg-[#F2F2F2]">
                    <span class="text-sm font-medium leading-[1.43]">Actions</span>
                </div>
            </div>
            <DashboardControlPanelTransactionHistoryViewItem
                v-for="(item, index) in items"
                :key="index"
                :item="item"
                :index="index"
                :loading="loading"
            />
        </div>
    </div>
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

const idOrder: number = ref(0);
const invoiceIdOrder: number = ref(0);
const amountOrder: number = ref(0);
const typeOrder: number = ref(0);
const dateOrder: number = ref(0);
const statusOrder: number = ref(0);

const formattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB');
};
</script>
import { DashboardControlPanelTransactionHistoryViewTable } from '~/.nuxt/components';
