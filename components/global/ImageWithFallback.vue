<template>
    <div :class="className" class="relative inline-block">
        <img v-if="currentSrc !== 'fallback'" :src="currentSrc" :alt="alt" :class="mediaClass" @error="handleError" loading="lazy" />
        <svg v-else viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" :class="['full-size-svg', mediaClass]">
            <path
                d="M33.3752 16.6668V8.3335M50.0002 16.6668V8.3335M66.6668 16.6668V8.3335M83.3335 33.3335H91.6668M83.3335 50.0002H91.6668M83.3335 66.6668H91.6668M66.6668 83.3335V91.6668M50.0418 83.3335V91.6668M33.3752 83.3335V91.6668M8.3335 33.3335H16.6668M8.3335 50.0002H16.6668M8.3335 66.6668H16.6668M18.3335 71.6668L34.9114 59.3679C37.5678 57.3986 41.4013 57.6215 43.7887 59.8881L44.8984 60.9656C47.5213 63.4552 51.7582 63.4552 54.3811 60.9656L68.3697 47.7006C70.9926 45.2111 75.2295 45.2111 77.8524 47.7006L83.3335 52.9026M40.0002 83.3335H60.0002C76.6668 83.3335 83.3335 76.6668 83.3335 60.0002V40.0002C83.3335 23.3335 76.6668 16.6668 60.0002 16.6668H40.0002C23.3335 16.6668 16.6668 23.3335 16.6668 40.0002V60.0002C16.6668 76.6668 23.3335 83.3335 40.0002 83.3335ZM45.8335 37.5002C45.8335 42.1025 42.1025 45.8335 37.5002 45.8335C32.8978 45.8335 29.1668 42.1025 29.1668 37.5002C29.1668 32.8978 32.8978 29.1668 37.5002 29.1668C42.1025 29.1668 45.8335 32.8978 45.8335 37.5002Z"
                stroke="#D3D3D3"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    </div>
</template>

<script setup lang="ts">
const attrs = useAttrs();

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

const mediaClass = computed(() => [props.className, attrs.class]);

const currentSrc = ref<string | 'fallback'>(props.src || 'fallback');

watch(
    () => props.src,
    (newSrc) => {
        currentSrc.value = newSrc || 'fallback';
    }
);

function handleError() {
    currentSrc.value = 'fallback';
}
</script>

<style scoped>
.full-size-svg {
    width: 100%;
    height: 100%;
}
</style>
