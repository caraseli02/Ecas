<template>
    <div class="mt-6 flex flex-col gap-6">
        <div v-if="order.backorderOption === 0 && mixedOrBackOrder" class="flex flex-row gap-3 items-center">
            <WarningErrorHuge class="w-6 h-5" />
            <span class="text-[#FA4B4B] text-sm font-medium leading-6">Select backorder shipping preferences</span>
        </div>
        <div v-if="mixedOrBackOrder" class="flex flex-col gap-4">
            <button @click="selectBackorderPreference(1)" class="flex flex-row gap-3 items-start group">
                <RadioButtonChecked v-if="order.backorderOption === 1"
                    class="w-10 sm:w-5 lg:w-10 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300" />
                <RadioButton v-else
                    class="w-10 sm:w-5 lg:w-10 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300" />
                <div class="flex flex-col items-start">
                    <h2
                        class="text-[#222] text-sm font-medium leading-6 group-hover:text-[#007FFF] transition duration-300">
                        Backorder Partial Shipping</h2>
                    <p class="text-[#222] text-sm font-normal leading-6 text-start">Backorder items will be shipped as they
                        come in
                        stock (multiple shipments).</p>
                </div>
            </button>
            <button @click="selectBackorderPreference(2)" class="flex flex-row gap-3 items-start group">
                <RadioButtonChecked v-if="order.backorderOption === 2"
                    class="w-10 sm:w-5 lg:w-10 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300" />
                <RadioButton v-else
                    class="w-10 sm:w-5 lg:w-10 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300" />
                <div class="flex flex-col items-start">
                    <h2
                        class="text-[#222] text-sm font-medium leading-6 group-hover:text-[#007FFF] transition duration-300">
                        Backorder Total Shipping</h2>
                    <p class="text-[#222] text-sm font-normal leading-6 text-start">Wait for backordered items to arrive in
                        stock and
                        dispatch all together (one shipment).</p>
                </div>
            </button>
        </div>
        <div class="flex flex-col gap-4">
            <span class="text-[#222] text-sm font-medium leading-6">Delivery Method</span>
            <div class="flex flex-col gap-4">
                <button @click="selectDeliveryMethod(0)" class="flex flex-row justify-between group">
                    <div class="flex flex-row gap-3 items-start">
                        <RadioButtonChecked v-if="deliveryOption === 0"
                            class="w-5 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300" />
                        <RadioButton v-else
                            class="w-5 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300" />
                        <div class="flex flex-col items-start">
                            <h2
                                class="text-[#222] text-sm font-medium leading-6 group-hover:text-[#007FFF] transition duration-300">
                                Free Delivery</h2>
                            <p class="text-[#222] text-sm font-normal leading-6 text-start">3-7 Business Days</p>
                        </div>
                    </div>
                    <span class="text-[#222] text-sm font-medium leading-6 group-hover:text-[#007FFF] transition duration-300">$ 0.00</span>
                </button>
                <button @click="selectDeliveryMethod(1)" class="flex flex-row justify-between group">
                    <div class="flex flex-row gap-3 items-start">
                        <RadioButtonChecked v-if="deliveryOption === 1"
                            class="w-5 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300" />
                        <RadioButton v-else
                            class="w-5 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300" />
                        <div class="flex flex-col items-start">
                            <h2
                                class="text-[#222] text-sm font-medium leading-6 group-hover:text-[#007FFF] transition duration-300">
                                Standard Delivery</h2>
                            <p class="text-[#222] text-sm font-normal leading-6 text-start">3-5 Business Days</p>
                        </div>
                    </div>
                    <span class="text-[#222] text-sm font-medium leading-6 group-hover:text-[#007FFF] transition duration-300">$ 5.49</span>
                </button>
                <button @click="selectDeliveryMethod(2)" class="flex flex-row justify-between group">
                    <div class="flex flex-row gap-3 items-start">
                        <RadioButtonChecked v-if="deliveryOption === 2"
                            class="w-5 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300" />
                        <RadioButton v-else
                            class="w-5 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300" />
                        <div class="flex flex-col items-start">
                            <h2
                                class="text-[#222] text-sm font-medium leading-6 group-hover:text-[#007FFF] transition duration-300">
                                Express Delivery</h2>
                            <p class="text-[#222] text-sm font-normal leading-6 text-start">1-2 Business Days</p>
                        </div>
                    </div>
                    <span class="text-[#222] text-sm font-medium leading-6 group-hover:text-[#007FFF] transition duration-300">$ 7.49</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import WarningErrorHuge from '@/assets/icons/warning-error-huge.svg';
import RadioButton from '@/assets/icons/radio-button.svg';
import RadioButtonChecked from '@/assets/icons/radio-button-checked.svg';
export default defineComponent({
    name: 'ShippingPreferencesSection',
    props: ['order'],
    components: {
        WarningErrorHuge,
        RadioButton,
        RadioButtonChecked,
    },
    data() {
        return {
            backorderOption: 0,
            deliveryOption: 0,
        };
    },
    methods: {
        selectBackorderPreference(option: number) {
            this.order.backorderOption = option;
        },
        selectDeliveryMethod(option: number) {
            this.deliveryOption = option;
        },
    },
    computed: {
        mixedOrBackOrder() {
            return this.order.type === ('Mixed' || 'Back')
        },
    },
});
</script>