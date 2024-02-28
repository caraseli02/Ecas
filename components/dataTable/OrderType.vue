<template>
  <div class='flex min-w-[106px] items-center'>
    <span :class="status?.icon.bg" class="h-4 w-4 mr-2 rounded-full text-xs text-white flex justify-center items-center">
      {{ status?.icon.text }}
    </span>
    {{ status?.label }}
  </div>
</template>

<script setup lang="ts">
import { OrderType } from '~/types/order-summary/item'
import { getOrderById } from '~/types/order-summary/item'

const orderType = {
  0 : {
    'value': 'stock_order',
    'label': 'Stock Order',
    'icon': {
      bg: 'bg-green-500',
      text: 'S',
    }
  },
  1 : {
    'value': 'back_order',
    'label': 'Back Order',
    'icon': {
      bg: 'bg-purple-500',
      text: 'B',
    }
  },
  2 : {
    'value': 'mixed_order',
    'label': 'Mixed Order',
    'icon': {
      bg: 'bg-blue-500',
      text: 'M',
    }
  }
}

const props = defineProps<{
  type: number,
}>()

const status = computed(() => orderType[props.type as keyof typeof orderType])

onMounted(() => {
  const test = getOrderById(props.type)
  console.log(test);
  
})
</script>

<style scoped>
</style>
