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
            <DashboardControlPanelTransactionHistoryView
                v-else-if="activeView === ControlPanelTabsEnum.TransactionHistory"
                :id="route.params.slug"
            />
            <DashboardControlPanelBillingView v-else-if="activeView === ControlPanelTabsEnum.Billing" />
        </div>
        <DashboardControlPanelSettingsView v-if="activeView === ControlPanelTabsEnum.Settings" />
    </div>
</template>

<script setup lang="ts">
import { ControlPanelTabs, ControlPanelTabsEnum } from '~/types/dashboard/control-panel';
import { UserDetails } from '~/types/auth/user-details';
import { useNuxtApp } from '#app';
import { AccountType } from '~/types';

const { $api } = useNuxtApp();

const route = useRoute();
const router = useRouter();

const activeView = computed(() => {
    return route.params.view as ControlPanelTabs;
});

const customerDetails = ref({} as UserDetails);

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
        data: UserDetails;
    };

    if (response.status !== 'success') {
        return;
    }

    customerDetails.value = response.data;
};

await fetchInformation();

definePageMeta({
    layout: 'dashboard',
});
</script>