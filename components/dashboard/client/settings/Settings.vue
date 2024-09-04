<script setup lang="ts">
import Details from './Details.vue';
import Shipping from './Shipping.vue';
import Billing from './Billing.vue';
import Payments from './Payments.vue';
import Credit from './Credit.vue';
import Security from './Security.vue';
import Alerts from './Alerts.vue';
import Marketing from './Marketing.vue';

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
    <Marketing />
</template>

<style scoped lang="postcss"></style>
