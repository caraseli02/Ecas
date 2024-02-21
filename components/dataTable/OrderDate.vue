<template>
  <div class="min-w-[171px]">{{ formattedDate }}</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  inputDateString: string;
}>()

const formattedDate = computed(() => {
  // Create a Date object from the input string
  const date = new Date(props.inputDateString);

  // Define options for formatting
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  };

  // Format the date using toLocaleString
  return date.toLocaleString('en-US', options);
});
</script>
