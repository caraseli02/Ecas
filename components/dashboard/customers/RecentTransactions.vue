<template>
    <div class="relative flex flex-col bg-white rounded-xl p-4 shadow-xs md:p-6">
        <div class="flex items-center justify-between" :class="[error ? 'mb-[93px] md:mb-[85px]' : 'mb-6']">
            <div class="leading-normal font-semibold">Recent Transactions</div>
            <WarningIcon v-if="error" class="w-6 h-6" />
        </div>
        <template v-if="!emptyData">
            <div class="mb-5">
                <div
                    class="grid grid-cols-[repeat(2,1fr),20px] gap-4 bg-[#F2F2F2] rounded px-2 py-1 text-sm font-medium leading-[1.57] mb-2"
                >
                    <div>Amount</div>
                    <div>Status</div>
                    <div />
                </div>
                <div
                    v-for="(transaction, index) in transactions"
                    :key="index"
                    class="grid grid-cols-[repeat(2,1fr),20px] gap-4 text-sm font-medium pb-2 last:pb-0"
                    :class="[isLoading ? '' : 'px-2']"
                >
                    <SkeletonLoader v-if="isLoading" class="w-full h-5" />
                    <div v-else>{{ transaction.amount }}</div>
                    <SkeletonLoader v-if="isLoading" class="w-full h-5 col-span-2" />
                    <template v-else>
                        <div class="flex items-center">
                            <div
                                class="w-2 h-2 rounded-full mr-2"
                                :class="[
                                    transaction.status === 'success'
                                        ? 'bg-[#00D395]'
                                        : transaction.status === 'declined'
                                        ? 'bg-[#FA4B4B]'
                                        : 'bg-[#FF8A00]',
                                ]"
                            />
                            <span
                                class="capitalize font-medium"
                                :class="[
                                    transaction.status === 'success'
                                        ? 'text-[#00D395]'
                                        : transaction.status === 'declined'
                                        ? 'text-[#FA4B4B]'
                                        : 'text-[#FF8A00]',
                                ]"
                                >{{ transaction.status }}</span
                            >
                        </div>
                        <div>
                            <ArrowSquareRightIcon class="w-5 h-5" />
                        </div>
                    </template>
                </div>
            </div>
            <div class="flex items-center justify-center">
                <button class="flex items-center">
                    <span class="text-sm font-medium left-[1.43] text-gray-300 mr-2">
                        <span class="md:hidden lg:inline-block"> View </span> more
                    </span>
                    <ArrowRightIcon class="w-4 h-4" />
                </button>
            </div>
        </template>
        <div v-else class="flex flex-col items-center justify-center flex-1 mb-[69px] md:mb-[61px]">
            <EmojiSadIcon class="w-[52px] h-[52px] mb-4" />
            <div class="text-sm font-medium text-gray-100">No data available</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ArrowRightIcon from '@/assets/icons/dashboard/arrow-right.svg';
import ArrowSquareRightIcon from '@/assets/icons/dashboard/arrow-square-right.svg';
import EmojiSadIcon from '@/assets/icons/dashboard/emoji-sad.svg';
import WarningIcon from '@/assets/icons/dashboard/warning.svg';

const transactions = ref([
    {
        amount: '$ 120.17',
        status: 'success',
    },
    {
        amount: '$ 89,420.17',
        status: 'declined',
    },
    {
        amount: '€ 189,420.17',
        status: 'success',
    },
    {
        amount: 'LEI 789,420.27',
        status: 'declined',
    },
    {
        amount: 'LEI 3,420.17',
        status: 'pending',
    },
]);

const error = ref(true);
const emptyData = ref(true);
const isLoading = ref(false);
</script>
