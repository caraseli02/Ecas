<template>
    <div class="w-[1488px] max-w-full p-4 mx-auto transition-all duration-300 md:py-6 2xl:px-6">
        <div class="flex justify-center text-center text-xs leading-normal text-gray-300 mt-6">
            Made with <HeartIcon class="w-[18px] h-[18px] mx-1 mt-px" /> by
            <a href="#" target="_blank" rel="noopener noreferrer" class="ml-1 transition-colors duration-300 hover:text-blue">
                Nezo Digital
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeartIcon from '@/assets/icons/dashboard/heart.svg';

useHead({
    title: 'Dashboard',
});

definePageMeta({
    layout: 'dashboard',
});
</script>
