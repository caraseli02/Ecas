<script setup lang="ts">
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';
import DesktopPopover from './DesktopPopover.vue';
import MobileSheet from './MobileSheet.vue';

defineProps<{ isScrolled: boolean }>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const lgAndLarger = breakpoints.greaterOrEqual('lg');
</script>

<template>
  <component
    :is="lgAndLarger ? DesktopPopover : MobileSheet"
    :is-scrolled="isScrolled"
  />
</template>
