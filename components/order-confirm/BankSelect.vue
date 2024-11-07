<script setup lang="ts">
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'

const frameworks = [
  { value: 'bcr_ron', label: 'BCR Bank RON' },
  { value: 'bcr_usd', label: 'BCR Bank USD' },
  { value: 'uni_ron', label: 'UNI Bank RON' },
  { value: 'patria_ron', label: 'PATRIA Bank RON' },
  { value: 'patria_usd', label: 'PATRIA Bank USD' },
]

const open = ref(false)
const value = ref('')
</script>

<template>
  <UiPopover v-model:open="open">
    <UiPopoverTrigger as-child>
      <UiButton
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[200px] justify-between"
      >
        {{ value
          ? frameworks.find((framework) => framework.value === value)?.label
          : "Select bank..." }}
        <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-[200px] p-0">
      <UiCommand>
        <UiCommandInput class="h-9" placeholder="Search framework..." />
        <UiCommandEmpty>No bank found.</UiCommandEmpty>
        <UiCommandList>
          <UiCommandGroup>
            <UiCommandItem
              v-for="framework in frameworks"
              :key="framework.value"
              :value="framework.value"
              @select="(ev) => {
                if (typeof ev.detail.value === 'string') {
                  value = ev.detail.value
                }
                open = false
              }"
            >
              {{ framework.label }}
              <CheckIcon
                :class="cn(
                  'ml-auto h-4 w-4',
                  value === framework.value ? 'opacity-100' : 'opacity-0',
                )"
              />
            </UiCommandItem>
          </UiCommandGroup>
        </UiCommandList>
      </UiCommand>
    </UiPopoverContent>
  </UiPopover>
</template>
