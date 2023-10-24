<template>
    <div class="grid items-center" :class="columnWidths">
        <div v-for="section in activeSections" :class="section.class">
            <CustomCheckBox v-if="section.checkbox" :item="item" @check="$emit('check')" />
            <NameAndProfile v-if="section.profile" :item="section.profileKey ? item[section.profileKey] : item"
                :loading="loading" :index="index" :showAvatar="section.showAvatar" :showFlag="true" :showDiscount="true"
                :showLock="true" @showInformation="section.event" :customClass="section.customClass" />
            <TextBox v-if="section.text" :text="item[section.name]" :loading="loading" :customClass="section.customClass" />
            <OrderId v-if="section.orderId" :item="item" :loading="loading" />
            <OrderType v-if="section.orderType" :item="item" :loading="loading" />
            <OrderStatus v-if="section.orderStatus" :status="item[section.statusKey]" :loading="loading" />
            <TxType v-if="section.txType" :item="item" :loading="loading" />
            <TxStatus v-if="section.txStatus" :item="item" :loading="loading" />
            <PaymentStatus v-if="section.paymentStatus" :status="item.payment" :loading="loading" />
        </div>
        <div v-if="actionsMenuType === 'customers-list'" class="flex items-center justify-end gap-4 pl-4 pr-1.5">
            <ActionsMenu :loading="loading" :index="index" :documentButton="true" :threeDotButton="true"
                @showOptions="handleShowOptions" :txtDocument="'View Orders'" :documentDisabled="documentDisabled"
                :invoiceDisabled="invoiceDisabled" :downloadDisabled="downloadDisabled" />
        </div>
        <div v-if="actionsMenuType === 'customer-orders'" class="flex items-center justify-end gap-4 pl-4 pr-1.5">
            <ActionsMenu :loading="loading" :index="index" :documentButton="true" :invoiceButton="true"
                :threeDotButton="true" @showOptions="handleShowOptions" :txtDocument="'View Order'"
                :txtInvoice="'View Invoice'" :documentDisabled="documentDisabled" :invoiceDisabled="invoiceDisabled"
                :downloadDisabled="downloadDisabled" />
        </div>
        <div v-if="actionsMenuType === 'tx-history'" class="flex items-center justify-end p-4 pr-[26px]">
            <ActionsMenu :loading="loading" :index="index" :downloadButton="true" :txtDownload="'Download'"
                :documentDisabled="documentDisabled" :invoiceDisabled="invoiceDisabled"
                :downloadDisabled="downloadDisabled" />
        </div>
        <div v-if="actionsMenuType === 'orders-list'" class="flex items-center justify-end gap-6 pr-4"
            :class="[loading ? 'px-4' : '']">
            <ActionsMenu :loading="loading" :index="index" :threeDotButton="true" @showOptions="handleShowOptions"
                :documentDisabled="documentDisabled" :invoiceDisabled="invoiceDisabled"
                :downloadDisabled="downloadDisabled" />
        </div>
    </div>
    <Teleport to="body">
        <Transition :name="index > 5 ? 'fade-full-neg' : 'fade-bottom'">
            <ThreeDotMenu v-if="showOptions && (actionsMenuType === 'customers-list')"
                v-click-outside="() => (showOptions = false)" :index="index" :dropdownTop="optionsDropdownTop"
                :dropdownLeft="optionsDropdownLeft" :profileButton="true" :profile="item" :profileText="'Profile'"
                :documentButton="true" :documentText="'Orders'" :settingsButton="true" :settingsText="'Settings'"
                :deactivateButton="true" :deactivateText="'Deactivate Account'" :trashButton="true"
                :trashText="'Delete Account'" @profileClicked="showOptions = false" @documentClicked="showOptions = false"
                @settingsClicked="showOptions = false" @deactivateClicked="showDeactivatingModal = true;
                showOptions = false;" @trashClicked="showOptions = false" />
        </Transition>
        <Transition :name="index > 5 ? 'fade-full-neg' : 'fade-bottom'">
            <ThreeDotMenu v-if="showOptions && (actionsMenuType === 'customer-orders')"
                v-click-outside="() => (showOptions = false)" :index="index" :dropdownTop="optionsDropdownTop"
                :dropdownLeft="optionsDropdownLeft" :invoiceButton="true" :invoiceText="'View Invoice'" :editButton="true"
                :editText="'Edit Order'" @invoiceClicked="showOptions = false" @editClicked="showOptions = false" />
        </Transition>
        <Transition :name="index > 8 ? 'fade-full-neg' : 'fade-bottom'">
            <ThreeDotMenu v-if="showOptions && (actionsMenuType === 'orders-list')"
                v-click-outside="() => (showOptions = false)" :index="index" :dropdownTop="optionsDropdownTop"
                :dropdownLeft="optionsDropdownLeft" :documentButton="true" :documentText="'View Order'"
                :invoiceButton="true" :invoiceText="'View Invoice'" @documentClicked="showOptions = false"
                @invoiceClicked="showOptions = false" />
        </Transition>
        <Transition name="fade">
            <DashboardDeactivateUserModal v-if="showDeactivatingModal" :user="item"
                @close="showDeactivatingModal = false" />
        </Transition>
        <div class="fixed z-50 top-0 left-0 w-full h-full bg-[#2F3241]/10 transition-all duration-300 cursor-pointer"
            :class="[showDeactivatingModal ? 'backdrop-blur-[7.5px]' : 'backdrop-blur-0 opacity-0 pointer-events-none']"
            @click="showDeactivatingModal = false" />
    </Teleport>
