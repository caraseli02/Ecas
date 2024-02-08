<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { computed } from 'vue'
import { orderSchema } from '../data/schema'
import { type Task } from '../data/schema'
import { DotsHorizontalIcon } from '@radix-icons/vue'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableRowActionsProps {
  row: Row<Task>
}
const props = defineProps<DataTableRowActionsProps>()

const task = computed(() => orderSchema.parse(props.row.original))
</script>

<template>
  <section class="flex justify-around items-center gap-6">
    <svg class="text-slate-500 hover:text-blue-500" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.5 5.83366V14.167C17.5 16.667 16.25 18.3337 13.3333 18.3337H6.66667C3.75 18.3337 2.5 16.667 2.5 14.167V5.83366C2.5 3.33366 3.75 1.66699 6.66667 1.66699H13.3333C16.25 1.66699 17.5 3.33366 17.5 5.83366Z"
        stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path
d="M12.083 3.75V5.41667C12.083 6.33333 12.833 7.08333 13.7497 7.08333H15.4163" stroke="currentColor"
        stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path
d="M6.66699 10.833H10.0003" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
        stroke-linejoin="round" />
      <path
d="M6.66699 14.167H13.3337" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>
    <svg class="text-slate-500 hover:text-blue-500" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.5 5.00033C2.5 3.15938 3.99238 1.66699 5.83333 1.66699H14.1667C16.0076 1.66699 17.5 3.15938 17.5 5.00033V15.0003C17.5 16.8413 16.0076 18.3337 14.1667 18.3337H5.83333C3.99238 18.3337 2.5 16.8413 2.5 15.0003V5.00033Z"
        stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
      <path
d="M14.1663 5.83301L5.83301 5.83301" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
        stroke-linejoin="round" />
      <path
d="M14.1663 10L5.83301 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
        stroke-linejoin="round" />
      <path
d="M9.99967 14.167L5.83301 14.167" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>
    <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <DotsHorizontalIcon class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[167px]">
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>Make a copy</DropdownMenuItem>
      <DropdownMenuItem>Favorite</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup :value="task.label">
            <!-- <DropdownMenuRadioItem v-for="label in labels" :key="label.value" :value="label.value">
              {{ label.label }}
            </DropdownMenuRadioItem> -->
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        Delete
      <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  </section>

</template>
