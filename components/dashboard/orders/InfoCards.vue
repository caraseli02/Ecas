<template>
    <div class="relative z-30 grid grid-cols-1 gap-4 mb-9 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <div v-for="(card, index) in cards" :key="index" class="group bg-white rounded-xl p-4 pr-2 shadow-xs md:p-6 md:pr-4">
            <div class="flex items-start justify-between w-full mb-8 xl:mb-12">
                <div class="flex items-center">
                    <div class="mr-4">
                        <div
                            class="flex items-center justify-center w-14 h-14 rounded-full"
                            :style="{
                                background: `${card.menu.selected.theme || card.theme}40`,
                            }"
                        >
                            <div
                                class="relative flex items-center justify-center w-10 h-10 rounded-full"
                                :style="{
                                    background: card.menu.selected.theme || card.theme,
                                }"
                            >
                                <component :is="card.menu.selected.icon" class="relative z-10 w-6 h-6 text-white" />
                                <div
                                    class="absolute top-0 left-0 w-full h-full rounded-full group-hover:animate-ping-once"
                                    :style="{
                                        background: card.menu.selected.theme || card.theme,
                                    }"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="text-sm font-semibold text-gray-300 mb-3">{{ card.menu.selected.label }}</div>
                        <div class="text-xl font-semibold leading-[1.2] md:text-2xl md:leading-none">
                            {{ card.menu.selected.value || 0 }}
                        </div>
                    </div>
                </div>
                <div class="relative">
                    <button
                        class="flex text-[#9296AA] transition-colors duration-300 hover:text-blue"
                        @click="card.menu.showOptions = !card.menu.showOptions"
                    >
                        <DotsVerticalIcon class="w-6 h-6" />
                    </button>
                    <Transition name="fade-full">
                        <div
                            v-if="card.menu.showOptions"
                            v-click-outside="() => (card.menu.showOptions = false)"
                            class="grid grid-cols-1 gap-1 absolute z-10 -bottom-2 right-0 translate-y-full min-w-max bg-white rounded-lg shadow-m p-3"
                        >
                            <button
                                v-for="option in card.menu.options"
                                :key="option.label"
                                class="group/option flex items-center justify-between w-full px-2 py-2 text-left rounded-lg text-sm font-medium leading-[1.71429] transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                                :class="[option.label === card.menu.selected.label ? '' : 'text-dark']"
                                @click="
                                    card.menu.selected = option;
                                    card.menu.showOptions = false;
                                "
                            >
                                <span class="mr-4">
                                    {{ option.label }}
                                </span>
                                <div
                                    class="flex items-center justify-center w-[18px] h-[18px] rounded-full border-2 transition-colors duration-300"
                                    :class="[
                                        option.label === card.menu.selected.label
                                            ? 'border-blue'
                                            : 'border-border group-hover/option:border-dark',
                                    ]"
                                >
                                    <div v-if="option.label === card.menu.selected.label" class="w-2.5 h-2.5 bg-blue rounded-full" />
                                </div>
                            </button>
                        </div>
                    </Transition>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="relative">
                    <button class="flex items-center" @click="card.range.showOptions = !card.range.showOptions">
                        <span class="text-sm left-[1.43] text-gray-300 font-medium mr-1">
                            {{ card.range.selected.label }}
                        </span>
                        <ChevronIcon
                            class="w-5 h-5 text-gray-300 transition-transform duration-300"
                            :class="[card.range.showOptions ? 'rotate-180' : '']"
                        />
                    </button>
                    <Transition name="fade-full">
                        <div
                            v-if="card.range.showOptions"
                            v-click-outside="() => (card.range.showOptions = false)"
                            class="absolute z-10 -bottom-0.5 left-0 translate-y-full grid grid-cols-1 gap-1 rounded-lg bg-white p-3 w-[200px]"
                            :style="{
                                boxShadow: '0px 0px 6px rgba(51, 51, 51, 0.2)',
                            }"
                        >
                            <button
                                v-for="(option, index) in options"
                                :key="index"
                                class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                                :class="card.range.selected.value === option.value ? 'bg-[#F2F2F2] text-blue' : ''"
                                @click="
                                    card.range.showOptions = false;
                                    card.range.selected = option;
                                "
                            >
                                <span class="text-sm leading-[1.71] font-medium">{{ option.label }}</span>
                            </button>
                        </div>
                    </Transition>
                </div>
                <button class="flex items-center text-gray-300 mr-2">
                    <span class="text-sm font-medium left-[1.43] mr-2"> More </span>
                    <ArrowRightIcon class="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import RevenueGrowthIcon from '@/assets/icons/dashboard/orders/revenue-growth.svg';
