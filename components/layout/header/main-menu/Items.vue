<script setup lang="ts">
import DesktopPopover from './DesktopPopover.vue';
import MobileSheet from './MobileSheet.vue';

defineProps<{ isScrolled: boolean }>();
</script>

<template>
  <div class="hidden lg:block">
    <DesktopPopover :is-scrolled="isScrolled" />
  </div>
  <div class="lg:hidden">
    <ClientOnly>
      <MobileSheet :is-scrolled="isScrolled" />
    </ClientOnly>
  </div>
</template>
