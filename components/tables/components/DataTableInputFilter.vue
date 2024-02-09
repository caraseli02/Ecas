<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { type Order } from '../data/schema'
import {PlusCircledIcon} from '@radix-icons/vue'

interface DataTableInputFilter {
  column?: Column<Order, any>
  title?: string
  modelValue: string
}

defineProps<DataTableInputFilter>()
const emit = defineEmits<{
  onInput: [value: string]
}>()

</script>

<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <UiButton variant="outline" size="sm" class="h-8 border-dashed">
        <PlusCircledIcon class="mr-2 h-4 w-4" />
        {{ title }}
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-[215px] flex flex-col gap-2 p-4" align="start">
      <UiInput
        placeholder="Filter orders..."
        :model-value=modelValue
        class="h-8 w-fit"
        @input="emit('onInput',$event.target.value)"
      />
      <UiButton variant="outline" size="sm" class="h-8">
        Apply
      </UiButton>
    </UiPopoverContent>
  </UiPopover>
</template>
