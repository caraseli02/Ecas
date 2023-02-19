<template>
  <div>
    <LayoutHeader :isScrolled="isScrolled" />
    <main
      class="pt-[91px]"
      :class="[isScrolled ? 'md:pt-[167px]' : 'md:pt-[170px]']"
    >
      <slot />
    </main>
    <Transition name="slide-from-right">
      <LayoutAccountModal v-if="showAccountModal" />
    </Transition>
    <Transition name="slide-from-right">
      <LayoutFavoritesCartModal v-if="favoritesCartModal.show" />
    </Transition>
    <Transition name="slide-from-right">
      <LayoutRegionalPreferencesModal v-if="showRegionalPreferencesModal" />
    </Transition>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
import { showAccountModal } from "~~/system/modal/account";
import { favoritesCartModal } from "~~/system/modal/favorites-cart";
import { showRegionalPreferencesModal } from "~~/system/modal/regional-preferences";

const isScrolled = ref(false);

const handleScroll = () => {
  if (window.scrollY) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
