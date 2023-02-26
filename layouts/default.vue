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
    <Transition name="slide-from-bottom">
      <LayoutSearchFiltersModal v-if="showSearchFiltersModal" />
    </Transition>
    <Transition name="fade">
      <LayoutCustomProductPartNumberModal v-if="customProductPartNumberModal" />
    </Transition>
    <Transition name="fade">
      <div
        v-if="showSearchFiltersModal"
        class="absolute z-50 top-0 left-0 w-full h-full bg-[#333333]/70 backdrop-blur-[2px] cursor-pointer md:hidden"
        @click="showSearchFiltersModal = false"
      />
    </Transition>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
import { showAccountModal } from "~~/system/modal/account";
import { customProductPartNumberModal } from "~~/system/modal/custom-product-part-number";
import { favoritesCartModal } from "~~/system/modal/favorites-cart";
import { showRegionalPreferencesModal } from "~~/system/modal/regional-preferences";
import { showSearchFiltersModal } from "~~/system/modal/search-filters";

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
