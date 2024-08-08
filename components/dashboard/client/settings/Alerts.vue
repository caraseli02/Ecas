<script setup lang="ts">
import AlertsItem from './AlertsItem.vue'

const settings = reactive({
      passwordChange: { email: true, app: false },
      newProducts: { email: true, app: false },
      hotDeals: { email: true, app: false },
      cartItemsOutOfStock: { email: false, app: false },
      cartItemsPriceUpdate: { email: false, app: false },
      orderShippingUpdates: { email: false, app: false },
      pendingAgents: { email: false, app: false },
    });
</script>

<template>
  <section class="flex flex-col self-stretch p-6 text-sm leading-6 bg-white rounded-xl shadow-l text-neutral-800 max-md:px-5">
    <h2 class="self-start text-xl font-semibold leading-7">Alerts and Notifications</h2>
    <p class="self-start mt-4">Change to alerts and notification settings.</p>
    <div class="flex gap-5 justify-between self-end mt-8 max-w-full whitespace-nowrap w-[123px]">
      <span>Email</span>
      <span class="text-center">App</span>
    </div>
    <AlertsItem v-model:email="settings.passwordChange.email" v-model:app="settings.passwordChange.app" title="Password Change" />
    <AlertsItem v-model:email="settings.newProducts.email" v-model:app="settings.newProducts.app" title="New Products" />
    <AlertsItem v-model:email="settings.hotDeals.email" v-model:app="settings.hotDeals.app" title="HOT Deals" />
    <AlertsItem v-model:email="settings.cartItemsOutOfStock.email" v-model:app="settings.cartItemsOutOfStock.app" title="Cart Items - Out of Stock" />
    <AlertsItem v-model:email="settings.cartItemsPriceUpdate.email" v-model:app="settings.cartItemsPriceUpdate.app" title="Cart Items - Price Update" />
    <AlertsItem v-model:email="settings.orderShippingUpdates.email" v-model:app="settings.orderShippingUpdates.app" title="Order Shipping Updates" />
    <AlertsItem v-model:email="settings.pendingAgents.email" v-model:app="settings.pendingAgents.app" title="Pending Agents" />
  </section>
</template>

<style scoped>

</style>
