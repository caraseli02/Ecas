<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { type Order } from './data/schema'
import { PlusCircledIcon } from '@radix-icons/vue'
import { PopoverClose } from 'radix-vue';
interface DataTableInputFilter {
  column?: Column<Order, any>
  title?: string
  modelValue: string
}

defineProps<DataTableInputFilter>()
const emit = defineEmits<{
  onInput: [value: string]
}>()

const cancel = () => {
  range.value = [0, 0]
}

const apply = () => {
  console.log('cancel');
}

const range = ref([0,0])
</script>

<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <UiButton variant="outline" size="sm" class="!ml-0 border-dashed text-neutral-700">
        <PlusCircledIcon class="mr-2 h-4 w-4  text-neutral-700" />
        {{ title }}
  <!-- Check if either min or max range values are greater than 0 -->
        <template v-if="range[0] > 0 || range[1] > 0">
          <UiSeparator orientation="vertical" class="mx-2 h-4" />
          <!-- Badge for Min -->
          <UiBadge
            v-if="range[0] > 0"
            variant="secondary"
            class="rounded bg-light-300 px-1 font-normal mr-1"
          >
            Min: {{ range[0] }}
          </UiBadge>
          <!-- Badge for Max -->
          <UiBadge
            v-if="range[1] > 0"
            variant="secondary"
            class="rounded bg-light-300 px-1 font-normal"
          >
            Max: {{ range[1] }}
          </UiBadge>
        </template>
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-[256px] flex gap-4 p-0 justify-between" align="start">
      <div class="grid grid-cols-1 gap-5 rounded-lg bg-white p-4 px-3  w-[256px] shadow-xs">
          <div class="flex items-end gap-3">
            <label>
              <div class="flex items-center border border-gray-300 rounded-lg pl-3 text-sm leading-[1.71]">
                <span class="font-medium mr-1">$</span>
                <input v-model.number="range[0]" type="number" class="bg-transparent py-2 w-full focus:outline-none" />
              </div>
            </label>
            <div class="text-sm leading-[1.43] mb-3">-</div>
            <label>
              <div class="flex items-center border border-gray-300 rounded-lg pl-3 text-sm leading-[1.71]">
                <span class="font-medium mr-1">$</span>
                <input v-model.number="range[1]" type="number" class="bg-transparent py-2 w-full focus:outline-none" />
              </div>
            </label>
          </div>
          <section>
          <div class="flex items-center justify-between mb-3">
            <div class="text-sm leading-[1.43] font-medium">${{ range[0] }}</div>
            <div class="text-sm leading-[1.43] font-medium">${{ range[1] }}</div>
          </div>
          <UiSlider
v-model="range" :min="0" :max="100000" :step="10" :tooltips="false" class="rangeSlider"
            @slide="range = $event" />
          </section>
        <div class="grid grid-cols-[auto,1fr] gap-4">
          <button
class="flex px-4 py-2 rounded-lg text-sm bg-gray-100 leading-[1.67] h-10 text-slate-500 font-medium"
            @click="cancel">
            Clear Filter
          </button>
          <PopoverClose class="w-fit" as-child>
            <button
              class="flex justify-center px-8 py-2 text-sm w-full rounded-lg bg-blue-500 leading-[1.67] h-10 text-white font-medium"
              @click="apply">
              Apply
            </button>
          </PopoverClose>
        </div>
      </div>
    </UiPopoverContent>
  </UiPopover>
</template>
