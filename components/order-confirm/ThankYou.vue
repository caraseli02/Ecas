<template>
  <div
    class="w-full h-[300px] md:h-[228px] text-center border border-blue-500 rounded-lg flex items-center justify-center flex-col gap-6 p-6"
  >
    <h4 class="text-xl md:text-3xl">
      Thank you for your order!
    </h4>
    <CheckCircle class="w-16 h-16 text-green-600" />
    <p class="text-sm md:text-base font-regular">
      Your order has been received and is now being processed. Your order details are shown below for you reference.
    </p>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle } from 'lucide-vue-next';
</script>

<style scoped></style>
