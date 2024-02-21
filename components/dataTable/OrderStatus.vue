<template>
  <div class='flex min-w-[174px] items-center'>
    <span :class="status?.color" class="h-4 w-4 mr-1 rounded-full text-xs text-white flex justify-center items-center">
    </span>
    {{ status?.label }}

  </div>
</template>

<script setup lang="ts">
import {statuses} from './data/data'
const props = defineProps<{
  status: string
}>()

const status = computed(() => {
  return statuses.find(
    status => status.label === props.status,
  )
})
</script>

<style scoped>
</style>
