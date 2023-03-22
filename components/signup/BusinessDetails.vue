<template>
  <div class="pt-[30px] pb-10 md:flex-1 lg:pt-[60px]">
    <div class="container h-full">
      <div class="flex flex-col h-full md:max-w-[410px] md:mx-auto">
        <div class="flex items-center mb-5">
          <div class="font-medium mr-2 md:text-xl">Business Details</div>
          <QuestionIcon class="w-5 h-5 text-gray-100" />
        </div>
        <div class="mb-[30px]">
          <div class="grid grid-cols-1 gap-[15px] mb-10">
            <FormInput
              v-model="details.fullCompanyName"
              label="Full Company Name"
              placeholder="Your Full Company Name"
            />
            <FormInput
              v-model="details.companyRegistrationNumber"
              label="Company Registration Number"
              placeholder="Company Registration Number"
            />
            <FormInput
              v-if="selectedType === 'executive'"
              v-model="details.vatNumber"
              label="VAT Number"
              placeholder="VAT Number"
            />
            <FormSelect
              v-model="details.country"
              :options="countries"
              label="Country"
              placeholder="Select Country"
              class="relative z-10"
            />
            <FormInput v-model="details.city" label="City" placeholder="City" />
            <FormInput
              v-model="details.postcode"
              label="Postcode"
              placeholder="Postcode"
            />
            <FormInput
              v-model="details.addressLine1"
              label="Address Line 1"
              placeholder="Address Line 1"
            />
            <FormInput
              v-model="details.addressLine2"
              label="Address Line 2"
              placeholder="Address Line 2"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="flex items-center rounded bg-gray-200 px-[22px] py-[11px] text-gray-300"
              @click="$emit('back')"
            >
              <ChevronRightIcon class="w-3 h-3 mr-2 rotate-180" />
              <span class="text-sm font-medium">Back</span>
            </button>
            <button
              class="flex items-center rounded bg-blue px-[22px] py-[11px] text-white"
              @click="$emit('continue')"
            >
              <span class="text-sm font-medium mr-2">Continue</span>
              <ChevronRightIcon class="w-3 h-3" />
            </button>
          </div>
        </div>
        <div class="text-xs text-center text-gray-300 mt-auto">
          For assistance please contact
          <a href="mailto:support@ecas.ro" class="text-blue">support@ecas.ro</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormSelectOption } from "~~/types";
import QuestionIcon from "@/assets/icons/question-circle.svg";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg";
import { countries } from "@/data/countries";

defineProps({
  selectedType: {
    type: String,
    required: true,
  },
});

defineEmits(["continue", "back"]);

const details = ref({
  fullCompanyName: "",
  companyRegistrationNumber: "",
  vatNumber: "",
  country: undefined as FormSelectOption | undefined,
  city: "",
  postcode: "",
  addressLine1: "",
  addressLine2: "",
});
</script>
