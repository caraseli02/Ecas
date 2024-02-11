<script setup lang="ts">
import { type Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import { type Order } from '../data/schema'
import { statuses, orderType}  from '../data/data'


// import { orderType, statuses } from '../data/data'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'
import DataTableInputFilter from './DataTableInputFilter.vue'
import DataTableDateFilter from './DataTableDateFilter.vue'
import DataTableRangeFilter from './DataTableRangeFilter.vue'
import {Cross2Icon} from '@radix-icons/vue'

interface DataTableToolbarProps {
  table: Table<Order>
}

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <UiInput
        placeholder="Filter orders..."
        :model-value="(table.getColumn('shortId')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn('shortId')?.setFilterValue($event.target.value)"
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('type')"
        :column="table.getColumn('type')"
        title="Type"
        :options="orderType"
      />
      <DataTableInputFilter
        v-if="table.getColumn('userName')"
        :column="table.getColumn('userName')"
        title="Name"
        :model-value="(table.getColumn('userName')?.getFilterValue() as string) ?? ''"
        @on-input="table.getColumn('userName')?.setFilterValue($event)"
      />
      <DataTableDateFilter
        title="Date"
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Status"
        :options="statuses"
      />
      <DataTableRangeFilter
        v-if="table.getColumn('total')"
        :column="table.getColumn('total')"
        title="Total"
        :model-value="(table.getColumn('total')?.getFilterValue() as string) ?? ''"
        @on-input="table.getColumn('total')?.setFilterValue($event)"
      />
      <UIButton
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <Cross2Icon class="ml-2 h-4 w-4" />
      </UIButton>
    </div>
    <DataTableViewOptions :table="table" />
  </div>
</template>
