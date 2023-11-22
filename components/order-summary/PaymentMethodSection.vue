<template>
    <div class="flex flex-col gap-6">
        <div class="flex flex-row justify-between items-center">
            <span class="text-[#222] text-sm font-medium leading-6">Select Payment</span>
            <button class="group">
                <SettingCog class="text-[#5E6278] group-hover:text-[#007FFF] transition duration-300" />
            </button>
        </div>
        <div class="flex flex-col gap-4">
            <button @click="selectPaymentOption('Card')"
                class="p-3 flex flex-col gap-3 border rounded-lg hover:bg-[#007FFF0D] hover:border-[#007FFF] transition duration-300 group"
                :class="order.paymentDetails.type === 'Card' ? 'border-[#007FFF] bg-[#007FFF0D]' : 'border-[#D4D4D4] bg-[#FFF]'">
                <div class="flex flex-row justify-between w-full">
                    <RadioButtonChecked v-if="order.paymentDetails.type === 'Card'"
                        class="w-5 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300" />
                    <RadioButton v-else
                        class="w-5 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300" />
                    <MasterCard />
                </div>
                <div>
                    <span class="text-[#222] text-sm font-normal leading-6">Pay by card</span>
                </div>
            </button>
            <button @click="selectPaymentOption('Bank')"
                class="p-3 flex flex-col gap-3 border rounded-lg hover:bg-[#007FFF0D] hover:border-[#007FFF] transition duration-300 group"
                :class="order.paymentDetails.type === 'Bank' ? 'border-[#007FFF] bg-[#007FFF0D]' : 'border-[#D4D4D4] bg-[#FFF]'">
                <div class="flex flex-row justify-between w-full">
                    <RadioButtonChecked v-if="order.paymentDetails.type === 'Bank'"
                        class="w-5 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300" />
                    <RadioButton v-else
                        class="w-5 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300" />
                    <BankIcon />
                </div>
                <div>
                    <span class="text-[#222] text-sm font-normal leading-6">Bank Transfer</span>
                </div>
            </button>
            <button @click="selectPaymentOption('Credit')"
                class="p-3 flex flex-col gap-3 border rounded-lg hover:bg-[#007FFF0D] hover:border-[#007FFF] transition duration-300 group"
                :class="order.paymentDetails.type === 'Credit' ? 'border-[#007FFF] bg-[#007FFF0D]' : 'border-[#D4D4D4] bg-[#FFF]'">
                <div class="flex flex-row justify-between w-full">
                    <RadioButtonChecked v-if="order.paymentDetails.type === 'Credit'"
                        class="w-5 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300" />
                    <RadioButton v-else
                        class="w-5 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300" />
                    <PieChart />
                </div>
                <div class="flex flex-row justify-between w-full">
                    <span class="text-[#222] text-sm font-normal leading-6">Pay from credit</span>
                    <div class="flex flex-row gap-2">
                        <span class="text-[#222] text-sm font-normal leading-6">Available:</span>
                        <!-- <span class="text-[#007FFF] text-sm font-semibold leading-6">$ {{ accountCredit.available }}</span> -->
                        <span class="text-[#007FFF] text-sm font-semibold leading-6">$ 7254.36</span> <!-- placeholder (uncomment the above line) -->
                    </div>
                </div>
            </button>
            <button @click="selectPaymentOption('Cash')"
                class="p-3 flex flex-col gap-3 border rounded-lg hover:bg-[#007FFF0D] hover:border-[#007FFF] transition duration-300 group"
                :class="order.paymentDetails.type === 'Cash' ? 'border-[#007FFF] bg-[#007FFF0D]' : 'border-[#D4D4D4] bg-[#FFF]'">
                <div class="flex flex-row justify-between w-full">
                    <RadioButtonChecked v-if="order.paymentDetails.type === 'Cash'"
                        class="w-5 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300" />
                    <RadioButton v-else
                        class="w-5 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300" />
                    <MoneyIcon />
                </div>
                <div>
                    <span class="text-[#222] text-sm font-normal leading-6">Cash on delivery</span>
                </div>
            </button>
        </div>
    </div>
</template>
<script lang="ts">
import SettingCog from '@/assets/icons/setting-cog.svg'
import MasterCard from '@/assets/icons/master-card.svg'
import RadioButton from '@/assets/icons/radio-button.svg';
import RadioButtonChecked from '@/assets/icons/radio-button-checked.svg';
import BankIcon from '@/assets/icons/bank.svg';
import PieChart from '@/assets/icons/pie-chart.svg';
import MoneyIcon from '@/assets/icons/money.svg';

export default defineComponent({
    name: 'PaymentMethodSection',
    props: ['order', 'accountCredit'],
    components: {
        SettingCog,
        MasterCard,
        RadioButton,
        RadioButtonChecked,
        BankIcon,
        PieChart,
        MoneyIcon,
    },
    methods: {
        selectPaymentOption(option: string) {
            this.order.paymentDetails.type = option;
        },
    },
})
</script>