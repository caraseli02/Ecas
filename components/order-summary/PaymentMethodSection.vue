<template>
    <div class="flex flex-col gap-6">
        <div class="flex flex-row justify-between items-center">
            <span class="text-neutral-700 text-sm font-medium leading-6">Select Payment</span>
            <button class="group">
                <SettingCog class="text-slate-500 group-hover:text-blue-500 transition duration-300" />
            </button>
        </div>
        <div class="flex flex-col gap-4 relative">
            <OrderSummaryNewCard v-if="isNewCardSelected" :is-selected="true"
                @click="selectPaymentOption({ type: PaymentTypeEnum.Card, info: null })">
                <UiButton v-if="cards.length > 0" size="xs" variant="link" class="flex gap-2 items-center justify-end hover:underline pt-4"
                    @click="paymentStore.toggleCardModal();">
                    <SvgoChangeCard />
                    <span class="text-neutral-700 text-sm font-normal leading-6">Change</span>
                </UiButton>
            </OrderSummaryNewCard>
            <template v-else>
                <OrderSummaryPayByCard
                    v-if="card && card?.card?.brand && !isNewCardSelected && availablePaymentMethods.includes(PaymentTypeEnum.Card)"
                    view="payment" :card-info="card" :card-type="card?.card?.brand"
                    :is-selected="order?.paymentDetails?.type === PaymentTypeEnum.Card && order?.paymentDetails?.card?.id === card.id"
                    :has-card="true" :cards="true" :is-new-card-selected="isNewCardSelected"
                    :is-expired="cardExpired(card)" show-pay-with-label
                    @select-payment-option="selectPaymentOption({ type: PaymentTypeEnum.Card, info: $event })" />
                <OrderSummaryPayByCard
                    v-else-if="card && isNewCardSelected && availablePaymentMethods.includes(PaymentTypeEnum.Card)"
                    view="payment" :cards="true" :is-new-card-selected="isNewCardSelected"
                    :is-selected="order?.paymentDetails?.type === PaymentTypeEnum.Card && !order?.paymentDetails?.card"
                    show-pay-with-label
                    @select-payment-option="selectPaymentOption({ type: PaymentTypeEnum.Card, info: null })" />
                <OrderSummaryPayByCard v-else-if="!card && availablePaymentMethods.includes(PaymentTypeEnum.Card)"
                    view="payment" :cards="false" :is-new-card-selected="false"
                    :is-selected="order?.paymentDetails?.type === PaymentTypeEnum.Card && !order?.paymentDetails?.card"
                    @select-payment-option="selectPaymentOption({ type: PaymentTypeEnum.Card, info: null })" />
            </template>
            <button v-if="availablePaymentMethods.includes(PaymentTypeEnum.Bank)"
                class="p-3 flex flex-col gap-3 border rounded-lg hover:bg-[#007FFF0D] hover:border-blue-500 transition duration-300 group"
                :class="order.paymentDetails?.type === 3 ? 'border-blue-500 bg-[#007FFF0D]' : 'border-grey-300 bg-white'"
                @click="selectPaymentOption({ type: PaymentTypeEnum.Bank })">
                <div class="flex flex-row justify-between w-full">
                    <RadioButtonChecked v-if="order.paymentDetails?.type === 3"
                        class="w-5 h-5 my-[3px] text-blue-500 group-hover:text-blue-500 transition duration-300" />
                    <RadioButton v-else
                        class="w-5 h-5 my-[3px] text-grey-300 group-hover:text-slate-500 transition duration-300" />
                    <BankIcon />
                </div>
                <div>
                    <span class="text-neutral-700 text-sm font-normal leading-6">Bank Transfer</span>
                </div>
            </button>
            <button v-if="availablePaymentMethods.includes(PaymentTypeEnum.Credit) && accountCredit.available > 0"
                class="p-3 flex flex-col gap-3 border rounded-lg hover:bg-[#007FFF0D] hover:border-blue-500 transition duration-300 group"
                :class="order.paymentDetails?.type === 1 ? 'border-blue-500 bg-[#007FFF0D]' : 'border-grey-300 bg-white'"
                :disabled="accountCredit.active" @click="selectPaymentOption({ type: PaymentTypeEnum.Credit })">
                <div class="flex flex-row justify-between w-full">
                    <RadioButtonChecked v-if="order.paymentDetails?.type === 1"
                        class="w-5 h-5 my-[3px] text-blue-500 group-hover:text-blue-500 transition duration-300" />
                    <RadioButton v-else
                        class="w-5 h-5 my-[3px] text-grey-300 group-hover:text-slate-500 transition duration-300" />
                    <PieChart />
                </div>
                <div class="flex flex-row justify-between w-full">
                    <span class="text-neutral-700 text-sm font-normal leading-6">Pay from credit</span>
                    <div class="flex flex-row gap-2">
                        <span class="text-neutral-700 text-sm font-normal leading-6">Available:</span>
                        <button @click="showCreditInfoModal = true">
                            <!-- <span class="text-blue-500 text-sm font-semibold leading-6">$ {{ accountCredit.available }}</span> -->
                            <span class="text-blue-500 text-sm font-semibold leading-6">{{
                                accountCredit?.available?.toFixed(2) || 0
                                }}</span>
                            <!-- placeholder (uncomment the above line) -->
                        </button>
                    </div>
                </div>
            </button>
            <Transition name="fade-bottom">
                <div v-if="showCreditInfoModal" v-click-outside="() => (showCreditInfoModal = false)"
                    class="absolute bottom-[160px] right-0">
                    <OrderSummaryCreditInfoModal :account-credit="accountCredit" />
                </div>
            </Transition>
            <button v-if="availablePaymentMethods.includes(PaymentTypeEnum.Cash)"
                class="p-3 flex flex-col gap-3 border rounded-lg hover:bg-[#007FFF0D] hover:border-blue-500 transition duration-300 group"
                :class="order.paymentDetails?.type === 2 ? 'border-blue-500 bg-[#007FFF0D]' : 'border-grey-300 bg-white'"
                @click="selectPaymentOption({ type: PaymentTypeEnum.Cash })">
                <div class="flex flex-row justify-between w-full">
                    <RadioButtonChecked v-if="order.paymentDetails?.type === 2"
                        class="w-5 h-5 my-[3px] text-blue-500 group-hover:text-blue-500 transition duration-300" />
                    <RadioButton v-else
                        class="w-5 h-5 my-[3px] text-grey-300 group-hover:text-slate-500 transition duration-300" />
                    <MoneyIcon />
                </div>
                <div>
                    <span class="text-neutral-700 text-sm font-normal leading-6">Cash on delivery</span>
                </div>
            </button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import SettingCog from '@/assets/icons/setting-cog.svg';
