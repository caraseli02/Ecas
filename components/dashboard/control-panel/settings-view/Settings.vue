<template>
  <div class="bg-white rounded-xl p-4 shadow-xs md:p-6 xl:order-1">
    <div class="mb-6 md:mb-9">
      <h2 class="text-xl leading-[1.4] font-semibold">Customer Settings</h2>
    </div>
    <div class="grid grid-cols-1 gap-6 md:gap-9">
      <div class="border border-border rounded-xl p-4 md:p-6">
        <h3 class="leading-[1.5] font-semibold mb-4">Alerts and Notifications</h3>
        <p class="text-sm leading-[1.71] mb-8">Change to alerts and notification settings.</p>
        <div class="grid grid-cols-1 gap-6">
          <div class="grid grid-cols-[1fr,50px,50px]">
            <div/>
            <div class="text-sm leading-[1.71] text-center">Email</div>
            <div class="text-sm leading-[1.71] text-right">App</div>
          </div>
          <div v-for="(item, index) in alertsAndNotifications" :key="index" class="grid grid-cols-[1fr,50px,50px]">
            <div class="text-sm leading-[1.71] text-left">{{ item.label }}</div>
            <div class="flex justify-center">
              <label class="flex cursor-pointer">
                <input
                    :value="item.email" type="checkbox" class="sr-only"
                    @change="item.email = !item.email; markSettingAsRead(item,'email')"/>
                <div
                    class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
                    :class="[
                                        item.email
                                            ? 'bg-blue border-blue group-hover:bg-white'
                                            : 'bg-white  border-border group-hover:border-gray-300',
                                    ]"
                >
                  <CheckIcon
                      v-if="item.email"
                      class="w-4 text-white transition-colors duration-300 group-hover:text-blue"
                  />
                </div>
              </label>
            </div>
            <div class="flex justify-end">
              <label class="flex cursor-pointer">
                <input
                    :value="item.app" type="checkbox" class="sr-only"
                    @change="item.app = !item.app; markSettingAsRead(item,'app')"/>
                <div
                    class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
                    :class="[
                                        item.app
                                            ? 'bg-blue border-blue group-hover:bg-white'
                                            : 'bg-white  border-border group-hover:border-gray-300',
                                    ]"
                >
                  <CheckIcon
                      v-if="item.app"
                      class="w-4 text-white transition-colors duration-300 group-hover:text-blue"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="border border-border rounded-xl p-4 md:p-6">
        <h3 class="leading-[1.5] font-semibold mb-4">Security</h3>
        <p class="text-sm leading-[1.71] mb-8">Send a password reset link.</p>
        <form class="md:grid md:items-end md:grid-cols-[1fr,auto] md:gap-4" @submit.prevent="">
          <FormInput
              v-model="securityEmail"
              label="Account Email"
              placeholder="madalina.dobrovolski@company.com"
              size="lg"
              class="max-md:mb-4"
          />
          <button
              class="flex items-center justify-center w-full bg-blue rounded-lg px-6 py-2.5 text-white"
              @:click="resetPassword(securityEmail)">
            <SecurityUserIcon class="w-6 h-6 mr-2"/>
            <span class="text-sm leading-[1.71] font-medium"> Send Password Reset </span>
          </button>
        </form>
      </div>
      <div class="border border-border rounded-xl p-4 md:p-6">
        <h3 class="leading-[1.5] font-semibold mb-8">Marketing Preferences</h3>
        <div class="grid grid-cols-1 gap-6">
          <div v-for="(item, index) in marketingPreferences" :key="index" class="flex items-center justify-between">
            <div class="text-sm leading-[1.71] text-left">{{ item.label }}</div>
            <label class="flex cursor-pointer">
              <input
                  :value="item.email" type="checkbox" class="sr-only"
                  @change="item.email = !item.email; markSettingAsRead(item,'email')"/>
              <div
                  class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
                  :class="[
                                    item.email
                                        ? 'bg-blue border-blue group-hover:bg-white'
                                        : 'bg-white  border-border group-hover:border-gray-300',
                                ]"
              >
                <CheckIcon
                    v-if="item.email"
                    class="w-4 text-white transition-colors duration-300 group-hover:text-blue"
                />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckIcon from '@/assets/icons/check.svg';
import SecurityUserIcon from '@/assets/icons/dashboard/security-user.svg';
import {useNuxtApp} from '#app';
import {
  AccountAdminSettings,
  AlertAndNotificationLabelsEnum,
  MarketingPreferencesEnum
} from '~/types/auth/account-settings';

const {$api} = useNuxtApp();
const alertsAndNotifications = ref([
  {
    label: AlertAndNotificationLabelsEnum.newProducts,
    key: 'newProducts',
    email: false,
    app: false,
  },
  {
    label: AlertAndNotificationLabelsEnum.hotDeals,
    key: 'hotDeals',
    email: false,
    app: false,
  },
  {
    label: AlertAndNotificationLabelsEnum.outOfStock,
    key: 'outOfStock',
    email: false,
    app: false,
  },
  {
    label: AlertAndNotificationLabelsEnum.priceChange,
    key: 'priceChange',
    email: false,
    app: false,
  },
  {
    label: AlertAndNotificationLabelsEnum.shippingUpdates,
    key: 'shippingUpdates',
    email: false,
    app: false,
  },
]);
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const getCustomerSettings = async () => {
  if (!props.id) {
    return;
  }
  const response = (await $api.controlPanel.fetchCustomerSettings(props.id))

  if (response.status !== 'success') {
    return;
  }

  const settings = response.description.adminSettings as AccountAdminSettings;

  if (!settings.alertsAndNotifications || !settings.marketingPreferences) {
    return;
  }
  marketingPreferences.value.forEach(preference => {
    preference.email = (settings?.marketingPreferences as any)[preference.key]?.email || false;
    preference.app = (settings?.marketingPreferences as any)[preference.key]?.app || false
  })
  alertsAndNotifications.value.forEach(alert => {
    alert.email = (settings?.alertsAndNotifications as any)[alert.key]?.email || false;
    alert.app = (settings?.alertsAndNotifications as any)[alert.key]?.app || false
  })
}

const securityEmail = ref('');
const marketingPreferences = ref([
  {
    label: MarketingPreferencesEnum.cookiesPolicy,
    key: 'cookiesPolicy',
    email: false,
    app: false,
  },
  {
    label: MarketingPreferencesEnum.newsletter,
    key: 'newsletter',
    email: false,
    app: false,
  },
  {
    label: MarketingPreferencesEnum.eMailMarketing,
    key: 'emailMarketing',
    email: false,
    app: false,
  },
]);
const markSettingAsRead = async (item: object, type: string) => {
  if (!props.id || !type || !item) {
    return;
  }
  console.log(props.id, item, type);
  await $api.controlPanel.markSettingsAsRead(item, type, props.id)
}
await getCustomerSettings()

const resetPassword = async (email: string) => {
  if (!email) {
    return;
  }
  const response = await $api.user.resetPasswordLink(email);

  if (response.status !== 'success') {
    return;
  }
};


</script>
