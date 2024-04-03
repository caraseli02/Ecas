<template>
  <div class="min-w-[171px]">{{ formattedDate }}</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  inputDateString: string;
}>()

const formattedDate = computed(() => {
  const date = new Date(props.inputDateString);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',       // Numeric day (with leading zero if needed)
    month: 'long',        // Full month name
    year: 'numeric',      // Full year 
    hour: '2-digit',      // 24-hour format
    minute: '2-digit',
    timeZone: 'UTC',      // Keep UTC if this is important
  };

  return date.toLocaleString('en-GB', options).replace(' at ', ', '); // Use 'en-GB' locale
});
</script>
