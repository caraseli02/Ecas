<template>
  <div>
    <div v-if="activeView !== 'settings'" class="bg-white rounded-xl px-4 py-6 shadow-xs md:px-6">

      <DashboardControlPanelAccountView v-if="(activeView === 'account')"/>
      <DashboardControlPanelOrganizationView v-if="(activeView === 'organization')"/>
      <DashboardControlPanelShippingView v-else-if="activeView === 'shipping'"/>
      <DashboardControlPanelTransactionHistoryView v-else-if="activeView === 'transaction-history'"/>
      <DashboardControlPanelBillingView v-else-if="activeView === 'billing'"/>
    </div>
    <DashboardControlPanelSettingsView v-if="activeView === 'settings'"/>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const activeView = computed(() => {

  return route.params.view as 'account' | 'organization' | 'shipping' | 'billing' | 'transaction-history' | 'settings';
});

onMounted(() => {
  if (!['account', 'organization', 'shipping', 'billing', 'transaction-history', 'settings'].includes(route.params.view as string)) {
    router.replace({
      path: `/dashboard/customers/${route.params.slug}/control-panel/settings`,
    });
  }
});

definePageMeta({
  layout: 'dashboard',
});
</script>
