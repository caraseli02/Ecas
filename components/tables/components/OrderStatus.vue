<template>
  <div class='flex w-[202px] items-center'>
    <span :class="status?.icon" class="h-4 w-4 mr-1 rounded-full text-xs text-white flex justify-center items-center">
    </span>
    {{ status?.label }}

  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  status: string
}>()

const statuses = [
  {
    'value': 'abandoned_checkout',
    'label': 'Abandoned Checkout',
    'icon': 'bg-gray-800'
  },
  {
    'value': 'awaiting_payment',
    'label': 'Awaiting Payment',
    'icon': 'bg-orange-500'
  },
  {
    'value': 'partially_refunded',
    'label': 'Partially Refunded',
    'icon': 'bg-purple-500'
  },
  {
    'value': 'completed',
    'label': 'Completed',
    'icon': 'bg-green-500'
  },
  {
    'value': 'partially_shipped',
    'label': 'Partially Shipped',
    'icon': 'bg-blue-500'
  },
  {
    'value': 'processing',
    'label': 'Processing',
    'icon': 'bg-purple-500'
  },
  {
    'value': 'awaiting_fulfillment',
    'label': 'Awaiting Fulfillment',
    'icon': 'bg-orange-500'
  }
];

const status = computed(() => {
  return statuses.find(
    status => status.label === props.status,
  )
})
</script>

<style scoped>
</style>
