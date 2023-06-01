<template>
  <div>
    <DashboardHeader
      :isCollapsedOnDesktop="isSideNavCollapsedOnDesktop"
      @show-side-nav="showSideNav = true"
    />
    <transition name="slide-from-left">
      <DashboardAside
        v-if="showSideNav"
        class="w-full md:hidden"
        @close="showSideNav = false"
      />
    </transition>
    <DashboardAside
      class="w-[280px] max-md:hidden md:z-30 md:transition-all md:duration-300 md:delay-50"
      :class="[isSideNavCollapsedOnDesktop ? 'md:w-[96px]' : 'md:w-[280px]']"
      :isCollapsedOnDesktop="isSideNavCollapsedOnDesktop"
      @close="isSideNavCollapsedOnDesktop = !isSideNavCollapsedOnDesktop"
    />
    <main
      class="pt-[68px] transition-all duration-300 md:pt-[76px] md:ml-[96px] md:max-w-[calc(100vw-96px)]"
      :class="[
        isSideNavCollapsedOnDesktop
          ? ''
          : '2xl:ml-[280px] 2xl:max-w-[calc(100vw-280px)]',
      ]"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const isSideNavCollapsedOnDesktop = ref(true);
const showSideNav = ref(false);
</script>
