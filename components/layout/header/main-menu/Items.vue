<script setup lang="ts">
import DesktopPopover from './DesktopPopover.vue';
import MobileSheet from './MobileSheet.vue';

defineProps<{ isScrolled: boolean }>();
</script>

<template>
    <DesktopPopover :is-scrolled="isScrolled" class="hidden lg:block" />
    <ClientOnly>
        <MobileSheet :is-scrolled="isScrolled" class="lg:hidden" />
    </ClientOnly>
</template>
