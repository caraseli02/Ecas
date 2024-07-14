<script setup lang="ts">
const props = defineProps<{
  title: string,
}>()

const emailModel = defineModel<boolean>('email')
const appModel = defineModel<boolean>('app')
</script>

<template>
  <div class="flex gap-5 justify-between px-0.5 mt-6 max-md:flex-wrap max-md:max-w-full">
    <span>{{ title }}</span>
    <div class="flex justify-between w-28">
      <input :id="`${title}-email`" v-model="emailModel" type="checkbox" class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      <input :id="`${title}-app`" v-model="appModel" type="checkbox" class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    </div>
  </div>
</template>

<style scoped>

</style>
