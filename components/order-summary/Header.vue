<template>
  <div class="flex items-end justify-between mb-[15px] px-2">
    <h1 class="text-xl font-semibold">
      Order Summary
    </h1>
    <div class="flex items-center">
      <DialogReportError />
      <button
        class="flex items-center text-gray-500 transition-colors duration-300 hover:text-blue-500"
        @click="printPage"
      >
        <Printer class="w-[22px] h-[22px]" />
        <span class="text-xs leading-tight ml-[5px] max-md:hidden"> Print this page </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Printer, AlertTriangle } from 'lucide-vue-next';

const printPage = () => {
  if (import.meta.client) {
    window.print();
  }
};
</script>