import TotalOrdersIcon from '@/assets/icons/dashboard/orders/total-orders.svg';
import TotalStockValueIcon from '@/assets/icons/dashboard/orders/total-stock-value.svg';
import GrossMarginIcon from '@/assets/icons/dashboard/orders/gross-margin.svg';
import GrossRevenueIcon from '@/assets/icons/dashboard/orders/gross-revenue.svg';
import ActiveCartSessionsIcon from '@/assets/icons/dashboard/orders/active-cart-sessions.svg';
import AvgOrderValueIcon from '@/assets/icons/dashboard/orders/avg-order-value.svg';
import RefundsIcon from '@/assets/icons/dashboard/orders/refunds.svg';
import ReturnsIcon from '@/assets/icons/dashboard/orders/returns.svg';
import ProductsSoldIcon from '@/assets/icons/dashboard/orders/products-sold.svg';
import DotsVerticalIcon from '@/assets/icons/dots-vertical.svg';
import ArrowRightIcon from '@/assets/icons/dashboard/arrow-right.svg';
import ChevronIcon from '@/assets/icons/dashboard/chevron-down.svg';

const cards = ref([
    {
        range: {
            selected: { label: 'This week', value: 1 },
            showOptions: false,
        },
        menu: {
            options: [
                {
                    label: 'Total Orders',
                    icon: TotalOrdersIcon,
                    value: '257',
                },
                {
                    label: 'Revenue Growth',
                    icon: RevenueGrowthIcon,
                    value: '+$ 1692.58',
                },
            ],
            selected: {
                label: 'Total Orders',
                icon: TotalOrdersIcon,
                value: '257',
            },
            showOptions: false,
        },
        theme: '#007FFF',
    },
    {
        range: {
            selected: { label: 'This week', value: 1 },
            showOptions: false,
        },
        menu: {
            options: [
                {
                    label: 'Gross Revenue',
                    icon: GrossRevenueIcon,
                    value: '$ 38,341.62',
                },
                {
                    label: 'Gross Margin',
                    icon: GrossMarginIcon,
                    value: '$ 18,341.62',
                },
                {
                    label: 'Total Stock Value',
                    icon: TotalStockValueIcon,
                    value: '$ 158,341.62',
                },
            ],
            selected: {
                label: 'Gross Revenue',
                icon: GrossRevenueIcon,
                value: '$ 38,341.62',
            },
            showOptions: false,
        },
        theme: '#00D395',
    },
    {
        range: {
            selected: { label: 'This week', value: 1 },
            showOptions: false,
        },
        menu: {
            options: [
                {
                    label: 'Average Order Value',
                    icon: AvgOrderValueIcon,
                    value: '$ 574.00',
                },
                {
                    label: 'Active Cart Sessions',
                    icon: ActiveCartSessionsIcon,
                    value: '73',
                },
            ],
            selected: {
                label: 'Average Order Value',
                icon: AvgOrderValueIcon,
                value: '$ 574.00',
            },
            showOptions: false,
        },
        theme: '#FFB100',
    },
    {
        range: {
            selected: { label: 'This week', value: 1 },
            showOptions: false,
        },
        menu: {
            options: [
                {
                    label: 'Products Sold',
                    icon: ProductsSoldIcon,
                    theme: '#A460BC',
                    value: '19,336',
                },
                {
                    label: 'Returns',
                    icon: ReturnsIcon,
                    theme: '#FA4B4B',
                    value: '16',
                },
                {
                    label: 'Refunds',
                    icon: RefundsIcon,
                    theme: '#FA4B4B',
                    value: '22',
                },
            ],
            selected: {
                label: 'Products Sold',
                icon: ProductsSoldIcon,
                theme: '#A460BC',
                value: '19,336',
            },
            showOptions: false,
        },
        theme: '#A460BC',
    },
]);

const options = [
    { label: 'Last 24h', value: 1 },
    { label: 'This Week', value: 2 },
    { label: 'Last 7 Days', value: 3 },
    { label: 'Last 30 Days', value: 4 },
    { label: 'All Time', value: 5 },
];
</script>
