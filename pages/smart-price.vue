<script setup lang="ts">
import { ChevronDown, SearchIcon } from 'lucide-vue-next';

const selectedTab = ref('entryPrice');

const quantityList = ref([
  { label: 'QTY-1', value: ['1 - 10'], selected: true },
  { label: 'QTY-2', value: ['1 - 10', '11 - 49'], selected: true },
  { label: 'QTY-3', value: ['1 - 10', '11 - 49', '50 - 99'], selected: false },
  { label: 'QTY-4', value: ['1 - 10', '11 - 49', '50 - 99', '100 - 149'], selected: false },
  { label: 'QTY-5', value: ['1 - 10', '11 - 49', '50 - 99', '100 - 149', '150 - 449'], selected: false },
])

const marginList = ref([
  { label: 'NM-1', value: ['1000%', '800%'], selected: true },
  { label: 'NM-2', value: ['1000%', '800%', '500%'], selected: true },
  { label: 'NM-3', value: ['1000%', '800%', '500%', '250%'], selected: false },
  { label: 'NM-4', value: ['1000%', '800%', '500%', '250%', '200%'], selected: false },
  { label: 'NM-5', value: ['1000%', '800%', '500%', '250%', '200%', '150%'], selected: false },
])

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
          <SmartPricingQuantityModal />
          <LazySmartPricingMarginModal />
        </UiPopoverContent>
      </UiPopover>
    </section>
    <UiTabs v-model="selectedTab">
      <UiTabsList class="bg-white mb-12 w-full justify-start overflow-x-scroll overflow-y-hidden h-12">
        <UiTabsTrigger
          class="pb-5 data-[state=active]:shadow-none border-b-4 rounded-b border-transparent data-[state=active]:border-blue-600"
          value="entryPrice">
          Entry Price
          <UiBadge :class="{ 'bg-blue-500': selectedTab === 'entryPrice' }"
            class="text-xs rounded-full p-1.5 min-w-5 h-5 ml-1">7</UiBadge>
        </UiTabsTrigger>
        <UiTabsTrigger
          class="pb-5 data-[state=active]:shadow-none border-b-4 rounded-b border-transparent data-[state=active]:border-blue-600"
          value="quantity">
          Quantity
          <UiBadge :class="{ 'bg-blue-500': selectedTab === 'quantity' }"
            class="text-xs rounded-full p-1.5 min-w-5 h-5 ml-1 ">27</UiBadge>
        </UiTabsTrigger>
        <UiTabsTrigger
          class="pb-5 data-[state=active]:shadow-none border-b-4 rounded-b border-transparent data-[state=active]:border-blue-600"
          value="margin">
          Gross/Net Margin
          <UiBadge :class="{ 'bg-blue-500': selectedTab === 'margin' }"
            class="text-xs rounded-full p-1.5 min-w-5 h-5 ml-1">27</UiBadge>
        </UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent class="flex flex-col gap-8" value="entryPrice">
        <SmartPricingPriceContent />
      </UiTabsContent>
      <UiTabsContent class="flex flex-col gap-8" value="quantity">
        <div class="w-full h-16 bg-light-200 flex items-center p-3">
          <div class="relative w-full max-w-sm items-center">
            <UiInput id="search" type="text" placeholder="Search..." class="pr-10" />
            <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
              <SearchIcon class="size-6 text-muted-foreground" />
            </span>
          </div>
        </div>
        <section class="flex flex-wrap gap-4">
          <SmartPricingCheckItem @updateSelected="item.selected = $event" v-for="item in quantityList" :key="item.label"
            :item="item" />
        </section>
      </UiTabsContent>
      <UiTabsContent class="flex flex-col gap-8" value="margin">
        <div class="w-full h-16 bg-light-200 flex items-center p-3">
          <div class="relative w-full max-w-sm items-center">
            <UiInput id="search" type="text" placeholder="Search..." class="pr-10" />
            <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
              <SearchIcon class="size-6 text-muted-foreground" />
            </span>
          </div>
        </div>
        <section class="flex flex-wrap gap-4">
          <SmartPricingCheckItem @updateSelected="item.selected = $event" v-for="item in marginList" :key="item.label"
            :item="item" />
        </section>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<style scoped></style>
