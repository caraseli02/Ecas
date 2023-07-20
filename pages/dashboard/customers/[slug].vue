<template>
    <div class="w-[1488px] max-w-full p-4 mx-auto transition-all duration-300 md:py-6 2xl:px-6">
        <DashboardBreadcrumbs title="Customer Profile">
            <div class="max-lg:hidden max-w-max">
                <div class="grid grid-cols-[repeat(2,auto)] gap-5 text-right">
                    <div class="flex flex-col">
                        <div class="text-sm leading-relaxed font-medium text-gray-300 mb-3">Credit Limit</div>
                        <div v-if="!isLoading" class="font-semibold leading-tight">
                            <div v-if="!emptyData">€ 100,000.00</div>
                            <div v-else class="text-sm font-medium leading-tight text-gray-100">No data available</div>
                        </div>
                        <SkeletonLoader v-else class="w-[104px] h-5" />
                    </div>
                    <div
                        class="relative pl-5 before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:w-px before:h-[85%] before:bg-border before:rounded-[50px]"
                    >
                        <div class="text-sm leading-relaxed font-medium text-gray-300 mb-3">Available Credit</div>
                        <div v-if="!isLoading" class="font-semibold leading-tight text-blue">
                            <div v-if="!emptyData">€ 45,328.63</div>
                            <div v-else class="text-sm font-medium leading-tight text-gray-100">No data available</div>
                        </div>
                        <SkeletonLoader v-else class="w-[104px] h-5" />
                    </div>
                </div>
            </div>
        </DashboardBreadcrumbs>
        <div class="grid grid-cols-1 gap-4 md:gap-6">
            <div class="bg-white rounded-xl px-4 py-3 shadow-xs grid grid-cols-2 md:py-2 lg:hidden">
                <div class="pr-4 md:flex md:items-center md:py-2">
                    <SkeletonLoader v-if="isLoading" class="w-full h-[45px] md:h-5" />
                    <template v-else>
                        <div
                            class="flex items-center justify-between text-xs leading-relaxed font-medium text-gray-300 mb-2 md:m-0 md:text-sm md:mr-2"
                        >
                            <div>Credit Limit</div>
                            <WarningIcon v-if="error" class="w-5 h-5 md:hidden" />
                        </div>
                        <div v-if="!emptyData" class="text-sm font-semibold leading-tight">€ 100,000.00</div>
                        <div v-else class="text-sm font-medium leading-tight text-gray-100">No data available</div>
                        <WarningIcon v-if="error" class="w-5 h-5 ml-auto max-md:hidden" />
                    </template>
                </div>
                <div
                    class="relative pl-4 before:absolute before:top-0 before:left-0 before:w-px before:h-full before:bg-gray-200 before:rounded-[50px] md:flex md:items-center"
                >
                    <SkeletonLoader v-if="isLoading" class="w-full h-[45px] md:h-5" />
                    <template v-else>
                        <div
                            class="flex items-center justify-between text-xs leading-relaxed font-medium text-gray-300 mb-2 md:m-0 md:text-sm md:mr-2"
                        >
                            <div>Available Credit</div>
                            <WarningIcon v-if="error" class="w-5 h-5 md:hidden" />
                        </div>
                        <div v-if="!emptyData" class="text-sm font-semibold leading-tight text-blue">€ 45,328.63</div>
                        <div v-else class="text-sm font-medium leading-tight text-gray-100">No data available</div>
                        <WarningIcon v-if="error" class="w-5 h-5 ml-auto max-md:hidden" />
                    </template>
                </div>
            </div>
            <DashboardCustomersInfoCards />
            <div class="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:grid-rows-[repeat(2,auto)] md:gap-6">
                <DashboardCustomersCustomerInformation class="xl:col-start-1 xl:row-start-1 xl:row-span-2" />
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:col-start-2 xl:row-start-1">
                    <DashboardCustomersNetMargin />
                    <DashboardCustomersRecentTransactions />
                </div>
                <DashboardCustomersDefaultShippingAddress class="xl:col-start-2 xl:row-start-2" />
            </div>
            <DashboardCustomersOrders />
        </div>
        <div class="flex justify-center text-center text-xs leading-normal text-gray-300 mt-6">
            Made with <HeartIcon class="w-[18px] h-[18px] mx-1 mt-px" /> by
            <a href="#" target="_blank" rel="noopener noreferrer" class="ml-1 transition-colors duration-300 hover:text-blue">
                Nezo Digital
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeartIcon from '@/assets/icons/dashboard/heart.svg';
import WarningIcon from '@/assets/icons/dashboard/warning.svg';

useHead({
    title: 'Dashboard Profile',
});

definePageMeta({
    layout: 'dashboard',
});

const error = ref(true);
const emptyData = ref(true);
const isLoading = ref(false);
</script>
