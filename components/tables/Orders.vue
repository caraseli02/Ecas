<script setup lang="ts">
import tasks from './data/tasks.json'
import DataTable from './components/DataTable.vue'
import UserNav from './components/UserNav.vue'
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
    <DataTable :data="tasks" :columns="columns" />
  </div>
</template>
