<script setup lang="ts">
import Details from './Details.vue'
import Shipping from './Shipping.vue'
import Billing from './Billing.vue'
import Credit from './Credit.vue'
import Security from './Security.vue'
import Alerts from './Alerts.vue'

const newsletterSubscription = ref(false)
</script>

<template>
  <Details />
  <Shipping />
  <Billing />
  <Credit />
  <Security />
  <Alerts />
  <section class="flex flex-col self-stretch p-6 bg-white rounded-xl shadow-l max-md:px-5">
    <h2 class="text-xl font-semibold leading-7 text-neutral-800 max-md:max-w-full">
      Marketing Preferences
    </h2>
    <div class="flex gap-5 justify-between mt-8 max-md:flex-wrap max-md:max-w-full">
      <p class="text-sm leading-6 text-neutral-800">Subscribe to Newsletter</p>
      <div
        class="flex justify-center items-center p-px my-auto bg-sky-500 rounded h-[18px] w-[18px]"
        role="checkbox"
        tabindex="0"
      >
      <input :id="`${title}-app`" v-model="newsletterSubscription" type="checkbox" class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">
</style>
