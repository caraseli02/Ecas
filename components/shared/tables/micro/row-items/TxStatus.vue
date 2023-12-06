<template>
    <SkeletonLoader v-if="loading" class="w-[120px] h-6" />
    <template v-else>
        <div
            class="w-2 h-2 rounded-full mr-2"
            :class="
                item.status === PaymentStatusEnum.Paid
                    ? 'bg-[#00D395]'
                    : item.status === PaymentStatusEnum.Pending
                    ? 'bg-[#FF8A00]'
                    : 'bg-[#FA4B4B]'
            "
        />
        <span
            class="text-sm font-medium leading-[1.43] capitalize"
            :class="
                item.status === PaymentStatusEnum.Paid
                    ? 'text-[#00D395]'
                    : item.status === PaymentStatusEnum.Pending
                    ? 'text-[#FF8A00]'
                    : 'text-[#FA4B4B]'
            "
        >
            {{ getPaymentStatusById(item.status) }}</span
        >
    </template>
</template>
<script lang="ts">
import SkeletonLoader from '~/components/global/SkeletonLoader.vue';
import { getPaymentStatusById, PaymentStatusEnum } from '~/types';

export default defineComponent({
    name: 'TxStatus',
    components: {
        SkeletonLoader,
    },
    props: ['item', 'loading'],
    computed: {
        PaymentStatusEnum() {
            return PaymentStatusEnum;
        },
    },
    methods: { getPaymentStatusById },
});
</script>