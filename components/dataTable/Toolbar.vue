<script setup lang="ts" generic="TData">
import { type Table } from '@tanstack/vue-table'
import { statusColors, orderType}  from './options'

import { XIcon } from 'lucide-vue-next';
interface DataTableToolbarProps {
  table: Table<TData>
}

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-wrap gap-2 flex-1 items-center space-x-2">
      <UiInput
        placeholder="Filter orders..."
        :model-value="(table.getColumn('shortId')?.getFilterValue() as string) ?? ''"
        class="h-9 w-full md:w-[150px] lg:w-[250px]"
        @input="table.getColumn('shortId')?.setFilterValue($event.target.value)"
      />
      <DataTableFilterFaceted
        v-if="table.getColumn('type')"
        :column="table.getColumn('type')"
        title="Type"
        :options="orderType"
      />
      <DataTableFilterInput
        v-if="table.getColumn('userName')"
        :column="table.getColumn('userName')"
        title="Name"
      />
      <DataTableFilterDate
        title="Date"
        :column="table.getColumn('createdAt')"
      />
      <DataTableFilterFaceted
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Status"
        :status-colors="statusColors"
      />
      <DataTableFilterRange
        v-if="table.getColumn('total')"
        :column="table.getColumn('total')"
        title="Total"
      />
      <UiButton
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3 flex items-center  text-neutral-700"
        @click="table.resetColumnFilters()"
      >
        Reset
        <XIcon class="ml-2 h-4 w-4" />
      </UiButton>
    </div>
    <!-- <DataTableViewOptions :table="table" /> -->
  </div>
</template>
