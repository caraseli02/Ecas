<script setup lang="ts">
import Details from './Details.vue'
import Shipping from './Shipping.vue'
import Billing from './Billing.vue'
import Payments from './Payments.vue'
import Credit from './Credit.vue'
import Security from './Security.vue'
import Alerts from './Alerts.vue'

const newsletterSubscription = ref(false)

const route = useRoute();

onMounted(() => {
  // check if the query has id to scroll in to view
  setTimeout(() => {
    const scrollToId = route.query.scrollTo;
    if (scrollToId) {
      const element = document.getElementById(scrollToId as string);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    }
  }, 100);

})
</script>

<template>
  <Details />
  <Shipping />
  <Billing />
  <Payments />
  <Credit />
  <Security />
  <Alerts />
  <section class="flex flex-col self-stretch p-4 md:p-6 bg-white rounded-xl shadow-l">
    <h2 class="text-xl font-semibold leading-7 text-neutral-800 max-md:max-w-full">
      Marketing Preferences
    </h2>
    <div class="flex gap-5 justify-between mt-8 max-md:flex-wrap max-md:max-w-full">
      <p class="text-sm leading-6 text-neutral-800">Subscribe to Newsletter</p>
      <div class="flex justify-center items-center my-auto rounded h-5 w-5" role="checkbox" tabindex="0">
        <input id="MarketingPreferences" v-model="newsletterSubscription" type="checkbox"
          class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">
</style>
