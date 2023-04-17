<template>
  <div
    @click="showTooltipContent = true"
    @mouseenter="showTooltipContent = true"
    @mouseleave="showTooltipContent = false"
    v-click-outside="() => (showTooltipContent = false)"
    class="relative"
  >
    <slot />
    <Transition name="fade">
      <div
        v-if="showTooltipContent"
        class="absolute bg-gray-300 rounded p-2 text-xs leading-tight font-Inter text-white min-w-max"
        :class="[
          position === 'left'
            ? 'top-1/2 -left-2 -translate-x-full -translate-y-1/2'
            : '',
        ]"
      >
        <slot name="content"></slot>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 11 16"
          class="absolute w-[18px] h-3"
          :class="[
            position === 'left' ? 'top-1/2 -right-3 -translate-y-1/2' : '',
          ]"
        >
          <path
            fill="#5E6278"
            d="M9.867 6.4a2 2 0 0 1 0 3.2l-6.667 5c-1.318.989-3.2.048-3.2-1.6V3C0 1.352 1.882.411 3.2 1.4l6.667 5Z"
          />
        </svg>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  position: {
    type: String as PropType<"left">,
    required: false,
    default: "left",
  },
});

const showTooltipContent = ref(false);
</script>
