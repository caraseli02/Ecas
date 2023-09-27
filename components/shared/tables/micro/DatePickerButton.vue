<template>
  <div>
    <button
      class="flex items-center justify-between relative w-full border rounded-lg px-3 py-[7px] bg-white transition-colors duration-300"
      :class="[
        !range.start && !range.end ? 'text-gray-100' : '',
        datePickerVisible ? 'border-blue' : 'border-border',
      ]" @click="handleShow">
      <span class="text-sm tracking-[-0.02em] flex-shrink-0 mr-1">
        {{
          range.start && range.end
          ? `${formattedDate(range.start)} - ${formattedDate(range.end)}`
          : '23/9/2023 - 23/9/2023'
        }}
      </span>
      <CalendarIcon class="w-5 h-5 text-gray-300 flex-shrink-0" />
    </button>
  </div>
</template>
<script lang="ts">
import CalendarIcon from '@/assets/icons/dashboard/calendar.svg';

export default defineComponent({
  name: 'DatePickerButton',
  props: ['range', 'datePickerVisible'],
  components: {
    CalendarIcon,
  },
  methods: {
    formattedDate(date: Date) {
      return new Date(date).toLocaleDateString('en-GB');
    },
    handleShow(event: MouseEvent) {
      this.$emit('showDatePicker', event);
    },
  },
});
</script>