<template>
  <div>
    <button
      class="flex items-center justify-between relative w-full border rounded-lg px-3 py-[7px] bg-white transition-colors duration-300"
      :class="[!selectedItem ? 'text-gray-100' : '', optionsVisible ? 'border-blue' : 'border-border']"
      @click="handleShow">
      <span class="text-sm flex-shrink-0 mr-1">
        {{ selectedItem || 'Select' }}
      </span>
      <ChevronDownIcon class="w-5 h-5 text-gray-300 flex-shrink-0 rounded-full"
        :class="[optionsVisible ? 'rotate-180' : '']" />
    </button>
  </div>
</template>
<script lang="ts">
import ChevronDownIcon from '@/assets/icons/dashboard/chevron-down.svg';

export default defineComponent({
  name: 'CustomSelect',
  props: ['selectedItem', 'optionsVisible'],
  components: {
    ChevronDownIcon,
  },
  methods: {
    handleShow(event: MouseEvent) {
      this.$emit('handleShow', event);
    },
  },
});
</script>