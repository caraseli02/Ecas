<template>
    <div class="mb-6 min-h-[350px] md:mb-8">
        <div class="dashboardTable grid grid-cols-1 gap-1 rounded-t-lg overflow-x-auto scrollbar-thin" @scroll="handleScroll">
            <div class="grid grid-cols-[359px,154px,254px,244px,129px,148px,104px] items-center rounded-t-lg">
                <div class="p-4 pr-1.5 bg-[#F2F2F2] rounded-l-lg h-[104px]">
                    <div class="mb-4">
                        <button
                            class="relative flex items-center h-5"
                            @click="
                                nameOrder === 0 ? (nameOrder = 1) : (nameOrder = 0);
                                handleSortChange(emits, 'email', nameOrder);
                            "
                        >
                            <span class="text-sm leading-[1.43] font-medium mr-1"> Name </span>
                            <SortDownIcon v-if="nameOrder === 0" class="w-5 h-5 rounded-full" />
                            <SortUpIcon v-else class="w-5 h-5 rounded-full" />
                        </button>
                    </div>
                    <DashboardSearch
                        v-model="name"
                        placeholder="Search name, email, country, discount"
                        size="sm"
                        class="w-full"
                        @input="handleFilterChange(activeFilters, emits, 'combinedName', $event)"
                    />
                </div>
                <div class="relative p-4 pr-1.5 bg-[#F2F2F2]">
                    <div class="mb-4">
                        <button
                            class="relative flex items-center h-5"
                            @click="
                                accountOrder === 0 ? (accountOrder = 1) : (accountOrder = 0);
                                handleSortChange(emits, 'accountType', accountOrder);
                            "
                        >
                            <span class="text-sm leading-[1.43] font-medium mr-1"> Account </span>
                            <SortDownIcon v-if="accountOrder === 0" class="w-5 h-5 rounded-full" />
                            <SortUpIcon v-else class="w-5 h-5 rounded-full" />
                        </button>
                    </div>
                    <button
                        class="flex items-center justify-between relative w-full border rounded-lg px-3 py-[7px] bg-white transition-colors duration-300"
                        :class="[!account ? 'text-gray-100' : '', showAccountOptions ? 'border-blue' : 'border-border']"
                        @click="handleShowAccountOptions"
                    >
                        <span class="text-sm flex-shrink-0 mr-1">
                            {{ account || 'Select' }}
                        </span>
                        <ChevronDownIcon
                            class="w-5 h-5 text-gray-300 flex-shrink-0 rounded-full"
                            :class="[showAccountOptions ? 'rotate-180' : '']"
                        />
                    </button>
                </div>
                <div class="p-4 pr-1.5 bg-[#F2F2F2]">
                    <div class="mb-4">
                        <button
                            class="relative flex items-center h-5"
                            @click="
                                companyOrder === 0 ? (companyOrder = 1) : (companyOrder = 0);
                                handleSortChange(emits, 'companyName', accountOrder);
                            "
                        >
                            <span class="text-sm leading-[1.43] font-medium mr-1"> Company </span>
                            <SortDownIcon v-if="companyOrder === 0" class="w-5 h-5 rounded-full" />
                            <SortUpIcon v-else class="w-5 h-5 rounded-full" />
                        </button>
                    </div>
                    <DashboardSearch
                        v-model="company"
                        placeholder="Search company"
                        size="sm"
                        class="w-full"
                        @input="handleFilterChange(activeFilters, emits, 'companyName', $event)"
                    />
                </div>
                <div class="relative p-4 pr-1.5 bg-[#F2F2F2]">
                    <div class="mb-4">
                        <button
                            class="relative flex items-center h-5"
                            @click="
                                registeredOrder === 0 ? (registeredOrder = 1) : (registeredOrder = 0);
                                handleSortChange(emits, 'createdAt', registeredOrder);
                            "
                        >
                            <span class="text-sm leading-[1.43] font-medium mr-1"> Registered </span>
                            <SortDownIcon v-if="registeredOrder === 0" class="w-5 h-5 rounded-full" />
                            <SortUpIcon v-else class="w-5 h-5 rounded-full" />
                        </button>
                    </div>
                    <button
                        class="flex items-center justify-between relative w-full border rounded-lg px-3 py-[7px] bg-white transition-colors duration-300"
                        :class="[
                            !registered.start && !registered.end ? 'text-gray-100' : '',
                            showRegisteredRange ? 'border-blue' : 'border-border',
                        ]"
                        @click="handleShowRegistered"
                    >
                        <span class="text-sm tracking-[-0.02em] flex-shrink-0 mr-1">
                            {{
                                registered.start && registered.end
                                    ? `${formattedDate(registered.start)} - ${formattedDate(registered.end)}`
                                    : '23/9/2023 - 23/9/2023'
                            }}
                        </span>
                        <CalendarIcon class="w-5 h-5 text-gray-300 flex-shrink-0" />
                    </button>
                </div>
                <div class="relative p-4 pr-1.5 bg-[#F2F2F2]">
                    <div class="mb-4">
                        <button
                            class="relative flex items-center h-5"
                            @click="
                                spentOrder === 0 ? (spentOrder = 1) : (spentOrder = 0);
                                handleSortChange(emits, 'spent', spentOrder);
                            "
                        >
                            <span class="text-sm leading-[1.43] font-medium mr-1"> Spent </span>
                            <SortDownIcon v-if="spentOrder === 0" class="w-5 h-5 rounded-full" />
                            <SortUpIcon v-else class="w-5 h-5 rounded-full" />
                        </button>
                    </div>
                    <button
                        class="flex items-center justify-between relative w-full border rounded-lg px-2.5 py-[7px] bg-white transition-colors duration-300"
                        :class="[!spent[0] && !spent[1] ? 'text-gray-100' : '', showSpentRange ? 'border-blue' : 'border-border']"
                        @click="handleShowSpentRange"
                    >
                        <span class="text-sm truncate flex-shrink-0 mr-1" :class="[spent[0] || spent[1] ? '-tracking-widest' : '']">
                            {{ spentValue }}
                        </span>
                        <FilterIcon class="w-5 h-5 text-gray-300 flex-shrink-0" />
                    </button>
                </div>
                <div class="relative p-4 pr-1.5 bg-[#F2F2F2]">
                    <div class="mb-4">
                        <button
                            class="relative flex items-center h-5"
                            @click="
                                ordersCountOrder === 0 ? (ordersCountOrder = 1) : (ordersCountOrder = 0);
                                handleSortChange(emits, 'ordersCount', ordersCountOrder);
                            "
                        >
                            <span class="text-sm leading-[1.43] font-medium mr-1"> Orders count </span>
                            <SortDownIcon v-if="ordersCountOrder === 0" class="w-5 h-5 rounded-full" />
                            <SortUpIcon v-else class="w-5 h-5 rounded-full" />
                        </button>
                    </div>
                    <button
                        class="flex relative w-full border rounded-lg px-3 py-[7px] bg-white transition-colors duration-300"
                        :class="[!ordersCount ? 'text-gray-100' : '', showOrdersRange ? 'border-blue' : 'border-border']"
                        @click="handleShowOrdersRange"
                    >
                        <span class="text-sm">
                            {{ ordersCount || 'Filter' }}
                        </span>
                        <FilterIcon class="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-300" />
                    </button>
                </div>
                <div class="p-4 pr-1.5 w-full rounded-r-lg bg-[#F2F2F2] self-stretch">
                    <div class="relative">
                        <div class="flex items-center mb-4">
                            <span class="text-sm leading-[1.43] font-medium"> Actions </span>
                        </div>
                    </div>
                </div>
            </div>
            <DashboardCustomersListItem
                v-for="(item, index) in items"
                :key="index"
                :item="item"
                :index="index"
                :is-scrolling="isScrolling"
                :loading="loading"
            />
        </div>
    </div>
    <Teleport to="body">
        <Transition name="fade-bottom">
            <div
                v-if="showAccountOptions"
                v-click-outside="() => (showAccountOptions = false)"
                class="absolute z-10 -translate-x-full grid grid-cols-1 gap-1 rounded-lg bg-white p-3 w-[163px] shadow-m"
                :style="{
                    top: accountDropdownTop + 'px',
                    left: accountDropdownLeft + 'px',
                }"
            >
                <button
                    class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                    :class="[account === 'Personal' ? 'text-blue bg-[#F2F2F2]' : '']"
                    @click="
                        account = 'Personal';
                        showAccountOptions = false;
                        handleFilterChange(activeFilters, emits, 'accountType', AccountType.Personal, true);
                    "
                >
                    <ProfileIcon class="w-6 h-6 mr-3 text-current" />
                    <span class="text-sm leading-[1.71]">Personal</span>
                </button>
                <button
                    class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                    :class="[account === 'Sole Trader' ? 'text-blue bg-[#F2F2F2]' : '']"
                    @click="
                        account = 'Sole Trader';
                        showAccountOptions = false;
                        handleFilterChange(activeFilters, emits, 'accountType', AccountType.SoleTrader, true);
                    "
                >
                    <SoleTraderIcon class="w-6 h-6 mr-3 text-current" />
                    <span class="text-sm leading-[1.71]">Sole Trader</span>
                </button>
                <button
                    class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                    :class="[account === 'Agent' ? 'text-blue bg-[#F2F2F2]' : '']"
                    @click="
                        account = 'Agent';
                        showAccountOptions = false;
                        handleFilterChange(activeFilters, emits, 'accountType', AccountType.Agent, true);
                    "
                >
                    <AgentIcon class="w-6 h-6 mr-3 text-current" />
                    <span class="text-sm leading-[1.71]">Agent</span>
                </button>
                <button
                    class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                    :class="[account === 'Business' ? 'text-blue bg-[#F2F2F2]' : '']"
                    @click="
                        account = 'Business';
                        showAccountOptions = false;
                        handleFilterChange(activeFilters, emits, 'accountType', AccountType.Business, true);
                    "
                >
                    <BusinessIcon class="w-6 h-6 flex-shrink-0 mr-3 text-current" />
                    <span class="text-sm leading-[1.71]">Business</span>
                </button>
                <button
                    class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                    @click="
                        account = '';
                        showAccountOptions = false;
                        handleFilterChange(activeFilters, emits, 'accountType', '', true);
                    "
                >
                    <EyeIcon class="w-6 h-6 mr-3 text-current" />
                    <span class="text-sm leading-[1.71]">View All</span>
                </button>
            </div>
        </Transition>
        <Transition name="fade-bottom">
            <div
                v-if="showRegisteredRange"
                v-click-outside="() => (showRegisteredRange = false)"
                class="absolute z-10 -translate-x-full rounded-lg overflow-hidden shadow-m"
                :style="{
                    left: registeredDropdownLeft + 'px',
                    top: registeredDropdownTop + 'px',
                }"
            >
                <DatePicker v-model.range="registered" borderless />
            </div>
        </Transition>
        <Transition name="fade-bottom">
            <div
                v-if="showSpentRange"
                v-click-outside="() => (showSpentRange = false)"
                class="absolute z-10 -translate-x-full grid grid-cols-1 gap-1 rounded-lg bg-white p-6 w-[358px] shadow-m"
                :style="{
                    left: spentRangeDropdownLeft + 'px',
                    top: spentRangeDropdownTop + 'px',
                }"
            >
                <div class="text-sm leading-[1.71] font-semibold mb-8">Spent range</div>
                <div class="mb-16">
                    <div class="flex items-end gap-3 mb-6">
                        <label>
                            <div class="text-sm leading-[1.43] text-gray-300 mb-4">From</div>
                            <div class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]">
                                <span class="font-medium mr-1">$</span>
                                <input
                                    v-model.number="spentBuffer[0]"
                                    type="number"
                                    class="bg-transparent py-2 w-full focus:outline-none"
                                />
                            </div>
                        </label>
                        <div class="text-sm leading-[1.43] mb-3">-</div>
                        <label>
                            <div class="text-sm leading-[1.43] text-gray-300 mb-4">To</div>
                            <div class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]">
                                <span class="font-medium mr-1">$</span>
                                <input
                                    v-model.number="spentBuffer[1]"
                                    type="number"
                                    class="bg-transparent py-2 w-full focus:outline-none"
                                />
                            </div>
                        </label>
                    </div>
                    <div class="flex items-center justify-between mb-3">
                        <div class="text-sm leading-[1.43] font-medium">${{ spentBuffer[0] }}</div>
                        <div class="text-sm leading-[1.43] font-medium">${{ spentBuffer[1] }}</div>
                    </div>
                    <Slider
                        v-model="spentBuffer"
                        :min="0"
                        :max="100000"
                        :step="10"
                        :tooltips="false"
                        class="rangeSlider"
                        @slide="spentBuffer = $event"
                    />
                </div>
                <div class="grid grid-cols-[auto,1fr] gap-4">
                    <button
                        class="flex px-8 py-2 rounded-lg text-sm bg-gray-200 leading-[1.67] h-10 text-gray-300 font-medium"
                        @click="showSpentRange = false"
                    >
                        Cancel
                    </button>
                    <button
                        class="flex justify-center px-8 py-2 text-sm w-full rounded-lg bg-blue leading-[1.67] h-10 text-white font-medium"
                        @click="
                            spent = spentBuffer;
                            showSpentRange = false;
                        "
                    >
                        Apply Filter
                    </button>
                </div>
            </div>
        </Transition>
        <Transition name="fade-bottom">
            <div
                v-if="showOrdersRange"
                v-click-outside="() => (showOrdersRange = false)"
                class="absolute z-10 -translate-x-full grid grid-cols-1 gap-1 rounded-lg bg-white p-6 w-[358px] shadow-m"
                :style="{
                    left: ordersRangeDropdownLeft + 'px',
                    top: ordersRangeDropdownTop + 'px',
                }"
            >
                <div class="text-sm leading-[1.71] font-semibold mb-[76px]">Orders range</div>
                <div class="mb-14">
                    <Slider
                        v-model="ordersCountBuffer"
                        :min="0"
                        :max="1000"
                        :step="5"
                        :format="
            (val: number) => {
              return `${val === 1000 ? 'Any' : val + ' +'}`;
            }
          "
                        class="rangeSlider"
                    />
                    <div class="flex items-center justify-between">
                        <div class="text-sm leading-[1.43] font-medium">0</div>
                        <div class="text-sm leading-[1.43] font-medium">Any</div>
                    </div>
                </div>
                <div class="grid grid-cols-[auto,1fr] gap-4">
                    <button
                        class="flex px-8 py-2 rounded-lg text-sm bg-gray-200 leading-[1.67] h-10 text-gray-300 font-medium"
                        @click="showOrdersRange = false"
                    >
                        Cancel
                    </button>
                    <button
                        class="flex justify-center px-8 py-2 text-sm w-full rounded-lg bg-blue leading-[1.67] h-10 text-white font-medium"
                        @click="
                            ordersCount = ordersCountBuffer;
                            showOrdersRange = false;
                        "
                    >
                        Apply Filter
                    </button>
                </div>
            </div>
        </Transition>
        <Transition name="fade">
            <div v-if="showSpentRange" class="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center md:hidden">
                <div class="relative z-10 w-[358px] max-w-[calc(100vw-32px)] p-6 bg-white rounded-xl shadow-xs">
                    <div class="grid grid-cols-1 gap-1">
                        <div class="flex items-center justify-between mb-8">
                            <div class="text-sm leading-[1.71] font-semibold">Spent range</div>
                            <button
                                class="w-8 h-8 bg-gray-200 flex items-center justify-center text-gray-300 rounded-lg"
                                @click="showSpentRange = false"
                            >
                                <XIcon class="w-6 h-6" />
                            </button>
                        </div>
                        <div class="mb-16">
                            <div class="flex items-end gap-3 mb-6">
                                <label>
                                    <div class="text-sm leading-[1.43] text-gray-300 mb-4">From</div>
                                    <div class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]">
                                        <span class="font-medium mr-1">$</span>
                                        <input
                                            v-model.number="spentBuffer[0]"
                                            type="number"
                                            class="bg-transparent py-2 w-full focus:outline-none"
                                        />
                                    </div>
                                </label>
                                <div class="text-sm leading-[1.43] mb-3">-</div>
                                <label>
                                    <div class="text-sm leading-[1.43] text-gray-300 mb-4">To</div>
                                    <div class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]">
                                        <span class="font-medium mr-1">$</span>
                                        <input
                                            v-model.number="spentBuffer[1]"
                                            type="number"
                                            class="bg-transparent py-2 w-full focus:outline-none"
                                        />
                                    </div>
                                </label>
                            </div>
                            <div class="flex items-center justify-between mb-3">
                                <div class="text-sm leading-[1.43] font-medium">${{ spentBuffer[0] }}</div>
                                <div class="text-sm leading-[1.43] font-medium">${{ spentBuffer[1] }}</div>
                            </div>
                            <Slider
                                v-model="spentBuffer"
                                :min="0"
                                :max="100000"
                                :step="10"
                                :tooltips="false"
                                class="rangeSlider"
                                @slide="spentBuffer = $event"
                            />
                        </div>
                        <div class="grid grid-cols-[auto,1fr] gap-4">
                            <button
                                class="flex px-8 py-2 rounded-lg text-sm bg-gray-200 leading-[1.67] h-10 text-gray-300 font-medium"
                                @click="showSpentRange = false"
                            >
                                Cancel
                            </button>
                            <button
                                class="flex justify-center px-8 py-2 text-sm w-full rounded-lg bg-blue leading-[1.67] h-10 text-white font-medium"
                                @click="
                                    spent = spentBuffer;
                                    showSpentRange = false;
                                "
                            >
                                Apply Filter
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    class="absolute top-0 left-0 w-full h-full bg-[#2F3241]/10 backdrop-blur-[7.5px] cursor-pointer"
                    @click="showSpentRange = false"
                />
            </div>
        </Transition>
        <Transition name="fade">
            <div v-if="showOrdersRange" class="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center md:hidden">
                <div class="relative z-10 w-[358px] max-w-[calc(100vw-32px)] p-4 bg-white rounded-xl shadow-xs md:p-6">
                    <div class="grid grid-cols-1 gap-1">
                        <div class="flex items-center justify-between mb-[76px]">
                            <div class="text-sm leading-[1.71] font-semibold">Orders range</div>
                            <button
                                class="w-8 h-8 bg-gray-200 flex items-center justify-center text-gray-300 rounded-lg ml-auto"
                                @click="showOrdersRange = false"
                            >
                                <XIcon class="w-6 h-6" />
                            </button>
                        </div>
                        <div class="mb-14">
                            <Slider
                                v-model="ordersCountBuffer"
                                :min="0"
                                :max="1000"
                                :step="5"
                                :format="
            (val: number) => {
              return `${val === 1000 ? 'Any' : val + ' +'}`;
            }
          "
                                class="rangeSlider"
                            />
                            <div class="flex items-center justify-between">
                                <div class="text-sm leading-[1.43] font-medium">0</div>
                                <div class="text-sm leading-[1.43] font-medium">Any</div>
                            </div>
                        </div>
                        <div class="grid grid-cols-[auto,1fr] gap-4">
                            <button
                                class="flex px-8 py-2 rounded-lg text-sm bg-gray-200 leading-[1.67] h-10 text-gray-300 font-medium"
                                @click="showOrdersRange = false"
                            >
                                Cancel
                            </button>
                            <button
                                class="flex justify-center px-8 py-2 text-sm w-full rounded-lg bg-blue leading-[1.67] h-10 text-white font-medium"
                                @click="
                                    ordersCount = ordersCountBuffer;
                                    showOrdersRange = false;
                                "
                            >
                                Apply Filter
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    class="absolute top-0 left-0 w-full h-full bg-[#2F3241]/10 backdrop-blur-[7.5px] cursor-pointer"
                    @click="showOrdersRange = false"
                />
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import Slider from '@vueform/slider';
import ChevronDownIcon from '@/assets/icons/dashboard/chevron-down.svg';
import CalendarIcon from '@/assets/icons/dashboard/calendar.svg';
import FilterIcon from '@/assets/icons/dashboard/filter-2.svg';
import { AccountType, DashboardCustomerTableItem } from '~~/types';
import ProfileIcon from '@/assets/icons/dashboard/profile.svg';
import SoleTraderIcon from '@/assets/icons/dashboard/sole-trader.svg';
import AgentIcon from '@/assets/icons/dashboard/agent.svg';
import BusinessIcon from '@/assets/icons/dashboard/business.svg';
import EyeIcon from '@/assets/icons/dashboard/eye.svg';
import XIcon from '@/assets/icons/dashboard/x.svg';
import SortUpIcon from '@/assets/icons/dashboard/sort-up.svg';
import SortDownIcon from '@/assets/icons/dashboard/sort-down.svg';
import { DatePicker } from 'v-calendar';
import { FilterInterface } from '~/model/dashboard/table/filters';
import { handleFilterChange, handleSortChange } from '~/services/dashboard/filter.service';
import Emitter from 'tiny-emitter/instance';
import { subDays } from 'date-fns';

