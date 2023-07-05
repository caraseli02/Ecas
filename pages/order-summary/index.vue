<template>
    <div class="pt-[30px] lg:pt-10">
        <div class="grid grid-cols-1">
            <div class="container">
                <div class="flex items-end justify-between mb-[15px]">
                    <h1 class="text-xl font-semibold">Order Summary</h1>
                    <div class="flex items-center">
                        <button class="flex items-center text-gray-100 transition-colors duration-300 hover:text-blue mr-[15px]">
                            <TriangleIcon class="w-[22px] h-[22px]" />
                            <span class="text-xs leading-tight ml-[5px] max-md:hidden"> Report an error </span>
                        </button>
                        <button class="flex items-center text-gray-100 transition-colors duration-300 hover:text-blue">
                            <PrintIcon class="w-[22px] h-[22px]" />
                            <span class="text-xs leading-tight ml-[5px] max-md:hidden"> Print this page </span>
                        </button>
                    </div>
                </div>
                <div class="lg:grid lg:grid-cols-[1fr,310px] lg:gap-5 lg:items-start lg:mb-10 xl:grid-cols-[1fr,340px]">
                    <OrderSummaryTable />
                    <div class="lg:grid lg:grid-cols-1">
                        <OrderSummary />
                        <OrderSummaryEcxlusiveOffer class="max-lg:hidden" />
                    </div>
                </div>
            </div>
            <Banner />
            <NewProducts title="Hot Deals" />
            <div class="container mb-10 lg:hidden">
                <OrderSummaryEcxlusiveOffer />
            </div>
            <News />
        </div>
    </div>
</template>

<script setup lang="ts">
import TriangleIcon from '@/assets/icons/triangle.svg';
import PrintIcon from '@/assets/icons/print.svg';

useHead({
    title: 'Order Summary',
});
</script>
