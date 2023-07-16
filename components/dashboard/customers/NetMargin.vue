<template>
    <div class="relative flex flex-col bg-white rounded-xl p-4 shadow-xs md:p-6">
        <div class="flex items-start justify-between mb-5">
            <div class="leading-normal font-semibold">Net Margin</div>
            <div v-if="error" class="flex justify-end w-10 h-10">
                <WarningIcon class="w-6 h-6" />
            </div>
            <div v-else class="flex items-center justify-center bg-[#00D395] rounded-full w-10 h-10">
                <StatusIcon class="w-6 h-6" />
            </div>
        </div>
        <div class="mb-6">
            <SkeletonLoader v-if="isLoading" class="w-full h-20 mb-6" />
            <div v-else class="mb-4">
                <ClientOnly>
                    <apexchart width="100%" height="80" :options="chartOptions" :series="series"></apexchart>
                </ClientOnly>
            </div>
            <SkeletonLoader v-if="isLoading" class="w-full h-[46px]" />
            <div v-else class="text-[28px] leading-normal font-semibold">$ 1,200,539.77</div>
        </div>
        <div class="flex items-center justify-center">
            <button class="flex items-center">
                <span class="text-sm font-medium left-[1.43] text-gray-300 mr-2">
                    <span class="md:hidden lg:inline-block"> View </span> more
                </span>
                <ArrowRightIcon class="w-4 h-4" />
            </button>
        </div>
        <div v-if="false" class="flex flex-col items-center justify-center flex-1 max-lg:mt-11 max-lg:mb-3">
            <EmojiSadIcon class="w-[52px] h-[52px] mb-4" />
            <div class="text-sm font-medium leading-normal text-gray-100">No data available</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import StatusIcon from '@/assets/icons/dashboard/status-up.svg';
import ArrowRightIcon from '@/assets/icons/dashboard/arrow-right.svg';
import EmojiSadIcon from '@/assets/icons/dashboard/emoji-sad.svg';
import WarningIcon from '@/assets/icons/dashboard/warning.svg';
import type { ApexOptions } from 'apexcharts';

const chartOptions: ApexOptions = {
    chart: {
        zoom: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        animations: {
            enabled: true,
        },
        type: 'area',
        width: '145px',
        height: '48px',
    },
    legend: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: false,
    },
    stroke: {
        curve: 'smooth',
        width: 3,
        colors: ['#00D395'],
    },
    fill: {
        type: 'solid',
        colors: ['white'],
        opacity: 0,
    },
    xaxis: {
        axisBorder: {
            show: false,
        },
        labels: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
    grid: {
        show: false,
    },
};

const series = ref([
    {
        data: ['-3', '0', '2', '-1', '4', '3', '0', '4', '5'],
    },
]);
const error = ref(false);

const isLoading = ref(false);
</script>
