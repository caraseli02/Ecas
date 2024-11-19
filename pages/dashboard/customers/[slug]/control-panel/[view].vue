<template>
    <div>
        <div v-if="activeView !== ControlPanelTabsEnum.Settings" class="bg-white rounded-xl px-4 py-6 shadow-xs md:px-6">
            <DashboardControlPanelOrganizationView
                v-if="activeView === ControlPanelTabsEnum.Organization && customerDetails.accountType !== AccountType.Personal"
                :id="route.params.slug"
                :account="customerDetails"
            />
            <DashboardControlPanelAccountView
                v-else-if="activeView === ControlPanelTabsEnum.Account && customerDetails.accountType === AccountType.Personal"
                :id="route.params.slug"
                :account="customerDetails"
            />
            <DashboardControlPanelShippingView
                v-else-if="activeView === ControlPanelTabsEnum.Shipping"
                :id="route.params.slug"
                :account-type="customerDetails?.accountType"
            />
            <ClientTableTransaction v-else-if="activeView === ControlPanelTabsEnum.TransactionHistory" :user-id="route.params.slug" />
            <DashboardControlPanelBillingView
                v-else-if="activeView === ControlPanelTabsEnum.Billing"
                :id="route.params.slug"
                :account-type="customerDetails?.accountType"
            />
        </div>
        <DashboardControlPanelSettingsView v-if="activeView === ControlPanelTabsEnum.Settings" />
    </div>
</template>

<script setup lang="ts">
import { ControlPanelTabs, ControlPanelTabsEnum } from '~/types/dashboard/control-panel';
import { UserInterface } from '~/types/auth/user-interface';
import { useNuxtApp } from '#app';
import { AccountType } from '~/types';

const { $api } = useNuxtApp();

const route = useRoute();
const router = useRouter();

const activeView = computed(() => {
    return route.params.view as ControlPanelTabs;
});

const customerDetails = ref({} as UserInterface);

onMounted(() => {
    if (!Object.values(ControlPanelTabsEnum).includes(route.params.view as ControlPanelTabsEnum)) {
        router.replace({
            path: `/dashboard/customers/${route.params.slug}/control-panel/${ControlPanelTabsEnum.Organization}`,
        });
    } else {
        if (customerDetails.value.accountType === AccountType.Personal && route.params.view === ControlPanelTabsEnum.Organization) {
            router.replace({
                path: `/dashboard/customers/${route.params.slug}/control-panel/${ControlPanelTabsEnum.Account}`,
            });
        } else if (customerDetails.value.accountType !== AccountType.Personal && route.params.view === ControlPanelTabsEnum.Account) {
            router.replace({
                path: `/dashboard/customers/${route.params.slug}/control-panel/${ControlPanelTabsEnum.Organization}`,
            });
        }
    }
});

const fetchInformation = async () => {
    if (!route.params.slug) {
        return;
    }

    const response = (await $api.customerProfile.fetchCustomerInformation(route.params.slug as string)) as {
        status: string;
        data: UserInterface;
    };

    if (response.status !== 'success') {
        return;
    }

    customerDetails.value = response.data;
};

await fetchInformation();

definePageMeta({
    middleware: 'auth',
    layout: 'dashboard',
});
</script>
