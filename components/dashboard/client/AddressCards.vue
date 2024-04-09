<template>
  <div
      v-for="(address, index) in addresses" :key="index" aria-label="Shipping" role="group"
      class="items-stretch shadow-xs bg-white flex w-full lg:max-w-[476px] xl:max-w-md flex-col p-6 rounded-xl">
    <section class="justify-between items-stretch flex gap-5">
      <div class="text-neutral-800 text-sm font-medium leading-5">{{ index === 0 ? 'Shipping' : 'Billing' }}</div>
      <button>
        <SvgoEditGray24 class="text-slate-300 hover:text-blue-500"/>
      </button>
    </section>
    <div aria-label="Address Details" role="group" class="items-stretch flex justify-between gap-3 mt-6">
      <SvgoAddressBuilding/>
      <div role="form" class="items-stretch flex grow basis-[0%] flex-col text-sm text-neutral-800">
        <div class="font-medium leading-5">{{ address.alias }}</div>
        <div class="leading-5 mt-1">{{ address.name1 }}</div>
        <div class="leading-5 mt-1">{{ address.name2 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ShippingAddressInterface} from '~/types/auth/user-interface';

defineProps<{
  addresses: Array<ShippingAddressInterface>
}>()

</script>

