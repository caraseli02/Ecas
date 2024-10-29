<script setup lang="ts">
import { usePaymentStore } from '~/store/paymentStore';
import { AlertTriangle, Trash2Icon, CheckCircle2 } from 'lucide-vue-next';

const paymentStore = usePaymentStore();

const props = defineProps<{
    cardInfo?: any;
    isSelected?: boolean;
    hasCard?: boolean;
    cards: boolean;
    view: 'modal' | 'payment';
    isExpired?: boolean;
    isNewCardSelected?: boolean;
    cardType?: string;
    showPayWithLabel?: boolean;
}>();

const emits = defineEmits(['selectPaymentOption', 'delete-card', 'set-default', 'edit-card']);
const paymentMethods = async (cardInfo: any) => {
    emits('selectPaymentOption', cardInfo);
};

const router = useRouter();

const onEditClick = () => {
    console.log('click');
    
    if (paymentStore.showCardsModal) {
        paymentStore.toggleCardModal();
        router.push({
            path: '/dashboard/client',
            query: { tab: 'settings', scrollTo: 'payments' }
        });
    }
    else {
        paymentStore.toggleCardModal();
    }
}
</script>

<template>
    <button
        class="p-3 w-full min-w-[326px] flex flex-col gap-3 border rounded-lg hover:bg-blue-500/5 hover:border-blue-500 transition duration-300 group"
        :class="isSelected ? 'border-blue-500 bg-blue-500/5' : 'border-gray-300'" @click="paymentMethods(cardInfo)">
        <div class="flex flex-row justify-between w-full gap-3">
            <SvgoRadioButtonChecked
v-if="isSelected"
                class="w-5 h-5 my-[3px] text-blue-500 group-hover:text-blue-500 transition duration-300" />
            <SvgoRadioButton
v-else
                class="w-5 h-5 my-[3px] text-gray-300 group-hover:text-neutral-700 transition duration-300" />
            <div v-if="hasCard" class="justify-between items-center self-stretch flex gap-5 w-full">
                <span class="items-stretch flex gap-2 my-auto">
                    <div class="capitalize text-zinc-800 text-sm font-medium leading-6 whitespace-nowrap">
                        {{ cardType }}
                    </div>
                    <div class="flex items-center gap-2 text-zinc-800 text-sm font-medium leading-6 grow whitespace-nowrap">
                        <span class="font-extrabold">••••</span>
                        <span class="">{{ cardInfo?.card.last4 }}</span>
                        <SvgoGreenCheckCircleSmall v-if="cardInfo?.hasOwnProperty('default') && cardInfo?.default" />
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
                <AlertTriangle class="w-5 h-5 text-rose-500" />
                <div class="text-red-500 text-sm leading-6">Card expired</div>
            </span>
            <span v-if="showPayWithLabel" class="text-neutral-700 text-sm font-normal leading-6 w-full text-start">Pay {{
                hasCard && isNewCardSelected ? 'with a new card' : 'by card' }}</span>
            <div class="flex justify-end w-full gap-2">
                <div v-if="!isSelected && !isExpired && !showPayWithLabel && cardInfo" class="flex gap-2 items-center justify-end">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_397_5131)">
                            <path
                                d="M5.3335 7.99992L7.02328 9.52073C7.31095 9.77963 7.75789 9.73998 7.9955 9.43449L10.6668 5.99992M8.00016 14.6666C11.6821 14.6666 14.6668 11.6818 14.6668 7.99992C14.6668 4.31802 11.6821 1.33325 8.00016 1.33325C4.31827 1.33325 1.3335 4.31802 1.3335 7.99992C1.3335 11.6818 4.31827 14.6666 8.00016 14.6666Z"
                                stroke="#2D2D2D" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_397_5131">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span class="text-neutral-700 text-sm font-normal leading-6">Set as default</span>
                </div>
                <UiButton
size="xs" variant="link" class="flex gap-2 items-center justify-end hover:underline"
                    @click="onEditClick()">
                    <SvgoChangeCard />
                    <span class="text-neutral-700 text-sm font-normal leading-6">Edit</span>
                </UiButton>
            </div>

        </div>
        <div v-if="view === 'modal'" class="flex justify-end w-full gap-2">
            <span v-if="isExpired" class="items-center flex justify-start gap-2 w-full">
                <AlertTriangle class="w-5 h-5 text-rose-500" />
                <div class="text-red-500 text-sm leading-6">Card expired</div>
            </span>
            <UiButton v-if="!isDefault && !isExpired" class="gap-1.5" variant="ghost" size="xs" @click.stop="emits('set-default', cardInfo)">
                <CheckCircle2 class="w-4 h-4" />
                <span class="text-neutral-700 text-sm font-normal leading-6">Set as default</span>
            </UiButton>
            <UiButton class="gap-1.5" variant="ghost" size="xs" @click.stop="emits('edit-card', cardInfo)">
                <SvgoChangeCard />
                <span class="text-neutral-700 text-sm font-normal leading-6">Edit</span>
            </UiButton>
            <UiButton class="gap-1.5" variant="ghost" size="xs" @click.stop="emits( 'delete-card',cardInfo)">
                <Trash2Icon class="w-4 h-4" />
                <span class="text-neutral-700 text-sm font-normal leading-6">Delete</span>
            </UiButton>
        </div>
    </button>
</template>

<style scoped></style>
