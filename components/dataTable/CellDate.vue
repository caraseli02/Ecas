<template>
    <div class="min-w-[171px]">{{ formattedDate }}</div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import moment from 'moment';

const props = defineProps<{
    inputDateString: string;
}>();

const formattedDate = computed(() => {
    // const date = new Date(props.inputDateString);
    const date = moment(props.inputDateString).format('DD MMMM YYYY HH:mm');

    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit', // Numeric day (with leading zero if needed)
        month: 'long', // Full month name
        year: 'numeric', // Full year
        hour: '2-digit', // 24-hour format
        minute: '2-digit',
        timeZone: 'UTC', // Keep UTC if this is important
    };

    return date; // Use 'en-GB' locale
});
</script>
