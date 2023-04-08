<template>
  <div>
    <LayoutHeader :isScrolled="isScrolled" />
    <main
      class="pt-[91px]"
      :class="[isScrolled ? 'md:pt-[167px]' : 'md:pt-[170px]']"
    >
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
import { debounce } from "lodash";

const isScrolled = ref(false);

const handleScroll = () => {
  if (window.scrollY) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

const calcViewportHeight = () => {
  if (typeof window !== "undefined") {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
    window.addEventListener(
      "resize",
      debounce(function () {
        document.documentElement.style.setProperty(
          "--vh",
          `${window.innerHeight * 0.01}px`
        );
      }, 100)
    );
    window.addEventListener(
      "orientationchange",
      debounce(function () {
        document.documentElement.style.setProperty(
          "--vh",
          `${window.innerHeight * 0.01}px`
        );
      }, 100)
    );
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  calcViewportHeight();
  document.addEventListener("touchstart", function () {}, true);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
