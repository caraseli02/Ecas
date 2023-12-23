<template>
  <div class="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center md:hidden">
    <div class="relative z-10 w-[358px] max-w-[calc(100vw-32px)] p-6 bg-white rounded-xl shadow-xs">
      <div class="grid grid-cols-1 gap-1">
        <div class="flex items-center justify-between mb-8">
          <div class="text-sm leading-[1.71] font-semibold">{{ title }} range</div>
          <button class="w-8 h-8 bg-gray-100 flex items-center justify-center text-slate-500 rounded-lg"
            @click="cancel">
            <XIcon class="w-6 h-6" />
          </button>
        </div>
        <div class="mb-16">
          <div class="flex items-end gap-3 mb-6">
            <label>
              <div class="text-sm leading-[1.43] text-slate-500 mb-4">From</div>
              <div class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]">
                <span class="font-medium mr-1">$</span>
                <input v-model.number="buffer[0]" type="number"
                  class="bg-transparent py-2 w-full focus:outline-none" />
              </div>
            </label>
            <div class="text-sm leading-[1.43] mb-3">-</div>
            <label>
              <div class="text-sm leading-[1.43] text-slate-500 mb-4">To</div>
              <div class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]">
                <span class="font-medium mr-1">$</span>
                <input v-model.number="buffer[1]" type="number"
                  class="bg-transparent py-2 w-full focus:outline-none" />
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
          <button class="flex px-8 py-2 rounded-lg text-sm bg-gray-100 leading-[1.67] h-10 text-slate-500 font-medium"
            @click="cancel">
            Cancel
          </button>
          <button
            class="flex justify-center px-8 py-2 text-sm w-full rounded-lg bg-blue-500 leading-[1.67] h-10 text-white font-medium"
            @click="apply">
            Apply Filter
          </button>
        </div>
      </div>
    </div>
    <div class="absolute top-0 left-0 w-full h-full bg-[#2F3241]/10 backdrop-blur-[7.5px] cursor-pointer"
      @click="showSpentRange = false" />
  </div>
</template>
<script lang="ts">
import Slider from '@vueform/slider';
import XIcon from '@/assets/icons/dashboard/x.svg';

export default defineComponent({
  name: 'RangeFilterMobile',
  props: ['title', 'range'],
  components: {
    Slider,
    XIcon,
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
