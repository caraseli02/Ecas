<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'

import { type Order } from './schema'
import { valueUpdater } from '@/lib/utils'

interface Props {
  columns: ColumnDef<Order, any>[]
  data: Order[],
  fetchFn: (page: number, perPage: number, filters?: any, sort?: any) => Promise<void>
}
const props = defineProps<Props>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
  },
  enableRowSelection: true,
  manualPagination: true,
  pageCount: 10,
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
})

watch(
  () => [table.getState().pagination.pageIndex, table.getState().pagination.pageSize],
  () => {
    const {pageIndex, pageSize} = table.getState().pagination;
    props.fetchFn(pageIndex, pageSize)
  }
);

</script>

<template>
  <div class="space-y-4 mt-5 font-Poppins text-neutral-700">
    <DataTableToolbar :table="table" />
    <div class="rounded-xl border">
      <UiTable>
        <UiTableHeader class="bg-light-200">
          <UiTableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <UiTableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <template v-if="table.getRowModel().rows?.length">
            <UiTableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              class="hover:bg-light-200"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <UiTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </UiTableCell>
            </UiTableRow>
          </template>

          <UiTableRow v-else>
            <UiTableCell
              col-span="{columns.length}"
              class="h-24 text-center"
            >
              No results.
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>

    <DataTablePagination :table="table" />
  </div>
</template>
