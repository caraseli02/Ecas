<template>
    <div class="mb-6 min-h-[350px] md:mb-8">
        <div class="dashboardTable grid grid-cols-1 gap-1 rounded-t-lg overflow-x-auto scrollbar-thin">
            <div
                class="grid grid-cols-[50px,191px,191px,191px,191px,191px,191px,minmax(196px,1fr)] items-center rounded-t-lg">
                <div class="flex justify-center items-center py-4 bg-[#F2F2F2] rounded-l-lg">
                    <label class="flex cursor-pointer">
                        <input :value="checkAll" type="checkbox" class="sr-only" @change="$emit('checkAll')" />
                        <div class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
                            :class="[
                                checkAll
                                    ? 'bg-blue border-blue group-hover:bg-white'
                                    : 'bg-white  border-border group-hover:border-gray-300',
                            ]">
                            <CheckIcon v-if="checkAll"
                                class="w-4 text-white transition-colors duration-300 group-hover:text-blue" />
                        </div>
                    </label>
                </div>
                <div class="px-2 py-4 bg-[#F2F2F2]">
                    <SortAscDesc @sortChange="
                        idOrder === 0 ? (idOrder = 1) : (idOrder = 0);
                    handleSortChange(emits, 'id', idOrder);" :order="idOrder" :title="'Order #ID'" />
                </div>
                <div class="px-2 py-4 bg-[#F2F2F2]">
                    <SortAscDesc @sortChange="
                        invoiceIdOrder === 0 ? (invoiceIdOrder = 1) : (invoiceIdOrder = 0);
                    handleSortChange(emits, 'invoiceId', invoiceIdOrder);" :order="invoiceIdOrder"
                        :title="'Invoice #ID'" />
                </div>
                <div class="px-2 py-4 bg-[#F2F2F2]">
                    <SortAscDesc @sortChange="
                        amountOrder === 0 ? (amountOrder = 1) : (amountOrder = 0);
                    handleSortChange(emits, 'amount', amountOrder);" :order="amountOrder" :title="'Amount'" />
                </div>
                <div class="px-2 py-4 bg-[#F2F2F2]">
                    <SortAscDesc @sortChange="
                        typeOrder === 0 ? (typeOrder = 1) : (typeOrder = 0);
                    handleSortChange(emits, 'type', typeOrder);" :order="typeOrder" :title="'Type'" />
                </div>
                <div class="px-2 py-4 bg-[#F2F2F2]">
                    <SortAscDesc @sortChange="
                        dateOrder === 0 ? (dateOrder = 1) : (dateOrder = 0);
                    handleSortChange(emits, 'date', dateOrder);" :order="dateOrder" :title="'Date'" />
                </div>
                <div class="px-2 py-4 bg-[#F2F2F2]">
                    <SortAscDesc @sortChange="
                        statusOrder === 0 ? (statusOrder = 1) : (statusOrder = 0);
                    handleSortChange(emits, 'status', statusOrder);" :order="statusOrder" :title="'Status'" />
                </div>
                <div class="flex justify-center px-2 py-4 bg-[#F2F2F2]">
                    <span class="text-sm font-medium leading-[1.43]">Actions</span>
                </div>
            </div>
            <DashboardControlPanelTransactionHistoryViewItem v-for="(item, index) in items" :key="index" :item="item"
                :index="index" :loading="loading" @check="$emit('check', item.id)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { DashboardCustomerOrderItem } from '~~/types';
import { handleSortChange } from '~/services/dashboard/filter.service';
import CheckIcon from '@/assets/icons/check.svg';
import SortAscDesc from '~/components/shared/tables/SortAscDesc.vue';

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

const idOrder = ref(0);
const invoiceIdOrder = ref(0);
const amountOrder = ref(0);
const typeOrder = ref(0);
const dateOrder = ref(0);
const statusOrder = ref(0);
</script>
