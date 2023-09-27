<template>
    <div class="mb-6 min-h-[350px] md:mb-8">
        <div class="dashboardTable grid grid-cols-1 gap-1 rounded-t-lg overflow-x-auto scrollbar-thin"
            @scroll="handleScroll">
            <div class="grid grid-cols-[359px,154px,254px,244px,129px,148px,104px] items-center rounded-t-lg">
                <div class="p-4 pr-1.5 bg-[#F2F2F2] rounded-l-lg flex flex-col gap-4">
                    <SortAscDesc @sortChange="
                        nameOrder === 0 ? (nameOrder = 1) : (nameOrder = 0);
                    handleSortChange(emits, 'email', nameOrder);" :order="nameOrder" :title="'Name'" />
                    <DashboardSearch v-model="name" placeholder="Search name, email, country, discount" size="sm"
                        class="w-full" @input="handleFilterChange(activeFilters, emits, 'combinedName', $event)" />
                </div>
                <div class="relative p-4 pr-1.5 bg-[#F2F2F2] flex flex-col gap-4">
                    <SortAscDesc @sortChange="
                        accountOrder === 0 ? (accountOrder = 1) : (accountOrder = 0);
                    handleSortChange(emits, 'accountType', accountOrder);" :order="accountOrder" :title="'Account'" />
                    <CustomSelect @handleShow="handleShowAccountOptions" :selectedItem="account"
                        :optionsVisible="showAccountOptions" />
                </div>
                <div class="p-4 pr-1.5 bg-[#F2F2F2] flex flex-col gap-4">
                    <SortAscDesc @sortChange="
                        companyOrder === 0 ? (companyOrder = 1) : (companyOrder = 0);
                    handleSortChange(emits, 'companyName', companyOrder);" :order="companyOrder" :title="'Company'" />
                    <DashboardSearch v-model="company" placeholder="Search company" size="sm" class="w-full"
                        @input="handleFilterChange(activeFilters, emits, 'companyName', $event)" />
                </div>
                <div class="relative p-4 pr-1.5 bg-[#F2F2F2] flex flex-col gap-4">
                    <SortAscDesc @sortChange="
                        registeredOrder === 0 ? (registeredOrder = 1) : (registeredOrder = 0);
                    handleSortChange(emits, 'createdAt', registeredOrder);" :order="registeredOrder"
                        :title="'Registered'" />
                    <DatePickerButton :range="registered" :datePickerVisible="showRegisteredRange"
                        @showDatePicker="handleShowRegistered" />
                </div>
                <div class="relative p-4 pr-1.5 bg-[#F2F2F2] flex flex-col gap-4">
                    <SortAscDesc @sortChange="
                        spentOrder === 0 ? (spentOrder = 1) : (spentOrder = 0);
                    handleSortChange(emits, 'spent', spentOrder);" :order="spentOrder" :title="'Spent'" />
                    <FilterButton :rangeValue="spentValue" :rangeVisible="showSpentRange"
                        :textGrayCondition="!spent[0] && !spent[1]" :trackingWidestCondition="spent[0] || spent[1]"
                        @showSpentRange="handleShowSpentRange" customClasses="justify-between w-full" />
                </div>
                <div class="relative p-4 pr-1.5 bg-[#F2F2F2] flex flex-col gap-4">
                    <SortAscDesc @sortChange="
                        ordersCountOrder === 0 ? (ordersCountOrder = 1) : (ordersCountOrder = 0);
                    handleSortChange(emits, 'ordersCount', ordersCountOrder);" :order="ordersCountOrder"
                        :title="'Orders count'" />
                    <FilterButton :rangeValue="ordersCount" :rangeVisible="showOrdersRange"
                        :textGrayCondition="!ordersCount" :trackingWidestCondition="false"
                        @showSpentRange="handleShowOrdersRange" customClasses="justify-between w-full" />
                </div>
                <div class="p-4 pr-1.5 w-full rounded-r-lg bg-[#F2F2F2] self-stretch">
                    <div class="relative">
                        <div class="flex items-center mb-4">
                            <span class="text-sm leading-[1.43] font-medium"> Actions </span>
                        </div>
                    </div>
                </div>
            </div>
            <DashboardCustomersListItem v-for="(item, index) in items" :key="index" :item="item" :index="index"
                :is-scrolling="isScrolling" :loading="loading" />
        </div>
    </div>
    <Teleport to="body">
        <Transition name="fade-bottom">
            <CustomSelectDropdown v-if="showAccountOptions" v-click-outside="() => showAccountOptions = false"
                :items="accountOptions" :dropdownTop="accountDropdownTop" :dropdownLeft="accountDropdownLeft"
                :selectedItem="account" @handleSelection="(event: MouseEvent, item) => {
                    account = item.label;
                    showAccountOptions = false;
                    handleFilterChange(activeFilters, emits, 'accountType', item.value, true);
                }" :customClasses="'w-[163px]'" />
        </Transition>
        <Transition name="fade-bottom">
            <div v-if="showRegisteredRange" v-click-outside="() => (showRegisteredRange = false)"
                class="absolute z-10 -translate-x-full rounded-lg overflow-hidden shadow-m" :style="{
                    left: registeredDropdownLeft + 'px',
                    top: registeredDropdownTop + 'px',
                }">
                <DatePicker v-model.range="registered" borderless />
            </div>
        </Transition>
        <Transition name="fade-bottom">
            <RangeFilter v-if="showSpentRange" v-click-outside="() => (showSpentRange = false)" title="Spent" :range="spent"
                :dropdownLeft="spentRangeDropdownLeft" :dropdownTop="spentRangeDropdownTop" @cancel="showSpentRange = false"
                @apply="(buffer) => {
                    spent = buffer;
                    showSpentRange = false;
                    handleFilterChange(activeFilters, emits, 'spentFrom', buffer[0], true);
                    handleFilterChange(activeFilters, emits, 'spentTo', buffer[1], true);
                }" />
        </Transition>
        <Transition name="fade-bottom">
            <SliderFilter v-if="showOrdersRange" v-click-outside="() => (showOrdersRange = false)" title="Orders"
                :range="ordersCount" :dropdownLeft="ordersRangeDropdownLeft" :dropdownTop="ordersRangeDropdownTop"
                @cancel="showOrdersRange = false" @apply="(buffer) => {
                    ordersCount = buffer;
                    showOrdersRange = false;
                    handleFilterChange(activeFilters, emits, 'ordersCountFrom', buffer[0], true);
                    handleFilterChange(activeFilters, emits, 'ordersCountTo', buffer[1], true);
                }" />
        </Transition>
        <Transition name="fade">
            <RangeFilterMobile v-if="showSpentRange" title="Spent"
                :range="spent" @cancel="showSpentRange = false" @apply="(buffer) => {
                    spent = buffer;
                    showSpentRange = false;
                    handleFilterChange(activeFilters, emits, 'spentFrom', buffer[0], true);
                    handleFilterChange(activeFilters, emits, 'spentTo', buffer[1], true);
                }" />
        </Transition>
        <Transition name="fade">
            <SliderFilterMobile v-if="showOrdersRange" title="Orders"
                :range="ordersCount" @cancel="showOrdersRange = false" @apply="(buffer) => {
                    ordersCount = buffer;
                    showOrdersRange = false;
                    handleFilterChange(activeFilters, emits, 'ordersCountFrom', buffer[0], true);
                    handleFilterChange(activeFilters, emits, 'ordersCountTo', buffer[1], true);
                }" />
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { AccountType, DashboardCustomerTableItem } from '~~/types';
import ProfileIcon from '@/assets/icons/dashboard/profile.svg';
import SoleTraderIcon from '@/assets/icons/dashboard/sole-trader.svg';
import AgentIcon from '@/assets/icons/dashboard/agent.svg';
import BusinessIcon from '@/assets/icons/dashboard/business.svg';
import EyeIcon from '@/assets/icons/dashboard/eye.svg';
import { DatePicker } from 'v-calendar';
import { FilterInterface } from '~/model/dashboard/table/filters';
import { handleFilterChange, handleSortChange } from '~/services/dashboard/filter.service';
import Emitter from 'tiny-emitter/instance';
import { subDays } from 'date-fns';
import SortAscDesc from '~/components/shared/tables/micro/SortAscDesc.vue';
import CustomSelect from '~/components/shared/tables/micro/CustomSelect.vue';
import CustomSelectDropdown from '~/components/shared/tables/micro/CustomSelectDropdown.vue';
import DatePickerButton from '~/components/shared/tables/micro/DatePickerButton.vue';
import FilterButton from '~/components/shared/tables/micro/FilterButton.vue';
import RangeFilter from '~/components/shared/tables/micro/RangeFilter.vue';
import RangeFilterMobile from '~/components/shared/tables/micro/RangeFilterMobile.vue';
import SliderFilter from '~/components/shared/tables/micro/SliderFilter.vue';
import SliderFilterMobile from '~/components/shared/tables/micro/SliderFilterMobile.vue';

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

const accountOptions = [
    {
        label: 'Personal',
        value: AccountType.Personal,
        iconType: ProfileIcon,
    },
    {
        label: 'Sole Trader',
        value: AccountType.SoleTrader,
        iconType: SoleTraderIcon,
    },
    {
        label: 'Agent',
        value: AccountType.Agent,
        iconType: AgentIcon,
    },
    {
        label: 'Business',
        value: AccountType.Business,
        iconType: BusinessIcon,
    },
    {
        label: 'View All',
        value: '',
        iconType: EyeIcon,
    },];

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
        @apply bg-[#1B1B28] border-none rounded px-3 py-1 text-sm leading-[1.43] tracking-[-0.02em] text-white font-normal left-1/2 -translate-x-1/2 -translate-y-3 before:hidden after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:translate-y-full after:bg-no-repeat after:w-2 after:h-2;

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
