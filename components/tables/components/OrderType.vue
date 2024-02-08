<template>
  <div class='flex w-[154px] items-center'>
    <span :class="status?.icon.bg" class="h-4 w-4 mr-1 rounded-full text-xs text-white flex justify-center items-center">
      {{ status?.icon.text }}
    </span>
    {{ status?.label }}

  </div>
</template>

<script setup lang="ts">
const orderType = [
  {
    'value': 'stock_order',
    'label': 'Stock Order',
    'icon': {
      bg: 'bg-green-500',
      text: 'S',
    }
  },
  {
    'value': 'back_order',
    'label': 'Back Order',
    'icon': {
      bg: 'bg-purple-500',
      text: 'B',
    }
  },
  {
    'value': 'mixed_order',
    'label': 'Mixed Order',
    'icon': {
      bg: 'bg-blue-500',
      text: 'M',
    }
  }
];

const props = defineProps<{
  type: string
}>()

const status = computed(() => {
  return orderType.find(
    status => status.value === props.type,
  )
})
</script>

<style scoped>
</style>
