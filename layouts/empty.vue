<template>
  <div>
    <main>
      <slot/>
    </main>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';

const calcViewportHeight = () => {
  if (typeof window !== 'undefined') {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    window.addEventListener(
        'resize',
        _.debounce(function () {
          document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        }, 100)
    );
    window.addEventListener(
        'orientationchange',
        _.debounce(function () {
          document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        }, 100)
    );
  }
};

onMounted(() => {
  calcViewportHeight();
});
</script>
