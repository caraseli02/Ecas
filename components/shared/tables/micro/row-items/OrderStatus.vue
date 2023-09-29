<template>
  <SkeletonLoader v-if="loading" class="w-[180px] h-7" />
  <div v-else class="capitalize rounded-md px-3 py-1 text-sm font-medium max-w-max bg-opacity-[0.15]" :class="[
    status === 'abandoned-checkout'
      ? 'text-gray-300 bg-gray-300'
      : status === 'awaiting-payment' || status === 'awaiting-fulfillment'
        ? 'text-[#FF8A00] bg-[#FF8A00]'
        : status === 'completed' || status === 'payment-received'
          ? 'text-[#00D395] bg-[#00D395]'
          : status === 'partially-shipped'
            ? 'text-blue bg-blue'
            : status === 'partially-refunded' || status === 'processing'
              ? 'text-[#A460BC] bg-[#A460BC]'
              : 'text-[#FA4B4B] bg-[#FA4B4B]',
  ]">
    {{ status.replace(/-/g, ' ') }}
  </div>
</template>
<script lang="ts">
import SkeletonLoader from '~/components/global/SkeletonLoader.vue';

export default defineComponent({
  name: 'OrderStatus',
  props: ['status', 'loading'],
  components: {
    SkeletonLoader,
  },
});
</script>