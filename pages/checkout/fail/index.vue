<template>
    <p>Payment failed. Reason: {{ getPreviousCheckoutError?.message }}</p>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cartStore';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();
const { getPreviousCheckoutError } = storeToRefs(cartStore);
</script>