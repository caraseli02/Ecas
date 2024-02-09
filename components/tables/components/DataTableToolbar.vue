<script setup lang="ts">
import { type Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import { type Order } from '../data/schema'
import { statuses, orderType}  from '../data/data'


// import { orderType, statuses } from '../data/data'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'
import DataTableInputFilter from './DataTableInputFilter.vue'
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
        :column="table.getColumn('userName')"
        title="Name"
        :modelValue="(table.getColumn('userName')?.getFilterValue() as string) ?? ''"
        @onInput="table.getColumn('userName')?.setFilterValue($event.target.value)"
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Status"
        :options="statuses"
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
