<script setup lang="ts">
import orders from './data/orders.json'
import DataTable from './components/DataTable.vue'
import { columns } from './components/columns'
</script>

<template>
  <div class="h-full flex-1 flex-col space-y-8 flex">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          Orders List
        </h2>
      </div>
    </div>
    <DataTable :data="orders" :columns="columns" />
  </div>
</template>
