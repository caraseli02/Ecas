<template>
  <div class='flex min-w-[174px] items-center'>
    <span :class="statusColor" class="h-3 w-3 mr-2 rounded-full text-xs text-white flex justify-center items-center">
    </span>
    {{ status }}

  </div>
</template>

<script setup lang="ts">
import { statusColors } from './options';

const props = defineProps<{
  status: string
}>()

const statusColor = computed(() => {
  return statusColors[props.status as keyof typeof statusColors];
})
</script>

<style scoped>

</style>
