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

<style>
body {
  scrollbar-width: thin;
  scrollbar-color: #ebebeb #ddd;
}

body::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

body::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom right, #ebebeb 0%, #d6d6d6 100%);
  border-radius: 5px;
}

body::-webkit-scrollbar-track {
  background-color: #ddd;
  border: 1px solid #ccc;
}

body::-webkit-scrollbar-button {
  background-color: #ebebeb;
  border-radius: 5px;
}
</style>
