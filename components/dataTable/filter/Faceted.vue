<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import type { Component } from 'vue'
import { computed } from 'vue'
import { type Order } from './data/schema'
import {PlusCircledIcon} from '@radix-icons/vue'
import {CheckIcon} from '@radix-icons/vue'

import { cn } from '@/lib/utils'

interface DataTableFacetedFilter {
  column?: Column<Order, any>
  title?: string
  options: {
    label: string
    value: string
    icon?: Component
    color?: string
    UiBadge?: {
        bg: string;
        text: string;
    }
  }[]
}

const props = defineProps<DataTableFacetedFilter>()

// const facets = computed(() => props.column?.getFacetedUniqueValues())
const selectedValues = computed(() => new Set(props.column?.getFilterValue() as string[]))
</script>

<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <UiButton variant="outline" size="xs" class="!ml-0 border-dashed">
        <PlusCircledIcon class="mr-2 h-4 w-4" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <UiSeparator orientation="vertical" class="mx-2 h-4" />
          <UiBadge
            variant="secondary"
            class="rounded-sm px-1 font-normal lg:hidden"
          >
            {{ selectedValues.size }}
          </UiBadge>
          <div class="hidden space-x-1 lg:flex">
            <UiBadge
              v-if="selectedValues.size > 2"
              variant="secondary"
              class="rounded bg-light-300 px-1 font-normal"
            >
              {{ selectedValues.size }} selected
            </UiBadge>

            <template v-else>
              <UiBadge
                v-for="option in options
                  .filter((option) => selectedValues.has(option.value))"
                :key="option.value"
                variant="secondary"
                class="rounded bg-light-300 px-1 font-normal"
              >
                              <span v-if="option?.UiBadge" :class="option?.UiBadge?.bg" class="h-4 w-4 mr-2 rounded-full text-xs text-white flex justify-center items-center">
                {{ option?.UiBadge?.text }}
              </span>
              <span v-if="option?.color" :class="option?.color" class="h-3 w-3 mr-2 rounded-full text-xs text-white flex justify-center items-center" />
                {{ option.label }}
              </UiBadge>
            </template>
          </div>
        </template>
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-[215px] p-0" align="start">
      <UiCommand>
        <UiCommandInput :placeholder="title" />
        <UiCommandList>
          <UiCommandEmpty>No results found.</UiCommandEmpty>
          <UiCommandGroup>
            <UiCommandItem
              v-for="option in options"
              :key="option.value"
              :value="option"
              @select="() => {
                const isSelected = selectedValues.has(option.value)
                if (isSelected) {
                  selectedValues.delete(option.value)
                }
                else {
                  selectedValues.add(option.value)
                }
                const filterValues = Array.from(selectedValues)
                column?.setFilterValue(
                  filterValues.length ? filterValues : undefined,
                )
              }"
            >
              <div
                :class="cn(
                  'mr-3 flex h-4 w-4 items-center justify-center rounded-md ',
                  selectedValues.has(option.value)
                    ? 'bg-blue-500 text-white'
                    : 'opacity-50 [&_svg]:invisible border border-gray-600',
                )"
              >
                <CheckIcon :class="cn('h-4 w-4')" />
              </div>
              <span v-if="option?.UiBadge" :class="option?.UiBadge?.bg" class="h-4 w-4 mr-2 rounded-full text-xs text-white flex justify-center items-center">
                {{ option?.UiBadge?.text }}
              </span>
              <span v-if="option?.color" :class="option?.color" class="h-3 w-3 mr-2 rounded-full text-xs text-white flex justify-center items-center">
              </span>
              <option.icon v-if="option.icon" class="mr-2 h-4 w-4 text-muted-foreground" />
              <span class="inline truncate">{{ option.label }}</span>
              <!-- <span v-if="facets?.get(option.value)" class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                {{ facets.get(option.value) }}
              </span> -->
            </UiCommandItem>
          </UiCommandGroup>

          <template v-if="selectedValues.size > 0">
            <UiSeparator />
            <UiCommandGroup>
              <UiCommandItem
                :value="{ label: 'Clear filters' }"
                class="justify-center text-center"
                @select="column?.setFilterValue(undefined)"
              >
                Clear filters
              </UiCommandItem>
            </UiCommandGroup>
          </template>
        </UiCommandList>
      </UiCommand>
    </UiPopoverContent>
  </UiPopover>
</template>
