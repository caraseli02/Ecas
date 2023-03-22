<template>
  <div
    class="flex flex-col pt-[30px] px-[15px] pb-10 md:pt-[130px] md:px-4 md:pb-5 md:flex-1 lg:max-w-[410px] lg:mx-auto lg:pb-10"
  >
    <div class="flex items-center mb-5">
      <div class="font-medium mr-2 md:text-xl">Select account type</div>
      <QuestionIcon class="w-5 h-5 text-gray-100" />
    </div>
    <div class="grid grid-cols-3 gap-3 mb-[30px] md:mb-10">
      <button
        class="flex flex-col items-center p-[15px] rounded-md transition-colors duration-300"
        :class="[
          selectedType === 'personal'
            ? 'text-white bg-blue'
            : 'text-gray-300 bg-[#F2F2F2]',
        ]"
        @click="$emit('set-type', 'personal')"
      >
        <PersonalIcon class="w-8 h-8 mb-2.5" />
        <span class="text-sm leading-tight font-medium">Personal</span>
      </button>
      <button
        class="flex flex-col items-center px-2.5 py-[15px] rounded-md transition-colors duration-300"
        :class="[
          selectedType === 'sale-trader'
            ? 'text-white bg-blue'
            : 'text-gray-300 bg-[#F2F2F2]',
        ]"
        @click="$emit('set-type', 'sale-trader')"
      >
        <SaleTraderIcon class="w-8 h-8 mb-2.5" />
        <span class="text-sm leading-tight font-medium">Sale Trader</span>
      </button>
      <button
        class="flex flex-col items-center p-[15px] rounded-md transition-colors duration-300"
        :class="[
          selectedType === 'business'
            ? 'text-white bg-blue'
            : 'text-gray-300 bg-[#F2F2F2]',
        ]"
        @click="$emit('set-type', 'business')"
      >
        <BusinessIcon class="w-8 h-8 mb-2.5" />
        <span class="text-sm leading-tight font-medium">Business</span>
      </button>
    </div>
    <template v-if="selectedType === 'business'">
      <div class="flex items-center mb-5">
        <div class="font-medium mr-2 md:text-xl">Business Account Type</div>
        <QuestionIcon class="w-5 h-5 text-gray-100" />
      </div>
      <div class="mb-[86px] md:mb-[70px]">
        <FormSelect
          v-model="selectedBusinessAccountType"
          :options="[
            {
              label: 'Executive',
              value: 'executive',
              icon: BusinessIcon,
            },
            {
              label: 'Agent',
              value: 'agent',
              icon: AgentIcon,
            },
          ]"
          label="Select account type"
        />
      </div>
    </template>
    <div
      class="flex justify-end mb-[100px] md:mb-10"
      :class="[selectedType !== 'business' ? 'mt-[200px] md:mt-[188px]' : '']"
    >
      <button
        class="flex items-center rounded bg-blue px-[22px] py-[11px] text-white"
        @click="$emit('continue')"
      >
        <span class="text-sm font-medium mr-2">Continue</span>
        <ChevronRightIcon class="w-3 h-3" />
      </button>
    </div>
    <div
      class="flex items-center justify-center gap-[15px] mt-auto mb-[30px] md:hidden"
    >
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-gray-300/10 text-gray-300 transition-colors duration-300 hover:text-blue"
      >
        <TwitterIcon class="w-5" />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-gray-300/10 text-gray-300 transition-colors duration-300 hover:text-blue"
      >
        <LinkedInIcon class="w-5" />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-gray-300/10 text-gray-300 transition-colors duration-300 hover:text-blue"
      >
        <InstagramIcon class="w-5 h-5" />
      </a>
    </div>
    <div class="flex items-center justify-center gap-5 md:hidden">
      <NuxtLink
        to="/"
        class="text-sm transition-colors duration-300 hover:text-blue"
      >
        Terms
      </NuxtLink>
      <NuxtLink
        to="/"
        class="text-sm transition-colors duration-300 hover:text-blue"
      >
        Help
      </NuxtLink>
      <NuxtLink
        to="/"
        class="text-sm transition-colors duration-300 hover:text-blue"
      >
        Contact
      </NuxtLink>
    </div>
    <div class="text-sm text-center mb-[60px] mt-auto max-md:hidden lg:mb-10">
      Already have an account?
      <NuxtLink to="/" class="text-blue font-semibold">Sign in</NuxtLink>
    </div>
    <div class="text-sm text-gray-300 text-center max-md:hidden">
      © {{ new Date().getFullYear() }} ECAS.RO
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import QuestionIcon from "@/assets/icons/question-circle.svg";
import PersonalIcon from "@/assets/icons/signup/personal.svg";
import SaleTraderIcon from "@/assets/icons/signup/sale-trader.svg";
import BusinessIcon from "@/assets/icons/signup/business.svg";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg";
import AgentIcon from "@/assets/icons/signup/agent.svg";
import TwitterIcon from "@/assets/icons/social/twitter.svg";
import LinkedInIcon from "@/assets/icons/social/linkedin.svg";
import InstagramIcon from "@/assets/icons/social/instagram.svg";
import { FormSelectOption } from "~~/types";

defineProps({
  selectedType: {
    type: String as PropType<"personal" | "sale-trader" | "business">,
    required: true,
  },
});

const emits = defineEmits(["set-type", "continue", "set-business-type"]);

const selectedBusinessAccountType = ref<FormSelectOption>({
  label: "Executive",
  value: "executive",
  icon: BusinessIcon,
});

watch(
  selectedBusinessAccountType,
  (newVal) => {
    if (newVal) {
      emits("set-business-type", newVal.value);
    }
  },
  {
    immediate: true,
  }
);
</script>
