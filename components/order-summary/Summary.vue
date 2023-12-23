<template>
    <div class="p-4 xl:p-6 flex flex-col gap-4 bg-[#FFF] rounded-xl shadow-xs mb-9">
        <div class="flex flex-row w-full">
            <span class="text-neutral-700 text-base font-medium leading-6">Payment Summary</span>
        </div>
        <div class="flex flex-col gap-2 relative">
            <div class="flex flex-row justify-between w-full">
                <span class="text-[#5E6278] text-sm font-normal leading-6">Subtotal</span>
                <span class="text-neutral-700 text-sm font-medium leading-6">$ {{ order.subtotal }}</span>
            </div>
            <div class="flex flex-row justify-between w-full">
                <div class="flex flex-row gap-6">
                    <span class="text-[#5E6278] text-sm font-normal leading-6">Discount</span>
                    <!--                    <span class="text-neutral-700 text-sm font-normal leading-6">({{ discountPercentage }}%)</span>-->
                </div>
                <span class="text-neutral-700 text-sm font-medium leading-6">$ {{ calculatedDiscount.toFixed(2) }}</span>
            </div>
            <div v-if="smallOrder" class="flex flex-row justify-between w-full">
                <div class="flex flex-col gap-1">
                    <div class="flex flex-row gap-2 items-center">
                        <span class="text-[#5E6278] text-sm font-normal leading-6">Handling Charge</span>
                        <button class="group" @click="showSmallOrderModal = true">
                            <InformationIcon class="text-[#5E6278] group-hover:text-[#007FFF] transition duration-300" />
                        </button>
                    </div>
                    <span class="text-neutral-700 italic text-sm font-normal leading-6">Small order charge</span>
                </div>
                <div class="flex flex-col justify-end">
                    <span class="text-neutral-700 text-sm font-medium leading-6">$ {{ smallOrder }}</span>
                </div>
            </div>
            <Transition name="fade-bottom">
                <div
                    v-if="showSmallOrderModal"
                    v-click-outside="() => (showSmallOrderModal = false)"
                    class="absolute bottom-[200px] left-0"
                >
                    <OrderSummarySmallOrderModal />
                </div>
            </Transition>
            <div class="flex flex-row justify-between w-full">
                <div class="flex flex-col gap-1">
                    <div class="flex flex-row gap-2 items-center">
                        <span class="text-[#5E6278] text-sm font-normal leading-6">Shipping</span>
                        <button class="group">
                            <InformationIcon class="text-[#5E6278] group-hover:text-[#007FFF] transition duration-300" />
                        </button>
                    </div>
                    <span v-if="order.deliveryMethod === 0" class="text-neutral-700 italic text-sm font-normal leading-6"
                        >Free Delivery (3-7 Days)</span
                    >
                    <span v-if="order.deliveryMethod === 1" class="text-neutral-700 italic text-sm font-normal leading-6"
                        >Standard Delivery (3-5 Days)</span
                    >
                    <span v-if="order.deliveryMethod === 2" class="text-neutral-700 italic text-sm font-normal leading-6"
                        >Express Delivery (1-3 Days)</span
                    >
                </div>
                <div class="flex flex-col justify-end">
                    <span v-if="order.deliveryMethod === 0" class="text-neutral-700 text-sm font-medium leading-6">$ 0.00</span>
                    <span v-if="order.deliveryMethod === 1" class="text-neutral-700 text-sm font-medium leading-6">$ 5.49</span>
                    <span v-if="order.deliveryMethod === 2" class="text-neutral-700 text-sm font-medium leading-6">$ 7.49</span>
                </div>
            </div>
            <div class="flex flex-row justify-between w-full">
                <div class="flex flex-row">
                    <span class="text-[#5E6278] text-sm font-normal leading-6">Tax:</span>
                    <button class="group ml-2">
                        <InformationIcon class="text-[#5E6278] group-hover:text-[#007FFF] transition duration-300" />
                    </button>
                    <span class="text-neutral-700 text-sm font-normal leading-6 ml-6">(VAT 19%)</span>
                </div>
                <span class="text-neutral-700 text-sm font-medium leading-6">$ {{ calculatedVAT }}</span>
            </div>
            <div class="w-full h-[1px] bg-[#EBEBEB] rounded-lg"></div>
            <div class="flex flex-row justify-between w-full">
                <span class="text-neutral-700 text-xl font-normal leading-9">Total</span>
                <span class="text-neutral-700 text-2xl font-semibold leading-9">$ {{ calculatedTotal }}</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import InformationIcon from '~/assets/icons/information.svg';
import { OrderInterface } from '~/types';

export default defineComponent({
    name: 'Summary',
    components: {
        InformationIcon,
    },
    props: {
        order: {
            type: Object as PropType<OrderInterface>,
            required: true,
        },
    },
    data() {
        return {
            showSmallOrderModal: false,
        };
    },
    computed: {
        smallOrder(): number {
            if (this.totalWithoutVAT >= 40) {
                return 0;
            }
            if (this.totalWithoutVAT < 40 && this.totalWithoutVAT >= 20) {
                return 5.49;
            }
            if (this.totalWithoutVAT < 20) {
                return 7.49;
            }
            return 0;
        },
        totalWithoutVAT(): number {
            if (this.order.subtotal) {
                return parseFloat(Number(this.order.subtotal).toFixed(2));
            }
            return 0;
        },
        calculatedDiscount(): number {
            return this.order.discount?.total || 0;
        },
        discountPercentage(): number {
            if (this.order.discount) {
                return this.order.discount.value;
            }
            return 0;
        },
        calculatedVAT(): number {
            if (this.order.subtotal) {
                return parseFloat((this.order.subtotal * 0.19).toFixed(2));
            }
            return 0;
        },
        calculatedTotal(): number {
            if (this.order.subtotal && !this.smallOrder) {
                return parseFloat((Number(this.order.subtotal) + this.calculatedVAT + this.shippingFee).toFixed(2));
            } else if (this.order.subtotal && this.smallOrder) {
                return parseFloat((Number(this.order.subtotal) + this.calculatedVAT + this.shippingFee + this.smallOrder).toFixed(2));
            }
            return 0;
        },
        shippingFee(): number {
            if (this.order.deliveryMethod === 0) {
                return 0;
            }
            if (this.order.deliveryMethod === 1) {
                return 5.49;
            }
            if (this.order.deliveryMethod === 2) {
                return 7.49;
            }
            return 0;
        },
    },
});
</script>
