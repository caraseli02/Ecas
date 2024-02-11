<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { type Order } from '../data/schema'
import { PlusCircledIcon, MagnifyingGlassIcon } from '@radix-icons/vue'

interface DataTableInputFilter {
  column?: Column<Order, any>
  title?: string
  modelValue: string
}

defineProps<DataTableInputFilter>()
const emit = defineEmits<{
  onInput: [value: string]
}>()

const searchArr = ref<string[]>([])
const searchText = ref('')
const addToSearch = () => {
  searchArr.value.push(searchText.value)
  searchText.value = ''
}
</script>

<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <UiButton variant="outline" size="sm" class="h-8 border-dashed">
        <PlusCircledIcon class="mr-2 h-4 w-4" />
        {{ title }}
        <template v-if="searchArr.length > 0">
          <UiSeparator orientation="vertical" class="mx-2 h-4" />
          <UiBadge
            variant="secondary"
            class="rounded-sm px-1 font-normal lg:hidden"
          >
            {{ searchArr.length }}
          </UiBadge>
          <div class="hidden space-x-1 lg:flex">
            <UiBadge
              v-if="searchArr.length > 2"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              {{ searchArr.length }} selected
            </UiBadge>
            <template v-else>
              <UiBadge
                v-for="item in searchArr"
                :key="item"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                {{ item }}
              </UiBadge>
            </template>
          </div>
        </template>
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-[280px] flex gap-4 p-2 justify-between" align="start">
      <UiInput v-model=searchText placeholder="Filter name or email..." class="h-8 w-full" />
      <!-- <UiInput
        placeholder="Filter name or email..."
        :model-value=modelValue
        class="h-8 w-full"
        @input="emit('onInput',$event.target.value)"
      /> -->
      <UiButton variant="secondary" size="sm" class="h-8" @click="addToSearch()">
        <MagnifyingGlassIcon class="w-5 h-5" />
      </UiButton>
    </UiPopoverContent>
  </UiPopover>
</template>
