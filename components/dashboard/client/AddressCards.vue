<template>
  <div v-for="(address, index) in addresses" :key="index" aria-label="Shipping" role="group" class="items-stretch shadow-xs bg-white flex w-full lg:max-w-[476px] xl:max-w-md flex-col p-6 rounded-xl">
    <section class="justify-between items-stretch flex gap-5">
      <div class="text-neutral-800 text-sm font-medium leading-5">{{ address.type }}</div>
      <button><SvgoEditGray24 class="text-slate-300 hover:text-blue-500"/></button>
    </section>
    <div aria-label="Address Details" role="group" class="items-stretch flex justify-between gap-3 mt-6">
      <SvgoAddressBuilding />
      <div role="form" class="items-stretch flex grow basis-[0%] flex-col text-sm text-neutral-800">
        <div class="font-medium leading-5">{{ address.alias }}</div>
        <div class="leading-5 mt-1">{{ address.name }}</div>
        <div class="leading-5 mt-1">{{ address.fullAddress }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const addresses = ref([
  {
    type: 'Shipping',
    alias: 'Address Alias 1',
    name: 'Madalina Popescu',
    fullAddress: '5073 Mark Brown Rd, NE Dalton, Georgia (GA), 30721, United States'
  },
  {
    type: 'Billing',
    alias: 'Address Alias 2',
    name: 'Madalina Popescu',
    fullAddress: '5073 Mark Brown Rd, NE Dalton, Georgia (GA), 30721, United States'
  }
]);

</script>

