<template>
  <div class="fixed z-[60] top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
    <div
        class="relative flex flex-col z-10 w-[358px] max-w-[calc(100vw-32px)] max-h-[85vh] pt-4 pb-6 bg-white rounded-xl pointer-events-auto shadow-xs md:w-[640px] md:pt-6 md:pb-9"
    >
      <div class="flex items-start justify-between px-4 mb-9 md:px-6">
        <div class="font-semibold leading-[1.5]">Edit Shipping Details</div>
        <button
            class="w-8 h-8 bg-gray-200 flex items-center justify-center text-gray-300 rounded-lg ml-auto mb-4 transition-colors duration-300 hover:text-blue"
            @click="$emit('close')"
        >
          <XIcon class="w-6 h-6"/>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto scrollbar-thin mr-1">
        <div class="grid grid-cols-1 gap-6 pl-4 pr-3 mb-9 md:pl-6 md:pr-3">
          <FormInput
              v-model="data.alias.value"
              :error="data.alias.error"
              :icon="BusinessIcon"
              label="Address Alias"
              size="lg"
              placeholder="Address Alias 1"
          />
          <FormSelect
              v-model="data.country.value"
              :error="data.country.error"
              :options="countries"
              label="Country"
              search
              placeholder="Select Country"
              size="lg"
              class="relative z-20"
          />
          <FormSelect
              v-model="data.region.value"
              :error="data.region.error"
              :options="regions"
              :disabled="regions.length === 0"
              :show-disabled-styles="false"
              search
              label="County/Region"
              placeholder=""
              size="lg"
              class="relative z-10"
          />
          <FormInput
              v-model="data.name1.value"
              :error="data.name1.error"
              label="Address Line 1"
              size="lg"
              placeholder="5073 Mark Brown Rd"
          />
          <FormInput
              v-model="data.name2.value"
              :error="data.name2.error"
              label="Address Line 2"
              size="lg"
              placeholder="NE Dalton"
          />
          <FormInput
              v-model="data.postcode.value" :error="data.postcode.error" label="Postcode" size="lg"
              placeholder="W1A5AB"/>
          <FormInput
              v-model="data.phone.value"
              :error="data.phone.error"
              type="tel"
              label="Phone Number"
              size="lg"
              placeholder="+1 (706) 275-0767"
          />
        </div>
        <div class="grid grid-cols-1 gap-4 pl-4 pr-3 md:pl-6 md:pr-3 md:grid-cols-[auto,auto,1fr]">
          <button
              v-if="props.deleteButtonEnable"
              class="flex items-center justify-center rounded-lg text-[#FA4B4B] py-[7px] px-7 border border-[#FA4B4B]"
              @click="$emit('close');Emitter.emit('delete', props.index)"
          >
            <TrashIcon class="w-6 h-6 mr-2"/>
            <span class="font-medium leading-[1.75]"> Delete </span>
          </button>
          <button
              class="flex px-[41px] py-2 rounded-lg bg-gray-200 leading-[1.75] text-gray-300 font-medium"
              @click="$emit('close')"

          >
            Cancel
          </button>
          <button
              :disabled="!data.region.value && !data.country.value"
              class="flex justify-center px-5 py-2 rounded-lg bg-blue leading-[1.75] text-white font-medium"
              @click="$emit('close');Emitter.emit('edit', {address: data, index : props.index})"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BusinessIcon from '@/assets/icons/dashboard/business.svg';
import XIcon from '@/assets/icons/dashboard/x.svg';
import TrashIcon from '@/assets/icons/dashboard/trash.svg';
import {countries} from '@/data/countries';
import {FormSelectOption} from '~/types';
import Emitter from 'tiny-emitter/instance.js';
import {ShippingAddressInterface} from '~/types/auth/user-details';
import {getRegionByCountry} from '~/helpers/form.helpers';

const props = defineProps({
  address: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  deleteButtonEnable: {
    type: Boolean,
    required: true,
  }
});

defineEmits(['close']);
const data = ref({
  alias: {
    value: '',
    error: '',
  },
  country: {
    value: {
      value: '',
      label: '',
      icon: '',
    },
    error: '',
  },
  region: {
    value: {
      value: '',
      label: '',
    },
    error: '',
  },
  name1: {
    value: '',
    error: '',
  },
  name2: {
    value: '',
    error: '',
  },
  postcode: {
    value: '',
    error: '',
  },
  phone: {
    value: '',
    error: '',
  },
});
const newAddress = ref<ShippingAddressInterface>({} as ShippingAddressInterface)
const regions = ref<FormSelectOption[]>([]);


const getCountryRegion = async (country: any, region: any) => {
  const CountryRegionObj = getRegionByCountry(country, region);
  regions.value = CountryRegionObj.regions;
  data.value.country.value = CountryRegionObj.country;
  data.value.region.value = CountryRegionObj.region;
}
console.log(props.deleteButtonEnable)
const setCustomerInformation = () => {

  data.value.alias.value = props.address.alias;
  data.value.name1.value = props.address.name1;
  data.value.name2.value = props.address.name2;
  data.value.postcode.value = props.address.postcode;
  data.value.phone.value = props.address.phone;
  getCountryRegion(props.address.country, props.address.region);
}

await setCustomerInformation()


watch(data.value.country, (newVal) => {
  if (newVal?.value) {
    data.value.region = {
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


// onMounted(() => {
//
//
// });

</script>
