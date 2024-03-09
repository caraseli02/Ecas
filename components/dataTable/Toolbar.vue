<script setup lang="ts">
import { type Table } from '@tanstack/vue-table'
import { type Order } from './schema'
import { statuses, orderType}  from './options'

import { Cross2Icon } from '@radix-icons/vue'

interface DataTableToolbarProps {
  table: Table<Order>
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
        :model-value="(table.getColumn('userName')?.getFilterValue() as string) ?? ''"
        @on-input="table.getColumn('userName')?.setFilterValue($event)"
      />
      <DataTableFilterDate
        title="Date"
      />
      <DataTableFilterFaceted
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Status"
        :options="statuses"
      />
      <DataTableFilterRange
        v-if="table.getColumn('total')"
        :column="table.getColumn('total')"
        title="Total"
        :model-value="(table.getColumn('total')?.getFilterValue() as string) ?? ''"
        @on-input="table.getColumn('total')?.setFilterValue($event)"
      />
      <UiButton
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3 flex items-center  text-neutral-700"
        @click="table.resetColumnFilters()"
      >
        Reset
        <Cross2Icon class="ml-2 h-4 w-4" />
      </UiButton>
    </div>
    <!-- <DataTableViewOptions :table="table" /> -->
  </div>
</template>
