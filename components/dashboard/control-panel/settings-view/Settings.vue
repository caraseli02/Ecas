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
                        <div />
                        <div class="text-sm leading-[1.71] text-center">Email</div>
                        <div class="text-sm leading-[1.71] text-right">App</div>
                    </div>
                    <div v-for="(item, index) in alertsAndNotifications" :key="index" class="grid grid-cols-[1fr,50px,50px]">
                        <div class="text-sm leading-[1.71] text-left">{{ item.label }}</div>
                        <div class="flex justify-center">
                            <label class="flex cursor-pointer">
                                <input :value="item.email" type="checkbox" class="sr-only" @change="item.email = !item.email" />
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
                                <input :value="item.app" type="checkbox" class="sr-only" @change="item.app = !item.app" />
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
                <form @submit.prevent="" class="md:grid md:items-end md:grid-cols-[1fr,auto] md:gap-4">
                    <FormInput
                        v-model="securityEmail"
                        label="Account Email"
                        placeholder="madalina.dobrovolski@company.com"
                        size="lg"
                        class="max-md:mb-4"
                    />
                    <button class="flex items-center justify-center w-full bg-blue rounded-lg px-5 py-2.5 text-white">
                        <SecurityUserIcon class="w-6 h-6 mr-2" />
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
                            <input :value="item.checked" type="checkbox" class="sr-only" @change="item.checked = !item.checked" />
                            <div
                                class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
                                :class="[
                                    item.checked
                                        ? 'bg-blue border-blue group-hover:bg-white'
                                        : 'bg-white  border-border group-hover:border-gray-300',
                                ]"
                            >
                                <CheckIcon
                                    v-if="item.checked"
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

const alertsAndNotifications = ref([
    {
        label: 'New Products',
        email: false,
        app: false,
    },
    {
        label: 'Out of stock',
        email: false,
        app: false,
    },
    {
        label: 'Price change',
        email: false,
        app: false,
    },
    {
        label: 'HOT Deals',
        email: false,
        app: false,
    },
    {
        label: 'Shipping Updates',
        email: false,
        app: false,
    },
]);
const securityEmail = ref('');
const marketingPreferences = ref([
    {
        label: 'Cookies Policy Consent',
        checked: false,
    },
    {
        label: 'Subscribed to Newsletter',
        checked: false,
    },
    {
        label: 'E-mail marketing consent',
        checked: false,
    },
]);
</script>
