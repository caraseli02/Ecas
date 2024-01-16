<template>
    <SkeletonLoader v-if="loading" class="w-[180px] h-7" />
    <div
        v-else
        class="capitalize rounded-md px-3 py-1 text-sm font-medium max-w-max bg-opacity-[0.15]"
        :class="[
            status === OrderStatus.AbandonedCheckout
                ? 'text-slate-500 bg-slate-500'
                : status === OrderStatus.AwaitingPayment || status === OrderStatus.AwaitingFulfillment
                ? 'text-[#FF8A00] bg-[#FF8A00]'
                : status === OrderStatus.Completed || status === OrderStatus.PaymentReceived
                ? 'text-[#00D395] bg-[#00D395]'
                : status === OrderStatus.PartiallyShipped
                ? 'text-blue-500 bg-blue-500'
                : status === OrderStatus.PartiallyRefunded || status === OrderStatus.Processing
                ? 'text-[#A460BC] bg-[#A460BC]'
                : 'text-rose-500 bg-rose-500',
        ]"
    >
        {{ status }}
    </div>
</template>
<script lang="ts">
import SkeletonLoader from '~/components/global/SkeletonLoader.vue';
import { OrderStatus } from '~/types';

export default defineComponent({
    name: 'OrderStatus',
    components: {
        SkeletonLoader,
    },
    props: ['status', 'loading'],
    computed: {
        OrderStatus() {
            return OrderStatus;
        },
    },
});
</script>
