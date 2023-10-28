<template>
    <SkeletonLoader v-if="loading" class="w-[109px] h-6" />
    <div
        v-else
        class="capitalize rounded-md px-3 py-1 text-sm font-medium max-w-max bg-opacity-[0.15]"
        :class="[
            status === PaymentStatusEnum.Paid
                ? 'text-[#00D395] bg-[#00D395]'
                : status === PaymentStatusEnum.Pending
                ? 'text-[#FF8A00] bg-[#FF8A00]'
                : status === PaymentStatusEnum.Canceled || status === PaymentStatusEnum.Declined
                ? 'text-[#FA4B4B] bg-[#FA4B4B]'
                : 'text-blue bg-blue',
        ]"
    >
        {{ getPaymentStatusById(status) }}
    </div>
</template>
<script lang="ts">
import SkeletonLoader from '~/components/global/SkeletonLoader.vue';
import { getPaymentStatusById, PaymentStatusEnum } from '~/types';

export default defineComponent({
    name: 'PaymentStatus',
    components: {
        SkeletonLoader,
    },
    props: ['status', 'loading'],
    computed: {
        PaymentStatusEnum() {
            return PaymentStatusEnum;
        },
    },
    methods: { getPaymentStatusById },
});
</script>