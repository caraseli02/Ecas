<template>
  <SkeletonLoader v-if="loading" class="w-[109px] h-6" />
  <div v-else class="capitalize rounded-md px-3 py-1 text-sm font-medium max-w-max bg-opacity-[0.15]" :class="[
    status === 'paid'
      ? 'text-[#00D395] bg-[#00D395]'
      : status === 'pending'
        ? 'text-[#FF8A00] bg-[#FF8A00]'
        : status === 'canceled' || status === 'declined'
          ? 'text-[#FA4B4B] bg-[#FA4B4B]'
          : 'text-blue bg-blue',
  ]">
    {{ status.replace(/-/g, ' ') }}
  </div>
</template>
<script lang="ts">
import SkeletonLoader from '~/components/global/SkeletonLoader.vue';

export default defineComponent({
  name: 'PaymentStatus',
  props: ['status', 'loading'],
  components: {
    SkeletonLoader,
  },
});
</script>