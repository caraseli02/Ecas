<template>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <div class="flex items-center bg-white rounded-xl p-4 shadow-xs md:p-6">
            <div class="mr-4">
                <div class="flex items-center justify-center w-14 h-14 bg-blue/25 rounded-full">
                    <div class="flex items-center justify-center w-10 h-10 bg-blue rounded-full">
                        <LastOrderIcon class="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
            <div>
                <div class="text-sm font-semibold text-gray-300 mb-3">Last Order</div>
                <SkeletonLoader v-if="isLoading" class="w-[160px] h-6 -mt-1" />
                <div v-else class="text-xl font-semibold text-blue leading-tight">#137759224</div>
            </div>
        </div>
        <div class="flex items-center bg-white rounded-xl p-4 shadow-xs md:p-6">
            <div class="mr-4">
                <div class="flex items-center justify-center w-14 h-14 bg-[#00D395]/25 rounded-full">
                    <div class="flex items-center justify-center w-10 h-10 bg-[#00D395] rounded-full">
                        <MoneyBagIcon class="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
            <div>
                <div class="text-sm font-semibold text-gray-300 mb-3">Total Spent</div>
                <SkeletonLoader v-if="isLoading" class="w-[160px] h-6 -mt-1" />
                <div v-else class="text-xl font-semibold leading-tight">$138.000,77</div>
            </div>
        </div>
        <div class="flex items-center bg-white rounded-xl p-4 shadow-xs md:p-6">
            <div class="mr-4">
                <div class="flex items-center justify-center w-14 h-14 bg-[#FFB100]/25 rounded-full">
                    <div class="flex items-center justify-center w-10 h-10 bg-[#FFB100] rounded-full">
                        <CardIcon class="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
            <div>
                <div class="text-sm font-semibold text-gray-300 mb-3">Average Order Value</div>
                <SkeletonLoader v-if="isLoading" class="w-[160px] h-6 -mt-1" />
                <div v-else class="text-xl font-semibold leading-tight">$574.00</div>
            </div>
        </div>
        <div class="flex items-center bg-white rounded-xl p-4 shadow-xs md:p-6">
            <div class="mr-4">
                <div class="flex items-center justify-center w-14 h-14 bg-[#FA4B4B]/25 rounded-full">
                    <div class="flex items-center justify-center w-10 h-10 bg-[#FA4B4B] rounded-full">
                        <AbandonedCheckoutIcon class="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
            <div>
                <div class="text-sm font-semibold text-gray-300 mb-3">Abandoned Checkout</div>
                <SkeletonLoader v-if="isLoading" class="w-[160px] h-6 -mt-1" />
                <div v-else class="text-xl font-semibold leading-tight">127</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import LastOrderIcon from '@/assets/icons/dashboard/orders.svg';
import MoneyBagIcon from '@/assets/icons/dashboard/money-bag.svg';
import CardIcon from '@/assets/icons/dashboard/card.svg';
import AbandonedCheckoutIcon from '@/assets/icons/dashboard/abandoned-checkout.svg';

const isLoading = ref(false);
</script>