const props = defineProps({
    items: {
        type: Array as PropType<DashboardCustomerTableItem[]>,
        required: true,
    },
    loading: {
        type: Boolean,
        default: true,
    },
});

const emits = defineEmits(['active-filters', 'active-sort']);

const activeFilters: FilterInterface[] = [];

const name = ref('');
const nameOrder: number = ref(0);
const account = ref('');
const accountOrder: number = ref(0);
const company = ref('');
const companyOrder: number = ref(0);
const registered = ref({
    start: null,
    end: null,
});
const registeredOrder: number = ref(0);
const spentBuffer = ref([0, 0]);
const spent = ref([0, 0]);
const spentOrder: number = ref(0);
const ordersCountBuffer = ref(0);
const ordersCount = ref(0);
const ordersCountOrder: number = ref(0);

const showAccountOptions = ref(false);
const accountDropdownLeft = ref(0);
const accountDropdownTop = ref(0);
const handleShowAccountOptions = (event: MouseEvent) => {
    showAccountOptions.value = !showAccountOptions.value;
    console.log(showAccountOptions.value);
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    accountDropdownLeft.value = rect.right;
    accountDropdownTop.value = rect.bottom + window.scrollY + 8;
};

const showRegisteredRange = ref(false);
const registeredDropdownLeft = ref(0);
const registeredDropdownTop = ref(0);
const handleShowRegistered = (event: MouseEvent) => {
    showRegisteredRange.value = !showRegisteredRange.value;
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    registeredDropdownTop.value = rect.bottom + window.scrollY + 8;
    registeredDropdownLeft.value = rect.right;
};

