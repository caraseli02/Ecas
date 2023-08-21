<template>
    <div class="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[1fr,416px]">
        <div
            class="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 lg:gap-6 xl:grid-cols-1 xl:gap-0 xl:order-2 xl:grid-rows-[auto,1fr] xl:shadow-xs xl:rounded-xl xl:overflow-hidden"
        >
            <DashboardControlPanelSettingsViewCustomerCredit />
            <DashboardControlPanelSettingsViewCustomerDiscount />
        </div>
        <DashboardControlPanelSettingsViewSettings />
    </div>
</template>

<script setup lang="ts">
import DashboardControlPanelSettingsViewSettings from './Settings.vue';
</script>
