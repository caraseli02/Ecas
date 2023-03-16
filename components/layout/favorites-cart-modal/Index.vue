<template>
  <div ref="elDOM" class="fixed z-50 top-0 left-0 w-full h-screen">
    <div
      class="relative z-10 flex flex-col ml-auto w-full h-full bg-white max-h-vh overflow-hidden md:w-[450px]"
    >
      <button
        class="rounded w-8 h-8 bg-[#F2F2F2] flex items-center justify-center text-gray-100 flex-shrink-0 transition-colors duration-300 mt-5 ml-auto mr-5 mb-2.5 hover:text-gray-300"
        @click="favoritesCartModal.show = false"
      >
        <XIcon class="w-[15px] h-[15px]" />
      </button>
      <div
        class="relative z-10 flex items-center gap-5 px-5 border-b border-gray-200 bg-white"
      >
        <button
          v-for="(item, index) in navItems"
          :key="index"
          :data-tab="textUtil.slugify(item.label)"
          class="relative flex items-center pb-[15px] transition-colors duration-300 hover:text-blue md:text-base md:pb-4"
          :class="[
            activeNavItem === textUtil.slugify(item.label)
              ? 'text-blue'
              : 'text-gray-300 after:opacity-0',
          ]"
          @click="setActiveNav(item.label)"
        >
          <component :is="item.icon" class="w-6 h-6 mr-2" />
          <span class="text-sm font-semibold">
            {{ item.label }}
          </span>
        </button>
        <div
          class="absolute bottom-0 h-[5px] bg-blue rounded-t-[5px] transition-all duration-300"
          :style="{
            left: navLineLeftPosition + 'px',
            width: navLineWidth + 'px',
          }"
        />
      </div>
      <div class="flex-1 h-[calc(100%-102px)]">
        <LayoutFavoritesCartModalFavorites
          v-if="activeNavItem === 'favorites'"
        />
        <div v-else class="px-5 text-sm font-Inter text-gray-300 pt-5">
          Recently added products
        </div>
      </div>
    </div>
    <div
      class="hidden absolute top-0 left-0 w-full h-full bg-[#333333]/70 backdrop-blur-[2px] cursor-pointer md:block"
      @click="favoritesCartModal.show = false"
    />
  </div>
</template>

<script setup lang="ts">
import XIcon from "@/assets/icons/x.svg";
import CartIcon from "@/assets/icons/cart.svg";
import HeartIcon from "@/assets/icons/heart.svg";
import { favoritesCartModal } from "~~/system/modal/favorites-cart";

const elDOM = ref<HTMLElement | null>(null);

const navItems = ref([
  {
    label: "Favorites",
    icon: HeartIcon,
  },
  {
    label: "Shopping Cart",
    icon: CartIcon,
  },
]);

const activeNavItem = ref<"favorites" | "shopping-cart">("favorites");
const navLineLeftPosition = ref(0);
const navLineWidth = ref(0);

const setNavLine = () => {
  if (elDOM.value) {
    const activeNavEl = elDOM.value.querySelector(
      `[data-tab=${activeNavItem.value}]`
    ) as HTMLButtonElement;

    if (activeNavEl) {
      const rect = activeNavEl.getBoundingClientRect();
      navLineLeftPosition.value = activeNavEl.offsetLeft;
      navLineWidth.value = rect.width;
    }
  }
};

const setActiveNav = (item: string) => {
  activeNavItem.value = textUtil.slugify(item) as typeof activeNavItem.value;
  setNavLine();
};

onMounted(() => {
  activeNavItem.value = favoritesCartModal.value.tab;
  setNavLine();
  documentUtil.toggleBodyScroll();
});

onBeforeUnmount(() => {
  documentUtil.toggleBodyScroll();
});
</script>
