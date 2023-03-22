<template>
  <div class="relative z-20 bg-white hidden pt-2.5 pb-[9px] md:block">
    <div class="container">
      <div class="relative flex items-center justify-between">
        <NuxtLink to="/">
          <Logo class="w-[131px] xl:w-[141px]" />
        </NuxtLink>
        <LayoutHeaderSearch />
        <button
          class="hidden md:flex xl:hidden"
          @click="showAccountModal = true"
        >
          <UserIcon class="w-7 h-7 text-gray-300" />
        </button>
        <div
          class="hidden text-sm leading-[1.14] font-medium text-gray-300 font-Inter xl:block"
        >
          <span class="uppercase">Free</span> shipping on orders over $150
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="slide-from-right">
      <LayoutAccountModal
        v-if="showAccountModal"
        @close="showAccountModal = false"
      />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import Logo from "@/assets/media/logo.svg";
import UserIcon from "@/assets/icons/user.svg";

const showAccountModal = ref(false);
</script>
