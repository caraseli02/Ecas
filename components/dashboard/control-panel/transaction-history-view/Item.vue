<template>
    <div class="grid grid-cols-[50px,191px,191px,191px,191px,191px,191px,minmax(196px,1fr)] items-center">
        <div class="flex items-center justify-center p-4">
            <CustomCheckBox :item="item" @check="$emit('check')" />
        </div>
        <div class="px-2 py-4 text-sm font-medium leading-[1.71]">
            <OrderId :item="item" :loading="loading"/>
        </div>
        <div class="px-2 py-4 text-sm font-medium leading-[1.71] text-blue">
            <TextBox :text="item.invoiceId" :loading="loading" />
        </div>
        <div class="px-2 py-4 text-sm font-medium leading-[1.71]">
            <TextBox :text="item.amount" :loading="loading" />
        </div>
        <div class="flex items-center px-2 py-4 text-sm font-medium leading-[1.71]">
            <TxType :item="item" :loading="loading" />
        </div>
        <div class="px-2 py-4 text-sm leading-[1.71]">
            <TextBox :text="'21 Sep 2023, 18:25'" :loading="loading" />
        </div>
        <div class="flex items-center px-2 py-4 text-sm font-medium leading-[1.71]">
            <TxStatus :item="item" :loading="loading" />
        </div>
        <div class="flex items-center justify-end p-4 pr-[26px]">
            <ActionsMenu :loading="loading" :index="index" :downloadButton="true" :txtDownload="'Download'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { DashboardControlPanelTransactionHistoryItem } from '~/types';
import OrderId from '~/components/shared/tables/micro/row-items/OrderId.vue';
import CustomCheckBox from '~/components/shared/tables/micro/row-items/CustomCheckBox.vue';
import TxType from '~/components/shared/tables/micro/row-items/TxType.vue';
import TxStatus from '~/components/shared/tables/micro/row-items/TxStatus.vue';
import ActionsMenu from '~/components/shared/tables/micro/row-items/ActionsMenu.vue';
import TextBox from '~/components/shared/tables/micro/row-items/TextBox.vue';

defineProps({
    item: {
        type: Object as PropType<DashboardControlPanelTransactionHistoryItem>,
        required: true,
    },
    index: {
        type: Number,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
});
</script>
