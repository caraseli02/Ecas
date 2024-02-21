<script setup lang="ts">
import { addDays, format } from 'date-fns'
import { PlusCircledIcon } from '@radix-icons/vue'
import { DatePickerRangeObject } from 'v-calendar/dist/types/src/use/datePicker'
import { ref } from 'vue'
import { cn } from '@/lib/utils'

const date = ref<DatePickerRangeObject | undefined>(undefined)

defineProps<{
  title: string
}>()
</script>

<template>
  <div :class="cn('grid gap-2 !ml-0', $attrs.class ?? '')">
    <UiPopover>
      <UiPopoverTrigger as-child>
        <UiButton 
        id="date"
        :variant="'outline'" 
        :class="cn('h-8 justify-start text-left font-normal border-dashed px-2 !ml-0')">
          <PlusCircledIcon class="mr-2 h-4 w-4" />
         {{ title }}
         <template v-if="date?.start && date.end">
         <UiSeparator orientation="vertical" class="mx-2 h-4" />
          <span class="text-xs text-neutral-700 bg-light-300 p-1 mr-2 rounded">
            {{ date.start ? format((date.start) as Date, 'dd-MM-yyyy') : '' }}
          </span>
          <span class="text-xs text-neutral-700 bg-light-300 p-1 rounded">
            {{ date.end ? format((date.end as Date), 'dd-MM-yyyy') : '' }}
          </span>
        </template>
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent class="w-auto p-0" :align="'end'">
        <UiCalendar v-model.range="date" :columns="2" />
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>