const showSpentRange = ref(false);
const spentRangeDropdownLeft = ref(0);
const spentRangeDropdownTop = ref(0);
const handleShowSpentRange = (event: MouseEvent) => {
    showSpentRange.value = !showSpentRange.value;
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    spentRangeDropdownTop.value = rect.bottom + window.scrollY + 8;
    spentRangeDropdownLeft.value = rect.right;
};

const showOrdersRange = ref(false);
const ordersRangeDropdownLeft = ref(0);
const ordersRangeDropdownTop = ref(0);
const handleShowOrdersRange = (event: MouseEvent) => {
    showOrdersRange.value = !showOrdersRange.value;
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    ordersRangeDropdownTop.value = rect.bottom + window.scrollY + 8;
    ordersRangeDropdownLeft.value = rect.right;
};

const formattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB');
};

Emitter.on('registered-filter', (filter) => {
    if (filter.time === -1) {
        registered.value.start = null;
        registered.value.end = Date.now();

        return;
    }

    registered.value.start = subDays(Date.now(), filter.time);
    registered.value.end = Date.now();
});

watch(
    registered,
    (newRegistered) => {
        handleFilterChange(activeFilters, emits, 'startDate', formattedDate(newRegistered.start), true);
        handleFilterChange(activeFilters, emits, 'endDate', formattedDate(newRegistered.end), true);
    },
    { deep: true }
);

