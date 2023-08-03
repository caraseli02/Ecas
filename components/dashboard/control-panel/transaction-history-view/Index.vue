<template>
    <div>
        <h2 class="text-xl leading-[1.4] font-semibold mb-9">Transaction History</h2>
        <DashboardCustomersListPagination
            :at-page="atPage"
            :per-page="perPage"
            :items-count="listItems.length"
            position="top"
            class="flex-col mb-6 lg:mb-9"
            @page-change="atPage = $event"
            @per-page-change="perPage = $event"
        />
        <DashboardControlPanelTransactionHistoryViewTable :items="visibleItemsFiltered" :loading="loading" />
        <DashboardCustomersListPagination
            :at-page="atPage"
            :per-page="perPage"
            :items-count="listItems.length"
            position="bottom"
            class="flex-col-reverse"
            @page-change="atPage = $event"
            @per-page-change="perPage = $event"
        />
    </div>
</template>

<script setup lang="ts">
import { DashboardControlPanelTransactionHistoryItem } from '~~/types';

const atPage = ref(1);
const perPage = ref(10);
const loading = ref(false);

const listItems = ref<DashboardControlPanelTransactionHistoryItem[]>([
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `€ 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'pending',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `LEI 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'declined',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `€ 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'pending',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `LEI 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'declined',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `€ 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'pending',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `LEI 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'declined',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `€ 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'pending',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `LEI 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'declined',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `€ 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'pending',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `$ 138,000.77`,
        type: 'debit',
        date: 0,
        status: 'success',
    },
    {
        id: '1V9VGU48XV',
        invoiceId: 'ECS#00098',
        amount: `LEI 138,000.77`,
        type: 'credit',
        date: 0,
        status: 'declined',
    },
]);

const visibleItemsFiltered = computed(() => {
    return [...listItems.value].filter((e) => {
        return true;
    });
});
</script>
