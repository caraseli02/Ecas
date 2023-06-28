<template>
    <div>
        <main>
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash';

const calcViewportHeight = () => {
    if (typeof window !== 'undefined') {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        window.addEventListener(
            'resize',
            debounce(function () {
                document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
            }, 100)
        );
        window.addEventListener(
            'orientationchange',
            debounce(function () {
                document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
            }, 100)
        );
    }
};

onMounted(() => {
    calcViewportHeight();
});
</script>
