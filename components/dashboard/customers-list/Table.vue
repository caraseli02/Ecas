<template>
    <CustomTable
        :items="items"
        :loading="loading"
        :fields="fields"
        :custom-item="CustomItem"
        :filters="true"
        :actions-menu-type="actionsMenuType"
        :actions-header="true"
        :name="name"
        :account="account"
        :company="company"
        :registered="registered"
        :spent="spent"
        :orders-count="ordersCount"
        :name-order="nameOrder"
        :account-order="accountOrder"
        :company-order="companyOrder"
        :registered-order="registeredOrder"
        :spent-order="spentOrder"
        :orders-count-order="ordersCountOrder"
        :name-and-profile-class="'w-[calc(100%-60px)]'"
        :show-avatar="true"
        :show-lock="true"
        :show-discount="true"
        :show-flag="true"
        @nameOrderChange="
            nameOrder === 0 ? (nameOrder = 1) : (nameOrder = 0);
            handleSortChange(emits, 'email', nameOrder);
        "
        @accountOrderChange="
            accountOrder === 0 ? (accountOrder = 1) : (accountOrder = 0);
            handleSortChange(emits, 'accountType', accountOrder);
        "
        @companyOrderChange="
            companyOrder === 0 ? (companyOrder = 1) : (companyOrder = 0);
            handleSortChange(emits, 'companyName', companyOrder);
        "
        @registeredOrderChange="
            registeredOrder === 0 ? (registeredOrder = 1) : (registeredOrder = 0);
            handleSortChange(emits, 'createdAt', registeredOrder);
        "
        @spentOrderChange="
            spentOrder === 0 ? (spentOrder = 1) : (spentOrder = 0);
            handleSortChange(emits, 'spent', spentOrder);
        "
        @ordersCountOrderChange="
            ordersCountOrder === 0 ? (ordersCountOrder = 1) : (ordersCountOrder = 0);
            handleSortChange(emits, 'ordersCount', ordersCountOrder);
        "
        @nameFilterChange="handleFilterChange(activeFilters, emits, 'combinedName', $event, false)"
        @accountFilterChange="(event: MouseEvent, item) => {
            account = item.label;
            handleFilterChange(activeFilters, emits, 'accountType', item.value, true);
        }"
        @companyFilterChange="handleFilterChange(activeFilters, emits, 'companyName', $event, false)"
        @dateFilterChange="
            (buffer) => {
                registered = buffer;
                handleFilterChange(activeFilters, emits, 'startDate', formattedDate(buffer.start), true);
                handleFilterChange(activeFilters, emits, 'endDate', formattedDate(buffer.end), true);
            }
        "
        @spentFilterChange="
            (buffer) => {
                spent = buffer;
                handleFilterChange(activeFilters, emits, 'spentFrom', buffer[0], true);
                handleFilterChange(activeFilters, emits, 'spentTo', buffer[1], true);
            }
        "
        @ordersFilterChange="
            (buffer) => {
                ordersCount = buffer;
                handleFilterChange(activeFilters, emits, 'ordersCountFrom', buffer, true);
                handleFilterChange(activeFilters, emits, 'ordersCountTo', 'any', true);
            }
        "
    />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import CustomTable from '~/components/shared/tables/CustomTable.vue';
import CustomItem from '~/components/shared/tables/CustomItem.vue';
import { DashboardCustomerTableItem } from '~~/types';
import { FilterInterface } from '~/model/dashboard/table/filters';
import { formattedDate, handleFilterChange, handleSortChange } from '~/services/dashboard/filter.service';
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

const fields = ['nameAndProfile', 'accountType', 'companyName', 'registerDate', 'spentAmount', 'ordersCount'];

const actionsMenuType = 'customers-list';

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
const spent = ref([0, 0]);
const spentOrder: number = ref(0);
const ordersCount = ref(0);
const ordersCountOrder: number = ref(0);

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
        @apply bg-gray-100;
    }

    .slider-connect {
        @apply bg-blue-500 h-[9px] -top-px;
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
    @apply text-slate-500;
}

.vc-focus {
    @apply focus:shadow-none;
}

.vc-day-content {
    @apply hover:bg-blue-500 hover:text-white;
}

.vc-highlight-content-solid.vc-blue {
    @apply bg-blue-500;
}

.vc-highlight-content-outline.vc-blue {
    @apply border border-blue;
}

.vc-highlight-content-light.vc-blue {
    @apply text-blue-500 font-semibold;
}
</style>
