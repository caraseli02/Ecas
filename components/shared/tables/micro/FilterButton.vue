<template>
  <div>
    <button
      class="flex items-center relative border rounded-lg px-4 py-[7px] bg-white transition-colors duration-300"
      :class="[textGrayCondition ? 'text-gray-100' : '',rangeVisible ? 'border-blue' : 'border-border', customClasses]"
      @click="handleShow">
      <span class="text-sm truncate flex-shrink-0 mr-1" :class="[trackingWidestCondition ? '-tracking-widest' : '']">
        {{ rangeValue || 'Filter' }}
      </span>
      <FilterIcon class="w-5 h-5 text-gray-300 flex-shrink-0" />
    </button>
  </div>
</template>
<script lang="ts">
import FilterIcon from '@/assets/icons/dashboard/filter-2.svg';

export default defineComponent({
  name: 'FilterButton',
  props: ['rangeValue', 'rangeVisible', 'textGrayCondition', 'trackingWidestCondition', 'customClasses'],
  components: {
    FilterIcon,
  },
  methods: {
    handleShow(event: MouseEvent) {
      this.$emit('showSpentRange', event);
    },
  },
});
</script>