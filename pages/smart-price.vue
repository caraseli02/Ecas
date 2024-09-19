<script setup lang="ts">
import { ChevronDown, SearchIcon, SquarePenIcon, Trash2Icon } from 'lucide-vue-next';

const selectedTab = ref('entryPrice');

const entryPriceList = [
  { label: 'EP-1', value: '$0.5 - $0.99', selected: true },
  { label: 'EP-2', value: '$1.00 - $4.99', selected: true },
  { label: 'EP-3', value: '$5.00 - $9.99', selected: false },
  { label: 'EP-4', value: '$10.00 - $24.99', selected: false },
  { label: 'EP-5', value: '$24.00 - $44.99', selected: false },
]
</script>

<template>
  <div class="container overflow-hidden pb-10">
    <section class="flex w-full justify-between mt-4 mb-9">
      <h4 class="text-xl font-semibold">Smart Pricing</h4>
      <UiPopover>
        <UiPopoverTrigger>
          <UiButton class="gap-2">
            Create New
            <ChevronDown class="w-4 h-4" />
          </UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent align="end" class="w-[220px] flex flex-col">
          <SmartPricingEntryModal />
          <UiButton class="justify-start" variant="ghost">Quantity</UiButton>
          <UiButton class="justify-start" variant="ghost">Margin</UiButton>
        </UiPopoverContent>
      </UiPopover>
    </section>
    <UiTabs v-model="selectedTab">
      <UiTabsList class="bg-white mb-12 w-full justify-start overflow-x-scroll overflow-y-hidden">
        <UiTabsTrigger
          class="data-[state=active]:shadow-none border-b-4 rounded-b border-transparent data-[state=active]:border-blue-600"
          value="entryPrice">
          Entry Price
          <UiBadge
:class="{ 'bg-blue-500': selectedTab === 'entryPrice' }"
            class="text-xs rounded-full p-1.5 min-w-5 h-5 ml-1">7</UiBadge>
        </UiTabsTrigger>
        <UiTabsTrigger
          class="data-[state=active]:shadow-none border-b-4 rounded-b border-transparent data-[state=active]:border-blue-600"
          value="quantity">
          Quantity
          <UiBadge
:class="{ 'bg-blue-500': selectedTab === 'quantity' }"
            class="text-xs rounded-full p-1.5 min-w-5 h-5 ml-1 ">27</UiBadge>
        </UiTabsTrigger>
        <UiTabsTrigger
          class="data-[state=active]:shadow-none border-b-4 rounded-b border-transparent data-[state=active]:border-blue-600"
          value="margin">
          Gross/Net Margin
          <UiBadge
:class="{ 'bg-blue-500': selectedTab === 'margin' }"
            class="text-xs rounded-full p-1.5 min-w-5 h-5 ml-1">27</UiBadge>
        </UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent class="flex flex-col gap-8" value="entryPrice">
        <div class="w-full h-16 bg-light-200 flex items-center p-3">
          <div class="relative w-full max-w-sm items-center">
            <UiInput id="search" type="text" placeholder="Search..." class="pr-10" />
            <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
              <SearchIcon class="size-6 text-muted-foreground" />
            </span>
          </div>
        </div>
        <section class="flex flex-wrap gap-4">
          <div v-for="item in entryPriceList" :key="item.value" class="w-full md:w-fit h-16 bg-light-200 flex gap-10 items-center p-3 rounded-xl">
            <section class="flex gap-2 items-center">
            <UiCheckbox :checked="item.selected" class="border-grey-600 w-5 h-5" />
            <div class="flex items-center justify-between gap-2 bg-white border border-grey-300 px-3 py-1 min-w-[148px] w-full h-9 rounded-lg">
              <span class="font-medium">{{ item.label }}</span>
              <UiSeparator class="w-[1px] h-5" />
              <UiBadge variant="secondary" class="text-xs rounded bg-light-300 px-1">{{ item.value }}</UiBadge>
            </div>
            </section>
            <div class="flex gap-6">
              <SquarePenIcon class="w-5 h-5 text-slate-500" />
              <Trash2Icon class="w-5 h-5  text-slate-500" />
            </div>  
          </div>
        </section>
      </UiTabsContent>
      <UiTabsContent value="quantity">
        quantity
      </UiTabsContent>
      <UiTabsContent value="margin">
        margin
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<style scoped></style>
