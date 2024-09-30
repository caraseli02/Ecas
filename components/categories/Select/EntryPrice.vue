<script setup lang="ts">
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'

import { cn } from '@/lib/utils'

const frameworks = [
  { value: '$0.5 - $0.99', label: 'EP-1' },
  { value: '$1.5 - $1.99', label: 'EP-2' },
  { value: '$10.5 - $10.99', label: 'EP-3' },
  { value: '$100.5 - $100.99', label: 'EP-4' },
  { value: '$1000.5 - $1000.99', label: 'EP-5' },
]

const open = ref(false)
const value = ref('')

defineProps<{
  title: string
}>()

</script>

<template>
  <section class="flex flex-col gap-1">
    <span class="text-grey-600 text-sm">{{ title }}</span>
    <UiPopover v-model:open="open" class="w-full">
      <UiPopoverTrigger as-child>
        <UiButton variant="outline" role="combobox" :aria-expanded="open" class="w-full justify-between">
          {{ value
            ? frameworks.find((framework) => framework.value === value)?.label
            : `Select ${title} Template` }}
          <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent disabled-portal class="w-full p-0">
        <UiCommand class="w-full">
          <UiCommandInput class="h-9" placeholder="Search framework..." />
          <UiCommandEmpty>No framework found.</UiCommandEmpty>
          <UiCommandList>
            <UiCommandGroup>
              <UiCommandItem
v-for="framework in frameworks" :key="framework.value" class="flex justify-between item-center w-full" :value="framework.value" @select="(ev) => {
                if (typeof ev.detail.value === 'string') {
                  value = ev.detail.value
                }
                open = false
              }">
                {{ framework.label }}
                <div class="flex items-center gap-1 p-0.5">
                <UiBadge class="bg-light-300" variant="secondary">{{ framework.value }}</UiBadge>
                <CheckIcon
:class="cn(
                  'ml-auto h-4 w-4',
                  value === framework.value ? 'opacity-100' : 'opacity-0',
                )" />
                </div>
              </UiCommandItem>
            </UiCommandGroup>
          </UiCommandList>
        </UiCommand>
      </UiPopoverContent>
    </UiPopover>
  </section>
</template>

<style>
/* Apply the change here */
[data-radix-popper-content-wrapper] {
  width: 100% !important;
  padding: 0 24px;
}

/* Ensure the content inside also takes full width */
[data-radix-popper-content-wrapper]>div {
  width: 100% !important;
}

/* If needed, adjust the max-width as well */
[data-radix-popper-content-wrapper] {
  max-width: 100% !important;
}
</style>
