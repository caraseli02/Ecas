<script setup lang="ts">
import autoAnimate from '@formkit/auto-animate'

const smartPricing = ref(true);
const el = ref();

onMounted(() => {
  autoAnimate(el.value) // thats it!
})
</script>

<template>
  <section ref="el">
  <div class="flex items-center justify-between space-x-2 mb-6">
    <UiLabel for="airplane-mode">Smart Pricing</UiLabel>
    <UiSwitch id="airplane-mode" v-model:checked="smartPricing" />
  </div>
  <div v-if="smartPricing">
    <CategoriesSelectEntryPrice title="Entry Price" />
    <CategoriesSelectEntryPrice title="Quantity" />
    <CategoriesSelectEntryPrice title="Margin" />
  </div>
</section>
</template>
