<template>
  <div
    class="rounded-lg overflow-hidden border-l-8 bg-white max-w-full w-[360px] shadow-card md:w-[560px] lg:w-[680px]"
    :class="[
      type === 'info'
        ? 'border-blue'
        : type === 'warning'
        ? 'border-yellow'
        : type === 'success'
        ? 'border-green'
        : 'border-red',
    ]"
  >
    <div class="flex items-center space-x-4 px-4">
      <div
        class="flex items-center justify-center w-10 h-10 rounded-full text-white"
        :class="[
          type === 'info'
            ? 'bg-blue'
            : type === 'warning'
            ? 'bg-yellow'
            : type === 'success'
            ? 'bg-green'
            : 'bg-red',
        ]"
      >
        <InfoIcon v-if="type === 'info'" class="w-6 h-6" />
        <WarningIcon v-else-if="type === 'warning'" class="w-6 h-6" />
        <SuccessIcon v-else-if="type === 'success'" class="w-6 h-6" />
        <ErrorIcon v-else class="w-6 h-6" />
      </div>
      <div class="flex-1 py-4">
        <div class="capitalize leading-tight font-semibold mb-1">
          {{ title || type }}
        </div>
        <div class="text-sm leading-[1.43]">
          {{ content }}
        </div>
      </div>
      <button
        class="rounded w-8 h-8 bg-[#F2F2F2] flex items-center justify-center text-gray-100 transition-colors duration-300 hover:text-gray-300"
        @click="$emit('close')"
      >
        <XIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import XIcon from "@/assets/icons/x.svg";
import InfoIcon from "@/assets/icons/info-circle.svg";
import WarningIcon from "@/assets/icons/triangle.svg";
import SuccessIcon from "@/assets/icons/check-circle.svg";
import ErrorIcon from "@/assets/icons/error.svg";

defineProps({
  type: {
    type: String as PropType<"info" | "warning" | "success" | "error">,
    required: false,
    default: "info",
  },
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
});

defineEmits(["close"]);
</script>
