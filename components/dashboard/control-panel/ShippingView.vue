<template>
    <div>
        <h2 class="text-xl leading-[1.4] font-semibold mb-9">Shipping</h2>
        <div class="grid grid-cols-1 gap-6">
            <div
                v-for="(address, index) in addresses"
                :key="index"
                class="p-4 border border-dashed border-border rounded-xl md:flex md:items-center md:justify-between"
            >
                <div class="flex items-center gap-4 max-md:mb-9">
                    <BusinessIcon class="w-8 h-8 flex-shrink-0 text-gray-300" />
                    <div class="md:w-[301px] lg:w-auto">
                        <div class="flex items-center mb-2">
                            <div class="font-semibold leading-normal md:mr-6">{{ address.name }}</div>
                            <div
                                v-if="address.default"
                                class="flex items-center gap-1 bg-[#00D395] rounded-[100px] px-2 py-1 text-white max-md:hidden"
                            >
                                <CheckIcon class="w-4 h-4" />
                                <span class="text-xs font-medium leading-[1.3333]">Default</span>
                            </div>
                        </div>
                        <div class="text-sm leading-[1.42857] text-gray-300">{{ address.description }}</div>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div v-if="address.default" class="flex items-center gap-1 bg-[#00D395] rounded-[100px] px-2 py-1 text-white md:hidden">
                        <CheckIcon class="w-4 h-4" />
                        <span class="text-xs font-medium leading-[1.3333]">Default</span>
                    </div>
                    <div class="flex items-center gap-4 ml-auto">
                        <button
                            v-if="!address.default"
                            class="flex items-center justify-center w-11 h-11 bg-[#F2F2F2] bg-opacity-95 rounded-full text-gray-300 transition-colors duration-300 hover:bg-blue hover:text-white"
                        >
                            <CheckIcon class="w-5 h-5" />
                        </button>
                        <button
                            class="flex items-center justify-center w-11 h-11 bg-[#F2F2F2] bg-opacity-95 rounded-full text-gray-300 transition-colors duration-300 hover:bg-blue hover:text-white"
                        >
                            <EditIcon class="w-5 h-5" />
                        </button>
                        <button
                            class="flex items-center justify-center w-11 h-11 bg-[#F2F2F2] bg-opacity-95 rounded-full text-gray-300 transition-colors duration-300 hover:bg-blue hover:text-white"
                        >
                            <TrashIcon class="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
            <button class="flex items-center justify-center p-3 border border-dashed border-blue rounded-xl md:p-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" class="w-8 h-8 text-blue md:w-10 md:h-10">
                    <path stroke="#007FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M20 12v16m8-8H12" />
                    <rect width="38" height="38" x="1" y="1" stroke="#007FFF" stroke-width="2" rx="19" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import EditIcon from '@/assets/icons/dashboard/edit.svg';
import BusinessIcon from '@/assets/icons/dashboard/business.svg';
import CheckIcon from '@/assets/icons/check-circle.svg';
import TrashIcon from '@/assets/icons/dashboard/trash.svg';

const addresses = ref([
    {
        name: 'Shipping Address Alias 1',
        description: '5073 Mark Brown Rd, NE Dalton, Georgia (GA), 30721, United States',
        default: true,
    },
    {
        name: 'Shipping Address Alias 2',
        description: '5073 Mark Brown Rd, NE Dalton, Georgia (GA), 30721, United States',
    },
    {
        name: 'Shipping Address Alias 3',
        description: '5073 Mark Brown Rd, NE Dalton, Georgia (GA), 30721, United States',
    },
    {
        name: 'Shipping Address Alias 4',
        description: '5073 Mark Brown Rd, NE Dalton, Georgia (GA), 30721, United States',
    },
]);
</script>
