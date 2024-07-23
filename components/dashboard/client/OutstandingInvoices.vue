<script setup lang="ts">
import { Clock, FileText } from 'lucide-vue-next';
defineProps<{
  items: string[]
}>()
</script>

<template>
  <div
      class="justify-between items-stretch shadow-xs bg-white flex w-full lg:w-fit md:min-w-[476px] xl:min-w-[472px] h-[240px] flex-col p-4 md:p-6 rounded-xl"
  >
    <div class="items-stretch flex justify-between gap-4">
      <div class="justify-center items-stretch flex grow basis-[0%] flex-col">
        <div class="text-neutral-800 text-base font-semibold leading-6 flex justify-between">
          Outstanding Invoices
          <Clock  class="stroke-1 w-5 h-5 text-slate-500"/>
        </div>
        <div class="flex gap-1.5 mt-4 mb-1 flex-wrap lg:max-w-[424px]">
          <button
              v-for="item in items"
              :key="item"
              class="w-fit text-slate-500 hover:text-blue-500 text-[12px] leading-5 font-medium flex justify-center items-center bg-gray-200 px-[6px] rounded-3xl"
          >
            {{ item }}
          </button>
        </div>

      </div>
    </div>
    <div class="items-stretch flex justify-end gap-3">
      <UiButton>
        <FileText class="w-4 h-4 mr-2 text-white" />
        <div
            class="text-white text-sm font-medium leading-6 grow whitespace-nowrap"
        >
          View All Invoices
        </div>
      </UiButton>
    </div>
  </div>
</template>

<style scoped>

</style>
