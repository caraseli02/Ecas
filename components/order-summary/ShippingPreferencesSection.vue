<template>
    <div class="mt-6 flex flex-col gap-6">
        <div v-if="!order.backorderOption && isMixedOrBackOrder" class="flex flex-row gap-3 items-center">
            <WarningErrorHuge class="w-6 h-5" />
            <span class="text-rose-500 text-sm font-medium leading-6">Select backorder shipping preferences</span>
        </div>
        <template v-if="isMixedOrBackOrder">
            <div v-for="backOrderOption in generalSettings?.orderSettings?.backorderShippingTypes" class="flex flex-col gap-4">
                <div v-if="backOrderOption.active">
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
                            <p class="text-neutral-700 text-sm font-normal leading-6 text-start">
                                {{ backOrderOption.description }}
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </template>

        <div v-if="shippingPreferences.list" class="flex flex-col gap-4">
            <span class="text-neutral-700 text-sm font-medium leading-6">Delivery Method</span>
            <div v-for="deliveryType in shippingPreferences.list" class="flex flex-col gap-4">
                <div v-if="deliveryType.service">
                    <button class="flex flex-row justify-between group" @click="selectDeliveryMethod(deliveryType)">
                        <div class="flex flex-row gap-3 items-start">
                            <RadioButtonChecked
                                v-if="order.deliveryMethod === deliveryType"
                                class="w-5 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300"
                            />
                            <RadioButton
                                v-else
                                class="w-5 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300"
                            />
                            <div class="flex flex-col items-start">
                                <h2
                                    class="text-neutral-700 text-sm font-medium leading-6 group-hover:text-[#007FFF] transition duration-300"
                                >
                                    {{ deliveryType.service.courierName + ' ' }}
                                </h2>
                                <p class="text-neutral-700 text-sm font-normal leading-6 text-start">
                                    {{ deliveryType.service.name }}
                                </p>
                            </div>
                        </div>
                        <span class="text-neutral-700 text-sm font-medium leading-6 group-hover:text-[#007FFF] transition duration-300">
                            {{ deliveryType.price.total + 'lei' }}</span
                        >
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import WarningErrorHuge from '@/assets/icons/warning-error-huge.svg';
import RadioButton from '@/assets/icons/radio-button.svg';
import RadioButtonChecked from '@/assets/icons/radio-button-checked.svg';
import { DeliveryMethodEnum, OrderInterface, OrderType } from '~/types';
import { PropType } from 'vue';
import {
    BackorderShippingTypesInterface,
    GeneralSettingsInterface,
    StockorderShippingTypesInterface,
} from '~/types/general-settings/general-settings';
import { ShippingOrderPricingOption, ShippingOrderPricingResponse } from '~/types/order-summary/shipping-services';

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
        shippingPreferences: {
            type: Object as PropType<ShippingOrderPricingResponse>,
            required: true,
        },
    },
    computed: {
        DeliveryMethodEnum() {
            return DeliveryMethodEnum;
        },
        isMixedOrBackOrder(): boolean {
            return this.order.type === OrderType.Back || this.order.type === OrderType.Mixed;
        },
        isStockOrder(): boolean {
            return this.order.type === OrderType.Stock;
        },
        isMixedOrStockOrder(): boolean {
            return this.order.type === OrderType.Stock || this.order.type === OrderType.Mixed;
        },
    },
    methods: {
        selectBackorderPreference(option: BackorderShippingTypesInterface) {
            if (this.order) {
                this.order.backorderOption = option;
            }
        },
        selectStockorderPreference(option: StockorderShippingTypesInterface) {
            if (this.order) {
                this.order.stockorderOption = option;
            }
        },
        selectDeliveryMethod(option: ShippingOrderPricingOption) {
            console.log(option);
            this.order.deliveryMethod = option;
        },
    },
});
</script>
