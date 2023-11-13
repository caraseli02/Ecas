<template>
    <div class="rounded-md shadow-m p-[15px]">
        <div class="flex items-start justify-between mb-10">
            <div class="relative flex items-start">
                <img :src="item.cover" :alt="item.title" class="w-[65px] h-[65px] mr-2.5" />
                <div>
                    <div class="mb-1.5 md:flex md:items-center md:mb-1">
                        <div class="font-Inter font-semibold leading-tight mb-1.5 md:mb-0 md:mr-2.5">
                            {{ item.title }}
                        </div>
                        <button
                            class="flex border border-border rounded px-2 py-[3px] text-sm font-Inter font-semibold leading-tight text-gray-300"
                        >
                            CUSTOM1234
                        </button>
                    </div>
                    <div class="text-xs leading-tight truncate mb-1">Diode: rectifying; SMD; 100V; 0.15...</div>
                    <div class="md:flex md:items-center">
                        <div class="text-xs leading-tight mb-1.5 md:mb-0 md:mr-2.5">Manufacturer: Microchip</div>
                        <div class="flex items-center text-green">
                            <CheckIcon class="w-4 h-4 mr-1" />
                            <span class="text-xs leading-tight font-semibold font-Inter"> 16,000 in stock </span>
                        </div>
                    </div>
                </div>
                <div
                    v-if="item.discount"
                    class="hidden absolute right-0 top-[3px] translate-x-10 bg-red rounded-[25px] px-1.5 py-0.5 text-xs font-extrabold text-white md:flex"
                >
                    {{ item.discount }}%
                </div>
            </div>
            <div class="flex flex-col gap-2.5 text-gray-300 md:flex-row md:gap-5">
                <button class="flex transition-colors duration-300 hover:text-blue">
                    <D3Icon class="w-6 h-6" />
                </button>
                <button class="flex transition-colors duration-300 hover:text-blue">
                    <TruckIcon class="w-6 h-6" />
                </button>
                <button class="flex transition-colors duration-300 hover:text-blue">
                    <TrashIcon class="w-6 h-6" />
                </button>
            </div>
        </div>
        <div class="flex items-end justify-between">
            <div class="relative flex flex-col gap-[5px] md:flex-row md:items-center md:gap-[30px]">
                <div class="flex items-center text-xs font-Inter">
                    <span class="leading-tight text-gray-300 mr-2">VAT:</span>
                    <span class="font-medium leading-snug md:text-sm">19%</span>
                </div>
                <div class="flex items-center text-xs font-Inter">
                    <span class="leading-tight text-gray-300 mr-2">Unit Price:</span>
                    <span class="flex items-end text-sm font-medium leading-snug md:text-base md:items-center">
                        <span class="" :class="[item.discount ? 'text-green mr-[5px]' : '']"> $120,00 </span>
                        <span v-if="item.discount" class="text-xs line-through text-gray-300 md:text-sm"> $150,00 </span>
                    </span>
                </div>
                <div class="flex items-center text-xs font-Inter">
                    <span class="leading-tight text-gray-300 mr-2">Line Total:</span>
                    <span class="text-sm font-medium leading-snug md:text-base"> $30.000,00 </span>
                </div>
                <div
                    v-if="item.discount"
                    class="absolute left-0 -top-[15px] -translate-y-full bg-red rounded-[25px] px-1.5 py-0.5 text-xs font-extrabold text-white md:hidden"
                >
                    {{ item.discount }}%
                </div>
            </div>
            <QuantityButtons v-model="quantity" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { OrderSummaryItem } from '~~/types';
import D3Icon from '@/assets/icons/3d.svg';
import TruckIcon from '@/assets/icons/truck.svg';
import TrashIcon from '@/assets/icons/trash-can.svg';
import CheckIcon from '@/assets/icons/check-circle.svg';

defineProps({
    item: {
        type: Object as PropType<OrderSummaryItem>,
        required: true,
    },
});

const quantity = ref(0);
</script>
