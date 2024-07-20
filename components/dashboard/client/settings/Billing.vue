<script setup lang="ts">
import { PlusCircleIcon } from 'lucide-vue-next';
import AddressList from './AddressList.vue'
import BillingDialog from './BillingDialog.vue'
</script>

<template>
  <section class="flex flex-col gap-9 self-stretch p-4 md:p-6 bg-white rounded-xl shadow-l">
    <div class="flex gap-2.5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
      <h2 class="self-start text-xl font-semibold leading-7 text-neutral-700">Billing</h2>
    </div>
    <AddressList />
    <section
      class="flex justify-center items-center self-stretch p-4 rounded-xl border border-blue-500 border-dashed max-md:px-5">
        <BillingDialog />
    </section>
  </section>
</template>

<style scoped>
</style>
