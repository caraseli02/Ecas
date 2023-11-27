<template>
  <SkeletonLoader v-if="loading" class="w-[94px] h-6"/>
  <template v-else>
    <button class="uppercase hover:text-blue transition duration-300">#{{ item.id }}</button>
    <Tooltip theme="black" :position="index === 0 ? 'bottom' : 'top'">
      <MessageIcon v-if="item.note" class="w-4 h-4 text-gray-300 transition-colors duration-300 hover:text-blue"/>
      <template #content>
        <span>This order has a note</span>
      </template>
    </Tooltip>
  </template>
</template>
<script lang="ts">
import SkeletonLoader from '~/components/global/SkeletonLoader.vue';
import MessageIcon from '@/assets/icons/dashboard/orders/message.svg';
import Tooltip from '~/components/global/Tooltip.vue';

export default defineComponent({
  name: 'OrderId',
  components: {
    SkeletonLoader,
    MessageIcon,
    Tooltip,
  },
  props: ['item', 'loading'],
});
</script>