<template>
  <div class="flex gap-3 items-center">
    <UiInput v-model="min" placeholder="Min" class="h-10 m-0" @input="updateRange()" />
    -
    <UiInput v-model="max" placeholder="Max" class="h-10 m-0" @input="updateRange()" />
    <UiButton type="button" class="min-w-10 h-10 p-0" variant="secondary" @click="emit('delete')">
      <Trash2Icon class="w-6 h-6" />
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { Trash2Icon } from 'lucide-vue-next';

const props = defineProps<{
  quantity: {
    id: number;
    min: number;
    max: number;
  };
}>();

const emit = defineEmits(['updateRange', 'delete']);
const min = ref(0);
const max = ref(0);

onMounted(() => {
  min.value = props.quantity.min;
  max.value = props.quantity.max;
});

function updateRange() {
  emit('updateRange', { id: props.quantity.id, min: min.value, max: max.value });
}
</script>
