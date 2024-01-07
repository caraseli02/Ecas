<template>
  <div class="mt-6 flex flex-col gap-6">
    <div v-if="order.backorderOption === 0 && mixedOrBackOrder" class="flex flex-row gap-3 items-center">
      <WarningErrorHuge class="w-6 h-5"/>
      <span class="text-[#FA4B4B] text-sm font-medium leading-6">Select backorder shipping preferences</span>
    </div>
    <div
        v-for="backorderOptions in generalSettings?.orderSettings?.backorderShippingTypes" v-if="mixedOrBackOrder"
        class="flex flex-col gap-4">
      <button
          class="flex flex-row gap-3 items-start group"
          @click="selectBackorderPreference(backorderOptions.title.split(' ')[1])">
        <RadioButtonChecked
            v-if="order.backorderOption === BackorderOptionEnum[backorderOptions.title.split(' ')[1]]"
            class="w-10 sm:w-5 lg:w-10 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300"/>
        <RadioButton
            v-else
            class="w-10 sm:w-5 lg:w-10 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300"/>
        <div class="flex flex-col items-start">
          <h2
              class="text-neutral-700 text-sm font-medium leading-6 group-hover:text-[#007FFF] transition duration-300">
            {{ backorderOptions.title }}</h2>
          <p class="text-neutral-700 text-sm font-normal leading-6 text-start">{{ backorderOptions.description }}</p>
        </div>
      </button>
    </div>
    <div class="flex flex-col gap-4">
      <span class="text-neutral-700 text-sm font-medium leading-6">Delivery Method</span>
      <div v-for="shippingTypes in generalSettings?.orderSettings?.shippingTypes" class="flex flex-col gap-4">
        <button
            class="flex flex-row justify-between group"
            @click="selectDeliveryMethod(shippingTypes.title.split(' ')[0])">
          <div class="flex flex-row gap-3 items-start">
            <RadioButtonChecked
                v-if="order.deliveryMethod === DeliveryMethodEnum[shippingTypes.title.split(' ')[0]]"
                class="w-5 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300"/>
            <RadioButton
                v-else
                class="w-5 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300"/>
            <div class="flex flex-col items-start">
              <h2
                  class="text-neutral-700 text-sm font-medium leading-6 group-hover:text-[#007FFF] transition duration-300">
                {{ shippingTypes.title }}</h2>
              <p class="text-neutral-700 text-sm font-normal leading-6 text-start">
                {{
                  shippingTypes.min + ' - ' + shippingTypes.max + (shippingTypes.unit === 'day' ? '' : ' Business') + ' Days'
                }}</p>
            </div>
          </div>
          <span
              class="text-neutral-700 text-sm font-medium leading-6 group-hover:text-[#007FFF] transition duration-300">{{
              '$ ' + shippingTypes.price
            }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import WarningErrorHuge from '@/assets/icons/warning-error-huge.svg';
import RadioButton from '@/assets/icons/radio-button.svg';
import RadioButtonChecked from '@/assets/icons/radio-button-checked.svg';
import {BackorderOptionEnum, DeliveryMethodEnum, OrderInterface} from '~/types';
import {useAuthStore} from '~/store/authStore';
import {PropType} from 'vue';

export default defineComponent({
  name: 'ShippingPreferencesSection',
  components: {
    WarningErrorHuge,
    RadioButton,
    RadioButtonChecked,
  },
  props: {
    order: {
      type: Object as PropType<OrderInterface>,
      required: true,
    },
  },
  data() {
    console.log(useAuthStore().generalSettings)
    return {
      generalSettings: useAuthStore().generalSettings
    };
  },
  computed: {
    BackorderOptionEnum() {
      return BackorderOptionEnum
    },
    DeliveryMethodEnum() {
      return DeliveryMethodEnum
    },
    mixedOrBackOrder() {
      return this.order.type === 1 || this.order.type === 2;
    },
  },
  methods: {
    selectBackorderPreference(option: string) {
      if (this.order) {
        this.order.backorderOption = BackorderOptionEnum[option as keyof typeof BackorderOptionEnum] as number;
      }
    },
    selectDeliveryMethod(option: string) {
      this.order.deliveryMethod = DeliveryMethodEnum[option as keyof typeof DeliveryMethodEnum] as number;
    },
  },
});
</script>
