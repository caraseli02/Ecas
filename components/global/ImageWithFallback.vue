<template>
  <div :class="className" class="relative inline-block">
    <img
      v-if="currentSrc !== 'fallback'"
      :src="currentSrc"
      :alt="alt"
      :class="className"
      @error="handleError"
      loading="lazy"
    />
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      :class="className"
      class="w-full h-full fill-gray-300"
    >
      <!-- Component body -->
      <rect x="25" y="30" width="50" height="40" rx="5" class="fill-gray-400" />

      <!-- Pins -->
      <line x1="20" y1="35" x2="25" y2="35" class="stroke-gray-500" stroke-width="2" />
      <line x1="20" y1="50" x2="25" y2="50" class="stroke-gray-500" stroke-width="2" />
      <line x1="20" y1="65" x2="25" y2="65" class="stroke-gray-500" stroke-width="2" />
      <line x1="75" y1="35" x2="80" y2="35" class="stroke-gray-500" stroke-width="2" />
      <line x1="75" y1="50" x2="80" y2="50" class="stroke-gray-500" stroke-width="2" />
      <line x1="75" y1="65" x2="80" y2="65" class="stroke-gray-500" stroke-width="2" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: false,
    default: null,
  },
  alt: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
});

const currentSrc = ref<string | 'fallback'>(props.src || 'fallback');

watch(
  () => props.src,
  (newSrc) => {
    currentSrc.value = newSrc || 'fallback';
  },
);

function handleError() {
  currentSrc.value = 'fallback';
}
</script>

<style scoped>
/* Add any extra styling here */
</style>
