<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { type Task } from './data/schema'
import {MixerHorizontalIcon} from '@radix-icons/vue'

interface DataTableViewOptionsProps {
  table: Table<Task>
}

const props = defineProps<DataTableViewOptionsProps>()

const columns = computed(() => props.table.getAllColumns()
  .filter(
    column =>
      typeof column.accessorFn !== 'undefined' && column.getCanHide(),
  ))
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton
        variant="outline"
        size="sm"
        class="ml-auto hidden h-8 lg:flex"
      >
        <MixerHorizontalIcon class="mr-2 h-4 w-4" />
        View
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end" class="w-[150px]">
      <UiDropdownMenuLabel>Toggle columns</UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />

      <UiDropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        class="capitalize"
        :checked="column.getIsVisible()"
        @update:checked="(value) => column.toggleVisibility(!!value)"
      >
        {{ column.id }}
      </UiDropdownMenuCheckboxItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
