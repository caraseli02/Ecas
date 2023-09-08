<template>
  <div>
    <div class="mb-9 md:flex md:items-center md:justify-between">
      <h2 class="text-xl leading-[1.4] font-semibold max-md:mb-9">Account Details</h2>
      <div class="grid grid-cols-2 gap-3 md:grid-cols-[repeat(2,auto)]">
        <button
            class="flex items-center justify-center w-full text-left px-4 py-2 rounded-md transition-colors duration-300 bg-[#F2F2F2] text-gray-300 hover:text-white hover:bg-blue xl:px-6"
            :class="[isEditing ? 'text-white bg-blue' : '']"
            @click="isEditing = !isEditing"
        >
          <EditIcon class="w-5 h-5 mr-2 text-current xl:w-6 xl:h-6"/>
          <span class="text-sm leading-[1.42857] font-medium"> Edit </span>
        </button>
        <button
            class="flex items-center justify-center w-full text-left px-4 py-2 rounded-md transition-colors duration-300 bg-[#F2F2F2] text-gray-300 hover:text-white hover:bg-blue xl:px-6"
        >
          <CopyIcon class="w-5 h-5 mr-2 text-current xl:w-6 xl:h-6"/>
          <span class="text-sm leading-[1.42857] font-medium"> Copy Details </span>
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-x-9">
      <FormInput
          v-model="form.name.value"
          :error="form.name.error"
          :disabled="!isEditing"
          :show-disabled-styles="false"
          label="Name"
          size="lg"
          placeholder="Name"
      />
      <FormSelect
          v-model="form.country.value"
          :error="form.country.error"
          :options="countries"
          :disabled="!isEditing"
          :show-disabled-styles="false"
          label="Country"
          placeholder="United States"
          search
          size="lg"
          class="relative z-20"
      />
      <FormSelect
          v-model="form.region.value"
          :error="form.region.error"
          :options="regions"
          :disabled="regions.length === 0 || !isEditing"
          :show-disabled-styles="false"
          label="County/Region"
          placeholder="Georgia"
          search
          size="lg"
          class="relative z-10"
      />
      <FormInput
          v-model="form.city.value"
          :error="form.city.error"
          :disabled="!isEditing"
          :show-disabled-styles="false"
          label="City"
          size="lg"
          placeholder="Georgia"
      />
      <FormInput
          v-model="form.addressLine1.value"
          :error="form.addressLine1.error"
          :disabled="!isEditing"
          :show-disabled-styles="false"
          label="Address Line 1"
          size="lg"
          placeholder="5073 Mark Brown Rd"
      />
      <FormInput
          v-model="form.addressLine2.value"
          :error="form.addressLine2.error"
          :disabled="!isEditing"
          :show-disabled-styles="false"
          label="Address Line 2"
          size="lg"
          placeholder="NE Dalton"
      />
      <FormInput
          v-model="form.postcode.value"
          :error="form.postcode.error"
          :disabled="!isEditing"
          :show-disabled-styles="false"
          label="Postcode"
          size="lg"
          placeholder="W1A5AB"
      />
      <FormInput
          v-model="form.phoneNumber.value"
          :error="form.phoneNumber.error"
          :disabled="!isEditing"
          :show-disabled-styles="false"
          label="Phone Number"
          size="lg"
          placeholder="+1 (706) 275-0767"
      />
      <FormInput
          v-model="form.mobileNumber.value"
          :error="form.mobileNumber.error"
          :disabled="!isEditing"
          :show-disabled-styles="false"
          label="Mobile Number"
          size="lg"
          placeholder="+1 (706) 275-0767"
      />
      <FormInput
          v-model="form.email.value"
          :error="form.email.error"
          :disabled="!isEditing"
          :show-disabled-styles="false"
          label="Email"
          placeholder="madalina.dobrovolski@company.com"
          type="email"
          size="lg"
          class="md:col-span-2"
      />
    </div>
    <div v-if="isEditing" class="grid grid-cols-[auto,1fr] gap-4 mt-9 xl:w-1/2 xl:ml-auto xl:pl-4">
      <button
          class="flex items-center justify-center w-full text-left px-[31px] py-2 rounded-lg transition-colors duration-300 bg-[#F2F2F2] text-gray-300 md:px-[91px] xl:px-[61px]"
          @click="isEditing = false"
      >
        <span class="leading-[1.75] font-medium"> Cancel </span>
      </button>
      <button
          class="flex items-center justify-center w-full text-left px-[31px] py-2 rounded-lg transition-colors duration-300 bg-blue text-white"
      >
        <span class="leading-[1.75] font-medium"> Save </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditIcon from '@/assets/icons/dashboard/edit.svg';
import CopyIcon from '@/assets/icons/dashboard/copy.svg';
import {countries} from '@/data/countries';
import {FormSelectOption} from '~~/types';

const isEditing = ref(false);

const regions = ref<FormSelectOption[]>([]);

const form = ref({
  name: {
    value: '',
    error: '',
  },
  vatNumber: {
    value: '',
    error: '',
  },
  country: {
    value: '',
    error: '',
  },
  region: {
    value: '',
    error: '',
  },
  city: {
    value: '',
    error: '',
  },
  addressLine1: {
    value: '',
    error: '',
  },
  addressLine2: {
    value: '',
    error: '',
  },
  postcode: {
    value: '',
    error: '',
  },
  phoneNumber: {
    value: '',
    error: '',
  },
  mobileNumber: {
    value: '',
    error: '',
  },
  email: {
    value: '',
    error: '',
  },
});

watch(form.value.country, (newVal) => {
  if (newVal?.value) {
    console.log(newVal.value.regions);
    form.value.region = {
      value: '',
      error: '',
      label: '',
      icon: '',
    };
    regions.value =
        newVal.value.regions.map((e) => {
          return {
            label: e.name,
            value: e.name,
          };
        }) || [];
  }
});
</script>
