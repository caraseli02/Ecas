<script setup lang="ts">
import { PlusCircleIcon } from 'lucide-vue-next';

</script>

<template>
  <section class="flex flex-col gap-9 self-stretch p-6 bg-white rounded-xl shadow-l max-md:px-5">
    <div class="flex gap-2.5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
      <h2 class="self-start text-xl font-semibold leading-7 text-neutral-700">Billing</h2>
    </div>
    <ClientAddressList />
    <section
      class="flex justify-center items-center self-stretch p-4 rounded-xl border border-blue-500 border-dashed max-md:px-5">
        <PlusCircleIcon class="aspect-square w-10 h-10 stroke-1 text-blue-500" />
    </section>
  </section>
</template>

<style scoped>
</style>
