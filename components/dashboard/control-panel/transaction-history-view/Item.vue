<template>
    <div class="grid grid-cols-[50px,191px,191px,191px,191px,191px,191px,minmax(196px,1fr)] items-center">
        <div class="flex items-center justify-center p-4">
            <label class="flex cursor-pointer">
                <input :value="item.checked" type="checkbox" class="sr-only" @change="$emit('check')" />
                <div
                    class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
                    :class="[
                        item.checked ? 'bg-blue border-blue group-hover:bg-white' : 'bg-white  border-border group-hover:border-gray-300',
                    ]"
                >
                    <CheckIcon v-if="item.checked" class="w-4 text-white transition-colors duration-300 group-hover:text-blue" />
                </div>
            </label>
        </div>
        <div class="px-2 py-4 text-sm font-medium leading-[1.71] text-blue">#{{ item.id }}</div>
        <div class="px-2 py-4 text-sm font-medium leading-[1.71] text-blue">{{ item.invoiceId }}</div>
        <div class="px-2 py-4 text-sm font-medium leading-[1.71]">{{ item.amount }}</div>
        <div class="flex items-center px-2 py-4 text-sm font-medium leading-[1.71]">
            <div class="w-2 h-2 rounded-full mr-2" :class="item.type === 'debit' ? 'bg-[#00D395]' : 'bg-blue'" />
            <span class="text-sm font-medium leading-[1.43] capitalize" :class="item.type === 'debit' ? 'text-[#00D395]' : 'text-blue'">{{
                item.type
            }}</span>
        </div>
        <div class="px-2 py-4 text-sm leading-[1.71]">21 Sep 2023, 18:25</div>
        <div class="flex items-center px-2 py-4 text-sm font-medium leading-[1.71]">
            <div
                class="w-2 h-2 rounded-full mr-2"
                :class="item.status === 'success' ? 'bg-[#00D395]' : item.status === 'pending' ? 'bg-[#FF8A00]' : 'bg-[#FA4B4B]'"
            />
            <span
                class="text-sm font-medium leading-[1.43] capitalize"
                :class="item.status === 'success' ? 'text-[#00D395]' : item.status === 'pending' ? 'text-[#FF8A00]' : 'text-[#FA4B4B]'"
                >{{ item.status }}</span
            >
        </div>
        <div class="flex items-center justify-end p-4 pr-[26px]">
            <button class="flex text-gray-300 transition-colors duration-300 hover:text-blue">
                <DownloadIcon class="w-5 h-5 mr-2" />
                <span class="text-sm font-medium leading-[1.71]">Download</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { DashboardControlPanelTransactionHistoryItem } from '~/types';
import DownloadIcon from '@/assets/icons/dashboard/download-2.svg';
import CheckIcon from '@/assets/icons/check.svg';

defineProps({
    item: {
        type: Object as PropType<DashboardControlPanelTransactionHistoryItem>,
        required: true,
    },
    index: {
        type: Number,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
});
</script>
