<template>
  <div class="relative">
    <label
      class="relative hidden border-2 border-blue rounded-md md:flex xl:w-[600px]"
      :class="[isScrolled ? 'w-[350px]' : 'w-[410px]']"
    >
      <SearchIcon
        v-if="!isScrolled"
        class="hidden w-4 h-4 text-gray-100 self-center ml-2.5 md:inline-block"
      />
      <form action="" @submit.prevent class="w-full">
        <input
          v-model="searchVal"
          type="search"
          placeholder="Search parts here"
          autocomplete="off"
          class="flex-1 text-sm leading-[1.14] text-gray-300 rounded-md px-2.5 py-2.5 h-[42px] w-full placeholder:text-gray-100 focus:outline-none"
          @blur="searchVal = ''"
          @keypress.enter="
            $router.push('/search');
            searchVal = '';
          "
        />
      </form>
      <div
        v-if="!isScrolled"
        class="flex items-center justify-center bg-blue cursor-pointer px-[15px] py-[11px]"
      >
        <SearchIcon class="w-5 h-5 text-white" />
      </div>
      <div v-else class="absolute top-1/2 right-3 -translate-y-1/2">
        <SearchIcon class="w-5 h-5 text-gray-300" />
      </div>
    </label>
    <Transition name="fade">
      <LayoutHeaderSearchResults v-if="searchVal" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import SearchIcon from "@/assets/icons/search.svg";

defineProps({
  isScrolled: {
    type: Boolean,
    required: false,
  },
});

const searchVal = ref("");
</script>
