<template>
    <p>Payment failed {{ failReason }}</p>
</template>

<script setup lang="ts">
const route = useRoute();
const failReason = ref('N/A');

onMounted(() => {
    console.log(route.params);
    failReason.value = route.params.failReason as string;
});
</script>
