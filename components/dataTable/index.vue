<script setup lang="ts" generic="TData, TValue">
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

import { valueUpdater, transformSortingKeys, transformFiltersToObject } from '@/lib/utils'
import { DebouncedFunc } from 'lodash'

interface Props {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  fetchFn: DebouncedFunc<(page: number, perPage: number, filters?: any, sort?: any) => Promise<void>>,
  pageCount: number,
  loading: boolean
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
  //For Server Request
  manualPagination: true,
  manualSorting: true,
  pageCount: props.pageCount,
  //For Server Request
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  getCoreRowModel: getCoreRowModel(),
  // getFilteredRowModel: getFilteredRowModel(),
  // getSortedRowModel: getSortedRowModel(),
  // getFacetedRowModel: getFacetedRowModel(),
  // getFacetedUniqueValues: getFacetedUniqueValues(),
})

watch(
  () => [table.getState().pagination.pageIndex, table.getState().pagination.pageSize, table.getState().sorting],
  () => {
    const {pageIndex, pageSize} = table.getState().pagination;
    const rightIndex = pageIndex + 1;
    props.fetchFn(
      rightIndex, 
      pageSize, 
      transformFiltersToObject(table.getState().columnFilters), 
      transformSortingKeys(table.getState().sorting[0])
      )
  }
);
watch(
  () => props.loading,
  () => {
    if(!props.loading) return
    const {pageIndex, pageSize} = table.getState().pagination;
    const rightIndex = pageIndex + 1;
    props.fetchFn(
      rightIndex, 
      pageSize, 
      transformFiltersToObject(table.getState().columnFilters), 
      transformSortingKeys(table.getState().sorting[0])
      )
  }
);

watch(
  () => table.getState().columnFilters,
  () => {
    const { pageSize } = table.getState().pagination;
    table.setPageIndex(0)
    props.fetchFn(
      1, 
      pageSize, 
      transformFiltersToObject(table.getState().columnFilters), 
      transformSortingKeys(table.getState().sorting[0])
      )
  }
);

// watch(
//   () => props.pageCount,
//   async () => {
//     await nextTick();
//     table.setOptions({ ...table.options, pageCount: props.pageCount });
//   }, {deep: true}
// );

// watch(() => props.rowCount, () => {
//   console.log('reset');
  
//   table.reset()
// }, {deep: true})

</script>

<template>
  <div class="space-y-4 mt-5 font-Poppins text-neutral-700">
    <slot name="header" :table="table" />
    <slot name="toolbar" :table="table" />
    <div class="rounded-xl border relative">
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
      <UiSkeleton v-if="loading" class="w-full h-full rounded absolute inset-0 z-10" />
    </div>
    <DataTablePagination :page-count="props.pageCount" :table="table" />
  </div>
</template>