</template>
<script lang="ts">
import NameAndProfile from '~/components/shared/tables/micro/row-items/NameAndProfile.vue';
import ActionsMenu from '~/components/shared/tables/micro/row-items/ActionsMenu.vue';
import ThreeDotMenu from '~/components/shared/tables/micro/row-items/ThreeDotMenu.vue';
import TextBox from './micro/row-items/TextBox.vue';
import OrderId from './micro/row-items/OrderId.vue';
import OrderType from './micro/row-items/OrderType.vue';
import OrderStatus from './micro/row-items/OrderStatus.vue';
import CustomCheckBox from './micro/row-items/CustomCheckBox.vue';
import TxType from './micro/row-items/TxType.vue';
import TxStatus from './micro/row-items/TxStatus.vue';
import PaymentStatus from './micro/row-items/PaymentStatus.vue';

interface Section {
    checkbox: boolean;
    name: string;
    class: string;
    customClass: string;
    profile: boolean;
    text: boolean;
    event: any;
    orderId: boolean;
    orderType: boolean;
    orderStatus: boolean;
    txType: boolean;
    txStatus: boolean;
    fulfillmentStatus: boolean;
    paymentStatus: boolean;
    statusKey: string;
    profileKey: string;
    showAvatar: boolean;
};

export default defineComponent({
    name: 'CustomItem',
    props: [
        'fields', 'item', 'index', 'loading', 'isScrolling', 'actionsMenuType', 'columnWidths',
        'nameAndProfileClass',
        'orderStatusKey', 'profileKey',
        'showAvatar',
        'checkBoxItemClass', 'nameAndProfileItemClass', 'accountTypeItemClass', 'companyNameItemClass', 'registerDateItemClass', 'spentAmountItemClass', 'ordersCountItemClass', 'orderIdItemClass', 'orderTypeItemClass', 'orderDateItemClass', 'orderStatusItemClass', 'orderTotalItemClass', 'invoiceIdItemClass', 'orderAmountItemClass', 'txTypeItemClass', 'txDateItemClass', 'txStatusItemClass', 'paymentStatusItemClass', // specific class overwrites
        'documentDisabled', 'invoiceDisabled', 'downloadDisabled',
    ],
    components: {
        NameAndProfile,
        ActionsMenu,
        ThreeDotMenu,
        TextBox,
        OrderId,
        OrderType,
        OrderStatus,
        CustomCheckBox,
        TxType,
        TxStatus,
        PaymentStatus,
    },
    data() {
        return {
            showOptions: false,
            optionsDropdownLeft: 0,
            optionsDropdownTop: 0,
            showDeactivatingModal: false,
        };
    },
    computed: {
        sections(): object {
            const sections = {
                checkBox: {
                    checkbox: true,
                    class: this.checkBoxItemClass || 'flex items-center justify-center p-4',
                },
                nameAndProfile: {
                    profile: true,
                    event: this.showCustomerInformation,
                    class: this.nameAndProfileItemClass || 'pl-4 pr-1.5 py-3',
                    customClass: this.nameAndProfileClass,
                    profileKey: this.profileKey,
                    showAvatar: this.showAvatar,
                },
                accountType: {
                    name: 'account',
                    text: true,
                    class: this.accountTypeItemClass || 'text-sm leading-[1.43] truncate pl-4 pr-1.5',
                },
                companyName: {
                    name: 'company',
                    text: true,
                    class: this.companyNameItemClass || 'text-sm leading-[1.43] truncate pl-4 pr-1.5',
                },
                registerDate: {
                    name: 'registered',
                    text: true,
                    class: this.registerDateItemClass || 'text-sm leading-[1.43] truncate pl-4 pr-1.5',
                },
                spentAmount: {
                    name: 'spent',
                    text: true,
                    class: this.spentAmountItemClass || 'text-sm leading-[1.43] font-medium truncate pl-4 pr-1.5',
                },
                ordersCount: {
                    name: 'ordersCount',
                    text: true,
                    class: this.ordersCountItemClass || 'flex justify-center pl-4 pr-1.5',
                    customClass: 'text-sm leading-[1.43] font-medium text-[#006D4D] bg-[#00D39540] px-3 py-1 rounded-md',
                },
                orderId: {
                    orderId: true,
                    class: this.orderIdItemClass || 'p-6 text-sm font-medium truncate',
                },
                orderType: {
                    orderType: true,
                    class: this.orderTypeItemClass || 'px-6 py-4',
                },
                orderDate: {
                    text: true,
                    class: this.orderDateItemClass || 'p-6 text-sm truncate',
                    name: 'date',
                },
                orderStatus: {
                    orderStatus: true,
                    class: this.orderStatusItemClass || 'px-6 py-4',
                    statusKey: this.orderStatusKey,
                },
                orderTotal: {
                    text: true,
                    class: this.orderTotalItemClass || 'p-6 text-sm',
                    name: 'total',
                },
                invoiceId: {
                    text: true,
                    class: this.invoiceIdItemClass || 'px-2 py-4 text-sm font-medium leading-[1.71] text-blue',
                    name: 'invoiceId',
                },
                orderAmount: {
                    text: true,
                    class: this.orderAmountItemClass || 'px-2 py-4 text-sm font-medium leading-[1.71]',
                    name: 'amount',
                },
                txType: {
                    txType: true,
                    class: this.txTypeItemClass || 'flex items-center px-2 py-4 text-sm font-medium leading-[1.71]',
                },
                txDate: {
                    text: true,
                    class: this.txDateItemClass || 'px-2 py-4 text-sm leading-[1.71]',
                    name: 'date',
                },
                txStatus: {
                    txStatus: true,
                    class: this.txStatusItemClass || 'flex items-center px-2 py-4 text-sm font-medium leading-[1.71]',
                },
                paymentStatus: {
                    paymentStatus: true,
                    class: this.paymentStatusItemClass || 'py-5 px-6',
                },
            };
            return sections;
        },
        activeSections(): Section[] {
            const orderedSections: Section[] = [];
            this.fields.forEach((field: string) => {
                if (field in this.sections) {
                    orderedSections.push(this.sections[field as keyof typeof this.sections]);
                }
            });
            return orderedSections;
        },
        scrolling() {
            return this.isScrolling;
        },
    },
    methods: {
        showCustomerInformation(item: any) {
            this.$emit('showInformation', this.item);
        },
        handleShowOptions(event: MouseEvent) {
            this.showOptions = !this.showOptions;
            const target = event.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            this.optionsDropdownLeft = rect.left + 28;
            this.optionsDropdownTop = rect.top + window.scrollY + 36;
        },
    },
    watch: {
        scrolling(newVal: boolean) {
            if (newVal) {
                this.showOptions = false;
            }
        },
    },
});
</script>