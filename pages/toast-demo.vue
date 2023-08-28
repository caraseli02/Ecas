<template>
    <div class="grid grid-cols-1 gap-10 container py-20">
        <ToastMessage type="info" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
        <ToastMessage type="warning" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
        <ToastMessage type="success" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
        <ToastMessage type="error" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Testing',
});
</script>
