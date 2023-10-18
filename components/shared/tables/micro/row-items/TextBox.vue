<template>
    <SkeletonLoader v-if="loading" class="w-full h-6" />
    <div v-else :class="customClass"> {{ text }}</div>
</template>
<script lang="ts">
import SkeletonLoader from '~/components/global/SkeletonLoader.vue';

export default defineComponent({
    name: 'TextBox',
    props: ['text', 'loading', 'customClass'],
    components: {
        SkeletonLoader,
    },
});
</script>