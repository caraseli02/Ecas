<template>
  <SkeletonLoader v-if="loading" class="w-[120px] h-6" />
  <template v-else>
    <div class="w-2 h-2 rounded-full mr-2"
      :class="item.status === 'success' ? 'bg-[#00D395]' : item.status === 'pending' ? 'bg-[#FF8A00]' : 'bg-[#FA4B4B]'" />
    <span class="text-sm font-medium leading-[1.43] capitalize"
      :class="item.status === 'success' ? 'text-[#00D395]' : item.status === 'pending' ? 'text-[#FF8A00]' : 'text-[#FA4B4B]'">{{
        item.status }}</span>
  </template>
</template>
<script lang="ts">
import SkeletonLoader from '~/components/global/SkeletonLoader.vue';

export default defineComponent({
  name: 'TxStatus',
  props: ['item', 'loading'],
  components: {
    SkeletonLoader,
  },
});
</script>