import RadioButton from '@/assets/icons/radio-button.svg';
import RadioButtonChecked from '@/assets/icons/radio-button-checked.svg';
import BankIcon from '@/assets/icons/bank.svg';
import PieChart from '@/assets/icons/pie-chart.svg';
import MoneyIcon from '@/assets/icons/money.svg';
import { OrderInterface, PaymentDetails, PaymentTypeEnum } from '~/types';
import { CustomerCreditInterface } from '~/types/auth/account-settings';
import moment from 'moment/moment';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/authStore';
import { usePaymentStore } from '~/store/paymentStore';

const paymentStore = usePaymentStore();

const props = defineProps<{
    order: OrderInterface;
    accountCredit: CustomerCreditInterface;
    card: any;
    cards: any;
    isNewCardSelected: boolean;
}>();

const emits = defineEmits(['update-payment-details', 'change-is-new-card-selected']);
const showCreditInfoModal = ref(false);
const payment = ref({} as PaymentDetails);

const authStore = useAuthStore();

const { getGeneralSettings } = storeToRefs(authStore);
const availablePaymentMethods = ref<any>([] as any);

const paymentMethods = async () => {
    getGeneralSettings.value.orderSettings?.paymentMethods.map((method: any) => {
        availablePaymentMethods.value.push(method.type);
    });
};

await paymentMethods();

function selectPaymentOption(option: { type: PaymentTypeEnum; info?: any }) {
    payment.value = {} as PaymentDetails;

    if (props.order.paymentDetails) {
        payment.value.type = option.type;

        if (option.type === PaymentTypeEnum.Card) {
            payment.value.card = option.info;
        }
        emits('update-payment-details', payment.value);
    }
}

function cardExpired(card: any) {
    const exp_date = moment([card.card.exp_year, card.card.exp_month]);
    const date = moment([Number(moment().format('y')), Number(moment().format('M'))]);
    const dif = exp_date.diff(date, 'months');
    return dif < 0;
}
</script>
