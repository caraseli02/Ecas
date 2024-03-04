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
            class="rounded bg-light-300 px-1 py-[3px] font-normal mr-1"
          >
            Min: {{ range[0] }}
          </UiBadge>
          <!-- Badge for Max -->
          <UiBadge
            v-if="range[1] > 0"
            variant="secondary"
            class="rounded bg-light-300 px-1 py-[3px] font-normal"
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
              <div class="flex items-center border border-gray-300 rounded-lg pl-3 text-[14px] leading-4 h-8">
                <span class="font-medium mr-1">$</span>
                <input v-model.number="range[0]" type="number" class=" bg-transparent py-2 w-full focus:outline-none" />
              </div>
            </label>
            <div class="">-</div>
            <label>
              <div class="flex items-center border border-gray-300 rounded-lg pl-3 text-[14px] leading-4 h-8">
                <span class="font-medium mr-1">$</span>
                <input v-model.number="range[1]" type="number" class=" bg-transparent py-2 w-full focus:outline-none" />
              </div>
            </label>
          </div>
          <section class="h-12">
            <div class="flex items-center justify-between mb-3">
              <div class="text-sm leading-[1.43] font-medium">${{ range[0] }}</div>
              <div class="text-sm leading-[1.43] font-medium">${{ range[1] }}</div>
            </div>
            <UiSlider
  v-model="range" :min="0" :max="100000" :step="10" :tooltips="false" class="rangeSlider"
              @slide="range = $event" />
          </section>
        <div class="flex justify-between items-center">
          <UiButton
            variant="secondary"
            size="xs"
            @click="cancel">
            Clear Filter
          </UiButton>
          <PopoverClose class="w-fit" as-child>
            <UiButton
              size="xs"
              @click="apply">
              Apply
            </UiButton>
          </PopoverClose>
        </div>
      </div>
    </UiPopoverContent>
  </UiPopover>
</template>
