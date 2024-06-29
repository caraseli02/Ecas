<template>
  <div class="flex w-full items-center gap-1.5">
    <UiInput v-model="localCode" type="text" placeholder="Product Code" @input="emitUpdate" />
    <QuantityButtons v-model="localQuantity" class="w-full" size="lg" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { QuickBuyItem } from '~/types/product';

const localQuantity = ref(1)

const props = defineProps<QuickBuyItem>();
const localCode = ref(props.code);

const emits = defineEmits(['updateProduct']);

const emitUpdate = () => {
  emits('updateProduct', { index: props.index, code: localCode.value, quantity: localQuantity.value });
};

watch(localQuantity, (newQuantity) => {
  if(newQuantity < 1) localQuantity.value = 1;
  emits('updateProduct', { index: props.index, code: localCode.value, quantity: localQuantity.value });
})

onMounted(() => {
  localQuantity.value = props.quantity;
})
</script>

<style scoped>
</style>
