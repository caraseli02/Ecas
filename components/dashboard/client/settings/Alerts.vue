<script setup lang="ts">
import AlertsItem from './AlertsItem.vue';
import { AlertAndNotificationType } from '~/types/dashboard/control-panel';
import { useAuthStore } from '~/store/authStore';
import { storeToRefs } from 'pinia';
import { AccountType } from '~/types';
import { GeneralSettingsInterface } from '~/types/general-settings/general-settings';
import { useNuxtApp } from '#app';

const { $api } = useNuxtApp();
const authStore = useAuthStore();

const { getUserDetails } = storeToRefs(authStore);

const getCustomerSettings = async () => {
    if (getUserDetails) {
        const response = (await $api.generalSettings.fetchSettings()) as {
            data: GeneralSettingsInterface;
            status: string;
        };
        authStore.addGeneralSettings(response.data as GeneralSettingsInterface);
    }
};

await getCustomerSettings();

const userSettings = ref(getUserDetails.value.adminSettings?.alertsAndNotifications);

const settings = reactive({
    passwordChange: {
        email: userSettings.value?.passwordChange?.email || false,
        app: userSettings.value?.passwordChange?.app || false,
    },
    newProducts: {
        email: userSettings.value?.newProducts?.email || false,
        app: userSettings.value?.newProducts?.app || false,
    },
    hotDeals: { email: userSettings.value?.hotDeals?.email || false, app: userSettings.value?.hotDeals?.app || false },
    outOfStock: {
        email: userSettings.value?.outOfStock?.email || false,
        app: userSettings.value?.outOfStock?.app || false,
    },
    priceChange: {
        email: userSettings.value?.priceChange?.email || false,
        app: userSettings.value?.priceChange?.app || false,
    },
    shippingUpdates: {
        email: userSettings.value?.shippingUpdates?.email || false,
        app: userSettings.value?.shippingUpdates?.app || false,
    },
    pendingAgents: {
        email: userSettings.value?.pendingAgents?.email || false,
        app: userSettings.value?.pendingAgents?.app || false,
    },
});

watch(
    () => getUserDetails.value.adminSettings?.alertsAndNotifications,
    (newSettings) => {
        if (newSettings) {
            Object.assign(settings, newSettings);
        }
    },
    { deep: true, immediate: true }
);
</script>

<template>
    <section class="flex flex-col self-stretch p-6 text-sm leading-6 bg-white rounded-xl shadow-l text-neutral-800 max-md:px-5">
        <h2 class="self-start text-xl font-semibold leading-7">Alerts and Notifications</h2>
        <p class="self-start mt-4">Change to alerts and notification settings.</p>
        <div class="flex gap-5 justify-between self-end mt-8 max-w-full whitespace-nowrap w-[123px]">
            <span>Email</span>
            <span class="text-center">App</span>
        </div>
        <AlertsItem
            v-model:email="settings.passwordChange.email"
            v-model:app="settings.passwordChange.app"
            :alert-key="'passwordChange'"
            :title="AlertAndNotificationType.passwordChange"
        />
        <AlertsItem
            v-model:email="settings.newProducts.email"
            v-model:app="settings.newProducts.app"
            :alert-key="'newProducts'"
            title="New Products"
        />
        <AlertsItem v-model:email="settings.hotDeals.email" v-model:app="settings.hotDeals.app" :alert-key="'hotDeals'" title="HOT Deals" />
        <AlertsItem
            v-model:email="settings.outOfStock.email"
            v-model:app="settings.outOfStock.app"
            :alert-key="'outOfStock'"
            title="Cart Items - Out of Stock"
        />
        <AlertsItem
            v-model:email="settings.priceChange.email"
            v-model:app="settings.priceChange.app"
            :alert-key="'priceChange'"
            title="Cart Items - Price Update"
        />
        <AlertsItem
            v-model:email="settings.shippingUpdates.email"
            v-model:app="settings.shippingUpdates.app"
            :alert-key="'shippingUpdates'"
            title="Order Shipping Updates"
        />
        <AlertsItem
            v-if="getUserDetails.accountType === AccountType.Business"
            v-model:email="settings.pendingAgents.email"
            v-model:app="settings.pendingAgents.app"
            :alert-key="'pendingAgents'"
            title="Pending Agents"
        />
    </section>
</template>

<style scoped></style>
