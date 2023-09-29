
import SkeletonLoaderVue from '~/components/global/SkeletonLoader.vue';
<template>
  <SkeletonLoader v-if="loading" class="w-[140px] h-7" />
  <div v-else class="capitalize rounded-md px-3 py-1 text-sm font-medium max-w-max bg-opacity-[0.15]" :class="[
    item.type === 'stock-order'
      ? 'text-[#006D4D] bg-[#00D395]'
      : item.type === 'backorder'
        ? 'text-[#FF8A00] bg-[#FF8A00]'
        : 'text-[#023F7E] bg-blue',
  ]">
    {{ item.type.replace(/-/g, ' ') }}
  </div>
</template>
<script lang="ts">
import SkeletonLoader from '~/components/global/SkeletonLoader.vue';

export default defineComponent({
  name: 'OrderType',
  props: ['item', 'loading'],
  components: {
    SkeletonLoader,
  },
});
</script>