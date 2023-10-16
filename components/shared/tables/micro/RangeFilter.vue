<template>
  <div class="absolute z-10 -translate-x-full grid grid-cols-1 gap-1 rounded-lg bg-white p-6 w-[358px] shadow-m" :style="{
    left: dropdownLeft + 'px',
    top: dropdownTop + 'px',
  }">
    <div class="text-sm leading-[1.71] font-semibold mb-8">{{ title }} range</div>
    <div class="mb-16">
      <div class="flex items-end gap-3 mb-6">
        <label>
          <div class="text-sm leading-[1.43] text-gray-300 mb-4">From</div>
          <div class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]">
            <span class="font-medium mr-1">$</span>
            <input v-model.number="buffer[0]" type="number" class="bg-transparent py-2 w-full focus:outline-none" />
          </div>
        </label>
        <div class="text-sm leading-[1.43] mb-3">-</div>
        <label>
          <div class="text-sm leading-[1.43] text-gray-300 mb-4">To</div>
          <div class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]">
            <span class="font-medium mr-1">$</span>
            <input v-model.number="buffer[1]" type="number" class="bg-transparent py-2 w-full focus:outline-none" />
          </div>
        </label>
      </div>
      <div class="flex items-center justify-between mb-3">
        <div class="text-sm leading-[1.43] font-medium">${{ buffer[0] }}</div>
        <div class="text-sm leading-[1.43] font-medium">${{ buffer[1] }}</div>
      </div>
      <Slider v-model="buffer" :min="0" :max="100000" :step="10" :tooltips="false" class="rangeSlider"
        @slide="buffer = $event" />
    </div>
    <div class="grid grid-cols-[auto,1fr] gap-4">
      <button class="flex px-8 py-2 rounded-lg text-sm bg-gray-200 leading-[1.67] h-10 text-gray-300 font-medium"
        @click="cancel">
        Cancel
      </button>
      <button
        class="flex justify-center px-8 py-2 text-sm w-full rounded-lg bg-blue leading-[1.67] h-10 text-white font-medium"
        @click="apply">
        Apply Filter
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Slider from '@vueform/slider';

export default defineComponent({
  name: 'RangeFilter',
  props: ['title', 'range', 'dropdownLeft', 'dropdownTop'],
  components: {
    Slider,
  },
  data() {
    return {
      buffer: this.range,
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    apply() {
      this.$emit('apply', this.buffer);
    },
  },
});
</script>