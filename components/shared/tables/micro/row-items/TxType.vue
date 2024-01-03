<template>
    <SkeletonLoader v-if="loading" class="w-20 h-6" />
    <template v-else>
        <div class="w-2 h-2 rounded-full mr-2" :class="item.type === PaymentTypeEnum.Card ? 'bg-[#00D395]' : 'bg-blue-500'" />
        <span
            class="text-sm font-medium leading-[1.43] capitalize"
            :class="item.type === PaymentTypeEnum.Card ? 'text-[#00D395]' : 'text-blue-500'"
            >{{ getPaymentTypeById(item.type) }}</span
        >
    </template>
</template>
<script lang="ts">
import SkeletonLoader from '~/components/global/SkeletonLoader.vue';
import { getPaymentTypeById, PaymentTypeEnum } from '~/types';

export default defineComponent({
    name: 'TxType',
    components: {
        SkeletonLoader,
    },
    props: ['item', 'loading'],
    computed: {
        PaymentTypeEnum() {
            return PaymentTypeEnum;
        },
    },
    methods: { getPaymentTypeById },
});
</script>
