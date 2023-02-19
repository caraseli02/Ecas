<template>
  <div class="fixed z-50 top-0 left-0-0 w-screen h-screen">
    <div
      class="relative z-10 flex flex-col ml-auto w-full h-full bg-white md:w-[450px]"
    >
      <div
        class="flex items-center justify-between p-5 border-b border-gray-200 mb-5"
      >
        <div class="flex items-center">
          <GlobeIcon class="w-7 h-7 mr-2" />
          <span class="text-lg font-semibold text-gray-300"
            >Regional Preferences</span
          >
        </div>
        <button
          class="rounded w-8 h-8 bg-[#F2F2F2] flex items-center justify-center text-gray-100 transition-colors duration-300 hover:text-gray-300"
          @click="showRegionalPreferencesModal = false"
        >
          <XIcon class="w-[15px] h-[15px]" />
        </button>
      </div>
      <div class="px-5">
        <div class="text-sm text-gray-300 mb-5">
          Select a language, shipping region and currency to update your
          experience on ecas.ro
        </div>
        <FormSelect
          v-model="language"
          label="Language"
          placeholder="Language"
          :options="['English', 'French', 'German', 'Romanian']"
          class="z-10 mb-5"
        />
        <FormSelect
          v-model="currency"
          label="Currency"
          placeholder="Currency"
          :options="['RON', 'Euro', 'USD']"
        />
      </div>
      <div class="flex items-center justify-center gap-2.5 mt-auto pb-[50px]">
        <button
          class="flex bg-blue rounded px-[34px] py-[11px] text-sm font-medium text-white"
          @click="showRegionalPreferencesModal = false"
        >
          Save
        </button>
        <button
          class="flex bg-gray-200 rounded px-[26px] py-[11px] text-sm font-medium text-gray-300"
          @click="showRegionalPreferencesModal = false"
        >
          Cancel
        </button>
      </div>
    </div>
    <div
      class="hidden absolute top-0 left-0 w-full h-full bg-gray-300/70 cursor-pointer md:block"
      @click="showRegionalPreferencesModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import XIcon from "@/assets/icons/x.svg";
import GlobeIcon from "@/assets/icons/globe.svg";
import { showRegionalPreferencesModal } from "~~/system/modal/regional-preferences";

const language = ref("English");
const currency = ref("RON");
</script>
