<template>
  <div class="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center md:hidden">
    <div class="relative z-10 w-[358px] max-w-[calc(100vw-32px)] p-4 bg-white rounded-xl shadow-xs md:p-6">
      <div class="grid grid-cols-1 gap-1">
        <div class="flex items-center justify-between mb-[76px]">
          <div class="text-sm leading-[1.71] font-semibold">{{ title }} range</div>
          <button class="w-8 h-8 bg-gray-100 flex items-center justify-center text-slate-500 rounded-lg ml-auto"
            @click="cancel">
            <XIcon class="w-6 h-6" />
          </button>
        </div>
        <div class="mb-14">
          <Slider v-model="buffer" :min="0" :max="1000" :step="5" :format="(val: number) => {
            return `${val === 1000 ? 'Any' : val + ' +'}`;
          }
            " class="rangeSlider" />
          <div class="flex items-center justify-between">
            <div class="text-sm leading-[1.43] font-medium">0</div>
            <div class="text-sm leading-[1.43] font-medium">Any</div>
          </div>
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
      @click="cancel" />
  </div>
</template>
<script lang="ts">
import Slider from '@vueform/slider';
import XIcon from '@/assets/icons/dashboard/x.svg';

export default defineComponent({
  name: 'SliderFilterMobile',
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
<style scoped>
.rangeSlider {
    @apply h-2 mb-3 px-2;

    .slider-base {
        @apply bg-gray-100;
    }

    .slider-connect {
        @apply bg-blue-500 h-[9px] -top-px;
    }

    .slider-handle {
        @apply w-6 h-6 -top-2;
        box-shadow: 0px 0px 6px rgba(51, 51, 51, 0.2);
        border: 1px solid #d4d4d4;
    }

    .slider-tooltip {
        @apply bg-[#1B1B28] border-none rounded px-3 py-1 text-sm leading-[1.43] tracking-[-0.02em] text-white font-normal left-1/2 -translate-x-1/2 -translate-y-3 before:hidden after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:translate-y-full after:bg-no-repeat after:w-2 after:h-2;

        &::after {
            background-image: url("data:image/svg+xml,%3Csvg width='9' height='5' viewBox='0 0 9 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.5 3.49691e-07L0.5 0L2.8359 3.50385C3.62754 4.69132 5.37246 4.69132 6.1641 3.50385L8.5 3.49691e-07Z' fill='%231B1B28'/%3E%3C/svg%3E");
        }
    }
}

</style>
