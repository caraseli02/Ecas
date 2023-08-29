<template>
    <div
        class="relative bg-white rounded-xl p-4 shadow-xs md:p-6 xl:pb-10 xl:shadow-none xl:rounded-none xl:after:absolute xl:after:bottom-0 xl:after:left-1/2 xl:after:-translate-x-1/2 xl:after:bg-gray-200 xl:after:h-px xl:after:w-[calc(100%-48px)]"
    >
        <div class="mb-4">
            <div class="flex items-start justify-between">
                <h2 class="text-xl leading-[1.4] font-semibold">Customer Credit</h2>
                <button
                    class="flex items-center justify-center rounded-lg w-8 h-8 text-gray-300 transition-colors duration-300 hover:text-blue disabled:pointer-events-none"
                    :disabled="loading || error"
                    @click="$emit('toggle-editing')"
                >
                    <EditIcon v-if="!loading && !error" class="w-6 h-6" />
                    <WarningIcon v-if="error" class="w-6 h-6" />
                </button>
            </div>
        </div>
        <p class="text-sm leading-[1.71] mb-[68px] md:mb-7 lg:mb-9">Change to customer credit account.</p>
        <div
            class="md:grid md:grid-cols-[200px,1fr] md:grid-rows-[repeat(2,auto)] md:items-center md:gap-x-9 md:gap-y-8 lg:grid-cols-1 lg:gap-y-9 xl:gap-y-4"
        >
            <SkeletonLoader v-if="loading || error" class="w-full h-[71px] max-md:mb-12" />
            <div
                v-else-if="chartSeries[0] !== 0"
                class="grid grid-cols-3 border border-border rounded-lg p-3 max-md:mb-12 md:order-2 lg:order-1"
            >
                <div class="relative pr-4 after:absolute after:w-px after:top-0 after:right-0 after:h-full after:bg-border">
                    <div class="text-xs leading-[1.5] font-medium text-gray-300 mb-2">Credit Limit</div>
                    <div class="text-sm leading-[1.43] font-semibold">€ 10,000.00</div>
                </div>
                <div class="relative px-4 after:absolute after:w-px after:top-0 after:right-0 after:h-full after:bg-border">
                    <div class="text-xs leading-[1.5] font-medium text-gray-300 mb-2">Till Due</div>
                    <div class="text-sm leading-[1.43] font-semibold">42 Days</div>
                </div>
                <div class="pl-4">
                    <div class="text-xs leading-[1.5] font-medium text-gray-300 mb-2">Due Date</div>
                    <div class="text-sm leading-[1.43] font-semibold">26 Sep 2023</div>
                </div>
            </div>
            <div v-if="loading || error" class="flex items-center justify-center w-full h-[249px] max-md:mb-8">
                <SkeletonLoader class="w-[180px] h-[180px] mx-auto" type="circle" />
            </div>
            <div v-else class="relative flex justify-center max-md:mb-8 md:order-1 md:row-span-2 lg:order-2">
                <ClientOnly>
                    <apexchart width="270" height="270" :options="chartOptions" :series="chartSeries"></apexchart>
                </ClientOnly>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-max flex flex-col text-center">
                    <div class="text-xl font-bold leading-[1.4] mb-2" :class="[chartSeries[0] !== 0 ? 'text-[#EE514E]' : '']">
                        €
                        {{
                            chartSeries[0] === 0
                                ? '0,00'
                                : credit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        }}
                    </div>
                    <div class="text-sm leading-[1.14]">Available Credit</div>
                </div>
            </div>
            <button
                v-if="chartSeries[0] === 0"
                class="flex items-center justify-center w-full bg-blue rounded-lg px-5 py-2 text-white h-11 md:order-3"
            >
                Credit Account
            </button>
            <div v-else class="md:order-3">
                <div class="text-sm leading-[1.71] font-semibold mb-6">Total Spent</div>
                <SkeletonLoader v-if="loading || error" class="w-full h-12" />
                <template v-else>
                    <div class="flex items-center gap-2 mb-4">
                        <span class="text-xl leading-[1.2] font-semibold">€ 7,561.23</span>
                        <span class="text-sm leading-[1.71]"> spent of </span>
                        <span class="text-sm leading-[1.71] font-medium"> € 10,000.00</span>
                        <span class="text-sm leading-[1.71]"> limit </span>
                    </div>
                    <div class="grid grid-cols-2 gap-1">
                        <div class="relative rounded-[100px] h-2 overflow-hidden bg-[#F2F2F2]">
                            <div class="absolute top-0 left-0 w-full h-full bg-[#00D395]" />
                        </div>
                        <div class="grid grid-cols-3 gap-1">
                            <div class="relative rounded-[100px] h-2 overflow-hidden bg-[#F2F2F2]">
                                <div class="absolute top-0 left-0 w-full h-full bg-[#FFB100]" />
                            </div>
                            <div class="relative rounded-[100px] h-2 overflow-hidden bg-[#F2F2F2]">
                                <div class="absolute top-0 left-0 w-1/3 h-full bg-[#FF8A00]" />
                            </div>
                            <div class="relative rounded-[100px] h-2 overflow-hidden bg-[#F2F2F2]">
                                <div class="absolute top-0 left-0 w-0 h-full bg-[#FA4B4B]" />
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import EditIcon from '@/assets/icons/dashboard/edit.svg';
import WarningIcon from '@/assets/icons/dashboard/warning.svg';

defineEmits(['toggle-editing']);

const credit = ref(2438.77);

const chartSeries = ref([70]);
const chartOptions = ref({
    chart: {
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: '72%',
                background: '#fff',
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: 'front',
            },
            track: {
                background: '#EBEBEB',
                strokeWidth: '100%',
                margin: 0,
            },
            dataLabels: {
                show: false,
            },
        },
    },
    fill: {
        type: 'gradient',
        gradient: {
            type: 'horizontal',
            gradientToColors: ['#00D395', '#FFB100', '#FF8A00', '#DF3030'],
            inverseColors: true,
            stops: [0, 25, 50, 100],
        },
    },
    stroke: {
        lineCap: 'round',
    },
    labels: [''],
});

const loading = ref(true);
const error = ref(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
        error.value = false;
    }, 5000);
});
</script>
