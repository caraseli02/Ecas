<template>
  <div class='flex min-w-[174px] items-center'>
    <span :class="colors[statusLable]" class="h-3 w-3 mr-2 rounded-full text-xs text-white flex justify-center items-center">
    </span>
    {{ statusLable }}

  </div>
</template>

<script setup lang="ts">

const colors = {
  Credit: 'bg-blue-500',
  Card: 'bg-green-600',
  Bank: 'bg-neutral-700',
  Cash: 'bg-neutral-700',
  Paid: 'bg-green-600',
  Pending: 'bg-orange-600',
  Canceled: 'bg-rosa-500',
  Declined: 'bg-rosa-500',
}

const props = defineProps<{
  val: string
  options: Record<string, string>
}>()

const statusLable = computed(() => {
  return props.options[props.val];
})
</script>
