<template>
  <UiSelect :default-value="statuses[0].value">
    <UiSelectTrigger class="w-[150px] h-8">
      <UiSelectValue placeholder="Order Status" />
    </UiSelectTrigger>
    <UiSelectContent>
      <UiSelectGroup>
        <UiSelectItem class="p-2" v-for="status in statuses" :key="status.value" :value="status.value">
          <div class="flex items-center gap-2">
          <p class="w-3 h-3 rounded-full" :class="status.color" />
          {{ status.label }}
          </div>
        </UiSelectItem>
      </UiSelectGroup>
    </UiSelectContent>
  </UiSelect>
</template>

<script setup lang="ts">
const statuses = ref([
{
  value: 'completed',
  label: 'Completed',
  color: 'bg-green-500'
},  
{
  value: 'pending',
  label: 'Pending',
  color: 'bg-orange-500'
},
{
  value: 'processing',
  label: 'Processing',
  color: 'bg-purple-500'
},
{
  value: 'dispatched',
  label: 'Dispatched',
  color: 'bg-blue-500'
},
{
  value: 'delivered',
  label: 'Delivered',
  color: 'bg-blue-500'
},
{
  value: 'cancelled',
  label: 'Cancelled',
  color: 'bg-red-500'
}
])
</script>

<style scoped></style>
