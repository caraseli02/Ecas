<template>
  <SkeletonLoader v-if="loading" class="w-20 h-6" />
  <template v-else>
    <div class="w-2 h-2 rounded-full mr-2" :class="item.type === 'debit' ? 'bg-[#00D395]' : 'bg-blue'" />
    <span class="text-sm font-medium leading-[1.43] capitalize"
      :class="item.type === 'debit' ? 'text-[#00D395]' : 'text-blue'">{{ item.type }}</span>
  </template>
</template>
<script lang="ts">
import SkeletonLoader from '~/components/global/SkeletonLoader.vue';

export default defineComponent({
  name: 'TxType',
  props: ['item', 'loading'],
  components: {
    SkeletonLoader,
  },
});
</script>