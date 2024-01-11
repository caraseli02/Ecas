<template>
    <div class="mt-6 flex flex-col gap-6">
        <div v-if="!order.backorderOption && mixedOrBackOrder" class="flex flex-row gap-3 items-center">
            <WarningErrorHuge class="w-6 h-5" />
            <span class="text-[#FA4B4B] text-sm font-medium leading-6">Select backorder shipping preferences</span>
        </div>
        <div v-for="backOrderOption in generalSettings?.orderSettings?.backorderShippingTypes" class="flex flex-col gap-4">
            <button class="flex flex-row gap-3 items-start group" @click="selectBackorderPreference(backOrderOption)">
                <RadioButtonChecked
                    v-if="order.backorderOption === backOrderOption"
                    class="w-10 sm:w-5 lg:w-10 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300"
                />
                <RadioButton
                    v-else
                    class="w-10 sm:w-5 lg:w-10 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300"
                />
                <div class="flex flex-col items-start">
                    <h2 class="text-neutral-700 text-sm font-medium leading-6 group-hover:text-[#007FFF] transition duration-300">
                        {{ backOrderOption.title }}
                    </h2>
                    <p class="text-neutral-700 text-sm font-normal leading-6 text-start">{{ backOrderOption.description }}</p>
                </div>
            </button>
        </div>
        <div class="flex flex-col gap-4">
            <span class="text-neutral-700 text-sm font-medium leading-6">Delivery Method</span>
            <div v-for="shippingType in generalSettings?.orderSettings?.shippingTypes" class="flex flex-col gap-4">
                <button class="flex flex-row justify-between group" @click="selectDeliveryMethod(shippingType)">
                    <div class="flex flex-row gap-3 items-start">
                        <RadioButtonChecked
                            v-if="order.deliveryMethod === shippingType"
                            class="w-5 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300"
                        />
                        <RadioButton v-else class="w-5 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300" />
                        <div class="flex flex-col items-start">
                            <h2 class="text-neutral-700 text-sm font-medium leading-6 group-hover:text-[#007FFF] transition duration-300">
                                {{ shippingType.title }}
                            </h2>
                            <p class="text-neutral-700 text-sm font-normal leading-6 text-start">
                                {{
                                    shippingType.min + ' - ' + shippingType.max + (shippingType.unit === 'day' ? '' : ' Business') + ' Days'
                                }}
                            </p>
                        </div>
                    </div>
                    <span class="text-neutral-700 text-sm font-medium leading-6 group-hover:text-[#007FFF] transition duration-300">{{
                        '$ ' + shippingType.price
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
import { BackorderOptionEnum, DeliveryMethodEnum, OrderInterface } from '~/types';
import { PropType } from 'vue';
import {
    BackorderShippingTypesInterface,
    GeneralSettingsInterface,
    ShippingTypesInterface,
} from '~/types/general-settings/general-settings';

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
        generalSettings: {
            type: Object as PropType<GeneralSettingsInterface>,
            required: true,
        },
    },
    computed: {
        BackorderOptionEnum() {
            return BackorderOptionEnum;
        },
        DeliveryMethodEnum() {
            return DeliveryMethodEnum;
        },
        mixedOrBackOrder() {
            return this.order.type === 1 || this.order.type === 2;
        },
    },
    methods: {
        selectBackorderPreference(option: BackorderShippingTypesInterface) {
            if (this.order) {
                this.order.backorderOption = option;
            }
        },
        selectDeliveryMethod(option: ShippingTypesInterface) {
            this.order.deliveryMethod = option;
        },
    },
});
</script>