const spentValue = computed(() => {
    const spentValue = spent.value
        ?.map((value) => {
            if (value >= 1000) {
                return `${Math.round(value / 1000)}K`;
            }
            return Math.round(value);
        })
        .join(' - ');

    return spent.value[0] || spent.value[1] ? spentValue : 'Filter';
});

const isScrolling = ref(false);
const scrollTimeout = ref();

const handleScroll = () => {
    showAccountOptions.value = false;
    showRegisteredRange.value = false;
    showSpentRange.value = false;
    showOrdersRange.value = false;
    isScrolling.value = true;
    clearTimeout(scrollTimeout.value);
    scrollTimeout.value = setTimeout(() => {
        isScrolling.value = false;
    }, 66);
};
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style lang="scss">
.dashboardTable {
    &::-webkit-scrollbar {
        @apply h-1;
    }
}
.rangeSlider {
    @apply h-2 mb-3 px-2;
    .slider-base {
        @apply bg-gray-200;
    }
    .slider-connect {
        @apply bg-blue h-[9px] -top-px;
    }
    .slider-handle {
        @apply w-6 h-6 -top-2;
        box-shadow: 0px 0px 6px rgba(51, 51, 51, 0.2);
        border: 1px solid #d4d4d4;
    }
    .slider-tooltip {
        @apply bg-[#1B1B28] border-none rounded px-3 py-1 text-sm leading-[1.43] tracking-[-0.02em] text-white font-normal left-1/2 -translate-x-1/2 -translate-y-3  before:hidden after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:translate-y-full after:bg-no-repeat after:w-2 after:h-2;
        &::after {
            background-image: url("data:image/svg+xml,%3Csvg width='9' height='5' viewBox='0 0 9 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.5 3.49691e-07L0.5 0L2.8359 3.50385C3.62754 4.69132 5.37246 4.69132 6.1641 3.50385L8.5 3.49691e-07Z' fill='%231B1B28'/%3E%3C/svg%3E");
        }
    }
}
.vc-header .vc-title {
    @apply text-dark;
}
.vc-weekday {
    @apply text-gray-300;
}
.vc-focus {
    @apply focus:shadow-none;
}
.vc-day-content {
    @apply hover:bg-blue hover:text-white;
}
.vc-highlight-content-solid.vc-blue {
    @apply bg-blue;
}
.vc-highlight-content-outline.vc-blue {
    @apply border border-blue;
}
.vc-highlight-content-light.vc-blue {
    @apply text-blue font-semibold;
}
</style>
