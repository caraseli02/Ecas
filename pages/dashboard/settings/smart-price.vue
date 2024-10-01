<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';

definePageMeta({
    layout: 'dashboard',
});

const selectedTab = ref('entryPrice');

</script>

<template>
  <section class="w-[1488px] max-w-full p-4 mx-auto transition-all duration-300 md:py-6 2xl:px-6">
    <SmartPricingBreadcrumbs title="Smart Pricing" />
    <div class="container m-0 overflow-hidden pb-10 bg-white min-h-screen mb-4 rounded-xl">
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
            <UiBadge
  :class="{ 'bg-blue-500': selectedTab === 'entryPrice' }"
              class="text-xs rounded-full p-1.5 min-w-5 h-5 ml-1">7</UiBadge>
          </UiTabsTrigger>
          <UiTabsTrigger
            class="pb-5 data-[state=active]:shadow-none border-b-4 rounded-b border-transparent data-[state=active]:border-blue-600"
            value="quantity">
            Quantity
            <UiBadge
  :class="{ 'bg-blue-500': selectedTab === 'quantity' }"
              class="text-xs rounded-full p-1.5 min-w-5 h-5 ml-1 ">27</UiBadge>
          </UiTabsTrigger>
          <UiTabsTrigger
            class="pb-5 data-[state=active]:shadow-none border-b-4 rounded-b border-transparent data-[state=active]:border-blue-600"
            value="margin">
            Gross/Net Margin
            <UiBadge
  :class="{ 'bg-blue-500': selectedTab === 'margin' }"
              class="text-xs rounded-full p-1.5 min-w-5 h-5 ml-1">27</UiBadge>
          </UiTabsTrigger>
        </UiTabsList>
        <UiTabsContent class="flex flex-col gap-8" value="entryPrice">
          <SmartPricingContentPrice />
        </UiTabsContent>
        <UiTabsContent class="flex flex-col gap-8" value="quantity">
          <SmartPricingContentQuantity />
        </UiTabsContent>
        <UiTabsContent class="flex flex-col gap-8" value="margin">
          <SmartPricingContentMargin />
        </UiTabsContent>
      </UiTabs>
    </div>
  </section>
</template>

<style scoped></style>
