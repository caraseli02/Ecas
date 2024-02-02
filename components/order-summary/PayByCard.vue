<template>
    <button
        class="p-3 w-full min-w-[326px] md:min-w-[352px] flex flex-col gap-3 border rounded-lg hover:bg-blue-500/5 hover:border-blue-500 transition duration-300 group"
        :class="isSelected ? 'border-blue-500 bg-blue-500/5' : 'border-gray-300'"
        @click="paymentMethods(cardInfo)"
    >
        <div class="flex flex-row justify-between w-full gap-3">
            <SvgoRadioButtonChecked
                v-if="isSelected"
                class="w-5 h-5 my-[3px] text-blue-500 group-hover:text-blue-500 transition duration-300"
            />
            <SvgoRadioButton v-else class="w-5 h-5 my-[3px] text-gray-300 group-hover:text-neutral-700 transition duration-300" />
            <div v-if="hasCard" class="justify-between items-center self-stretch flex gap-5 w-full">
                <span class="items-stretch flex gap-2 my-auto">
                    <div class="capitalize text-zinc-800 text-sm font-medium leading-6 whitespace-nowrap">
                        {{ cardType }}
                    </div>
                    <div class="flex items-center gap-2 text-zinc-800 text-sm font-medium leading-6 grow whitespace-nowrap">
                        <span class="font-extrabold">••••</span>
                        <span class="">{{ cardInfo?.card.last4 }}</span>
                        <SvgoGreenCheckCircleSmall v-if="cardInfo.hasOwnProperty('default')" />
                    </div>
                </span>
                <SvgoCardVisa v-if="hasCard && cardType === 'visa'" />
                <SvgoCardMaster v-if="hasCard && cardType === 'mastercard'" />
                <SvgoCardAmex v-if="hasCard && cardType === 'amex'" />
            </div>
            <SvgoCardIcon v-else />
        </div>
        <div v-if="view === 'payment'" class="flex justify-between w-full">
            <span v-if="isExpired" class="items-center flex justify-start gap-2 w-full">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="9.99984" cy="14.1666" rx="0.833333" ry="0.833333" fill="#FA4B4B" />
                    <path
                        d="M9.99979 7.49997V11.6666M3.60641 17.5H16.3933C17.8703 17.5 18.8039 15.9527 18.0866 14.6937L11.6932 3.4716C10.9551 2.17613 9.04454 2.17613 8.30649 3.4716L1.91306 14.6937C1.19576 15.9527 2.12939 17.5 3.60641 17.5Z"
                        stroke="#FA4B4B"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <div class="text-red-500 text-sm leading-6">Card expired</div>
            </span>
            <span v-else class="text-neutral-700 text-sm font-normal leading-6 w-full text-start"
                >Pay {{ isNewCardSelected ? 'with a new card' : 'by card' }}</span
            >
            <button v-if="cards" class="flex gap-2 items-center w-full justify-end hover:underline" @click="paymentStore.toggleCardModal()">
                <SvgoChangeCard />
                <span class="text-neutral-700 text-sm font-normal leading-6">Change card</span>
            </button>
        </div>
        <div v-if="view === 'modal'" class="flex justify-end w-full gap-6">
            <span v-if="isExpired" class="items-center flex justify-start gap-2 w-full">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="9.99984" cy="14.1666" rx="0.833333" ry="0.833333" fill="#FA4B4B" />
                    <path
                        d="M9.99979 7.49997V11.6666M3.60641 17.5H16.3933C17.8703 17.5 18.8039 15.9527 18.0866 14.6937L11.6932 3.4716C10.9551 2.17613 9.04454 2.17613 8.30649 3.4716L1.91306 14.6937C1.19576 15.9527 2.12939 17.5 3.60641 17.5Z"
                        stroke="#FA4B4B"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>

                <div class="text-red-500 text-sm leading-6">Card expired</div>
            </span>
            <div v-if="!isSelected && !isExpired" class="flex gap-2 items-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_397_5131)">
                        <path
                            d="M5.3335 7.99992L7.02328 9.52073C7.31095 9.77963 7.75789 9.73998 7.9955 9.43449L10.6668 5.99992M8.00016 14.6666C11.6821 14.6666 14.6668 11.6818 14.6668 7.99992C14.6668 4.31802 11.6821 1.33325 8.00016 1.33325C4.31827 1.33325 1.3335 4.31802 1.3335 7.99992C1.3335 11.6818 4.31827 14.6666 8.00016 14.6666Z"
                            stroke="#2D2D2D"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_397_5131">
                            <rect width="16" height="16" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <span class="text-neutral-700 text-sm font-normal leading-6">Set as default</span>
            </div>
            <div class="flex gap-2 items-center">
                <SvgoChangeCard />
                <span class="text-neutral-700 text-sm font-normal leading-6">Edit</span>
            </div>
        </div>
    </button>
</template>

<script setup lang="ts">
import { usePaymentStore } from '~/store/paymentStore';

const paymentStore = usePaymentStore();

const props = defineProps<{
    cardInfo?: any;
    isSelected?: boolean;
    hasCard?: boolean;
    cards: boolean;
    view: 'modal' | 'payment';
    isExpired?: boolean;
    isNewCardSelected?: boolean;
    cardType?: 'visa' | 'mastercard' | 'amex';
}>();

const emits = defineEmits(['selectPaymentOption']);
const paymentMethods = async (cardInfo: any) => {
    emits('selectPaymentOption', cardInfo);
};
</script>

<style scoped></style>