<template>
    <SkeletonLoader v-if="loading" class="w-[140px] h-7" />
    <div
        v-else
        class="capitalize rounded-md px-3 py-1 text-sm font-medium max-w-max bg-opacity-[0.15]"
        :class="[
            item.type === OrderType.Stock
                ? 'text-[#006D4D] bg-[#00D395]'
                : item.type === OrderType.Back
                ? 'text-[#FF8A00] bg-[#FF8A00]'
                : 'text-[#023F7E] bg-blue-500',
        ]"
    >
        {{ getOrderById(item.type) + ' order' }}
    </div>
</template>
<script lang="ts">
import SkeletonLoader from '~/components/global/SkeletonLoader.vue';
import { getOrderById, OrderType } from '~/types';

export default defineComponent({
    name: 'OrderType',
    components: {
        SkeletonLoader,
    },
    props: ['item', 'loading'],
    computed: {
        OrderType() {
            return OrderType;
        },
    },
    methods: { getOrderById },
});
</script>
