<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { PlusCircledIcon, MagnifyingGlassIcon } from '@radix-icons/vue'
import { Order } from '../schema';

interface DataTableInputFilter {
  column?: Column<Order, any>
  title?: string
}

const props = defineProps<DataTableInputFilter>()
const emit = defineEmits<{
  onInput: [value: string]
}>()

const isNameValid = (name: string) => {
  // Regular expression for basic name validation (alphabets and spaces)
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name);
};

const searchText = ref('')

const addToSearch = () => {
  const trimmedName = searchText.value.trim();

  if (trimmedName && isNameValid(trimmedName)) {
    props.column?.setFilterValue(trimmedName)
    searchText.value = '';
  } else {
    // Handle invalid name input, e.g., show an error message or prevent adding invalid names
    console.error('Invalid name input. Please enter a valid name.');
  }
};

// const clearFilters = () => {
//   searchText.value = ''
//   searchArr.value = []
//   emit('onInput','')
// }

const selectedValues = computed(() => new Set(props.column?.getFilterValue() as string[]))

</script>

<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <UiButton variant="outline" size="sm" class="!ml-0 border-dashed  text-neutral-700">
        <PlusCircledIcon class="mr-2 h-4 w-4" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <UiSeparator orientation="vertical" class="mx-2 h-4" />
          <!-- <UiBadge
            variant="secondary"
            class="rounded bg-light-300 px-1 font-normal lg:hidden"
          >
            {{ searchArr.length }}
          </UiBadge>
          <div class="hidden space-x-1 lg:flex">
            <UiBadge
              v-if="searchArr.length > 2"
              variant="secondary"
              class="rounded bg-light-300 px-1 py-[3px] font-normal"
            >
              {{ searchArr.length }} selected
            </UiBadge>
            <template v-else>
              <UiBadge
                v-for="item in searchArr"
                :key="item"
                variant="secondary"
                class="rounded bg-light-300 px-1 py-[3px] font-normal"
              >
                {{ item }}
              </UiBadge>
            </template>
          </div> -->
          <UiBadge variant="secondary" class="rounded bg-light-300 px-1 py-[3px] font-normal">
            {{ props.column?.getFilterValue() }}
          </UiBadge>
        </template>
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-[280px] flex flex-col gap-2 p-2" align="start">
      <div class="flex gap-3 justify-between">
        <UiInput v-model=searchText placeholder="Filter name or email..."
          class="h-9 w-full text-neutral-700 border-gray-300" />
        <!-- <UiInput
        placeholder="Filter name or email..."
        :model-value=modelValue
        class="h-8 w-full"
        @input="emit('onInput',$event.target.value)"
      /> -->
        <UiButton variant="secondary" size="icon" class="h-9 min-w-9" @click="addToSearch()">
          <MagnifyingGlassIcon class="w-5 h-5" />
        </UiButton>
      </div>
      <UiButton v-if="selectedValues.size > 0" class="text-neutral-700 font-normal text-sm" size="sm" variant="ghost"
        @click="column?.setFilterValue(undefined)">
        Clear filters
      </UiButton>
    </UiPopoverContent>
  </UiPopover>
</template>
