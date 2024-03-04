<template>
  <div class='flex min-w-[174px] items-center'>
    <span :class="status?.color" class="h-3 w-3 mr-2 rounded-full text-xs text-white flex justify-center items-center">
    </span>
    {{ status?.label }}

  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  status: string
  statuses: {
    value: string;
    label: string;
    color: string;
}[]
}>()

const status = computed(() => {
  return props.statuses.find(
    status => status.label === props.status,
  )
})
</script>

<style scoped>
</style>
