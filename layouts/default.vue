<template>
  <div class="flex flex-col min-h-screen">
    <LayoutHeader :is-scrolled="isScrolled"/>
    <main
class="flex flex-col pt-[96px] flex-1 lg:pt-[180px] xl:pt-[176px]"
          :class="[isScrolled ? 'md:pt-[170px]' : 'md:pt-[172px]']">
      <slot/>
    </main>
    <LayoutFooter/>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';

const isScrolled = ref(false);

const handleScroll = () => {
  if (window.scrollY) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

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
  window.addEventListener('scroll', handleScroll);
  calcViewportHeight();
  document.addEventListener('touchstart', function () {
  }, true);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="postcss">
body {
  @apply scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300
}
</style>
