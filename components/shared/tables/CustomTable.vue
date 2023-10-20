<template>
    <div class="mb-6 min-h-[350px] md:mb-8">
        <div class="dashboardTable grid grid-cols-1 gap-1 rounded-t-lg overflow-x-auto scrollbar-thin" @scroll="handleScroll">
            <div class="grid items-center rounded-t-lg" :class="colsWidthsCalculated">
                <div v-for="(section, index) in activeSections" :key="index" :class="section.class">
                    <CheckBoxAll v-if="section.checkbox" :check-all="checkAll" @checkAll="$emit('checkAll')" />
                    <SortAscDesc v-if="!section.checkbox" :order="section.order" :title="section.title" @sortChange="section.sortChange" />
                    <DashboardSearch
                        v-if="section.search"
                        v-model="section.value"
                        :placeholder="section.placeholder"
                        size="sm"
                        class="w-full"
                        @input="section.filterChange"
                        @clearSearch="clearSearch(section)"
                    />
                    <CustomSelect
                        v-if="section.select"
                        :selected-item="section.selectedItem"
                        :options-visible="section.optionsVisible"
                        @handleShow="section.handleShow"
                    />
                    <DatePickerButton
                        v-if="section.datePicker"
                        :range="section.range"
                        :date-picker-visible="section.datePickerVisible"
                        @showDatePicker="section.handleShow"
                    />
                    <FilterButton
                        v-if="section.filterButton"
                        :range-value="section.rangeValue"
                        :range-visible="section.rangeVisible"
                        :text-gray-condition="section.textGrayCondition"
                        :tracking-widest-condition="section.trackingWidestCondition"
                        :custom-classes="section.customClasses"
                        @showSpentRange="section.handleShow"
                    />
                </div>
                <div
                    v-if="actionsHeader && actionsMenuType === 'customers-list'"
                    :class="filters ? 'p-4' : 'px-4 pt-4'"
                    class="pr-1.5 w-full rounded-r-lg bg-[#F2F2F2] self-stretch"
                >
                    <div class="relative">
                        <div class="flex items-center mb-4">
                            <span class="text-sm leading-[1.43] font-medium"> Actions </span>
                        </div>
                    </div>
                </div>
                <div
                    v-if="actionsHeader && actionsMenuType === 'customer-orders'"
                    class="p-4 pr-[50px] w-full rounded-r-lg bg-[#F2F2F2] self-stretch"
                >
                    <div class="relative">
                        <div class="flex items-center justify-end mb-4">
                            <span class="text-sm leading-[1.43] font-medium"> Actions </span>
                        </div>
                    </div>
                </div>
                <div
                    v-if="actionsHeader && actionsMenuType === 'tx-history'"
                    class="flex justify-center px-2 py-4 bg-[#F2F2F2] rounded-r-lg"
                >
                    <span class="text-sm font-medium leading-[1.43]">Actions</span>
                </div>
                <div v-if="actionsHeader && actionsMenuType === 'orders-list'" class="p-4 w-full rounded-r-lg bg-[#F2F2F2] self-stretch">
                    <div class="relative">
                        <div class="flex items-center justify-end mb-4">
                            <span class="text-sm leading-[1.43] font-medium"> Actions </span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="items.length === 0 || error"
                class="flex flex-col items-center justify-center flex-1 my-20 lg:my-[200px] xl:my-[320px]"
            >
                <EmojiSadIcon class="w-[52px] h-[52px] mb-4" />
                <div class="text-sm font-medium leading-[1.43] text-gray-100">No data available</div>
            </div>
            <component
                :is="customItem"
                v-for="(item, index) in items"
                :key="index"
                :item="item"
                :index="index"
                :is-scrolling="isScrolling"
                :loading="loading"
                :fields="fields"
                :actions-menu-type="actionsMenuType"
                :column-widths="colsWidthsCalculated"
                :name-and-profile-class="nameAndProfileClass"
                :order-status-key="orderStatusKey"
                :profile-key="profileKey"
                :show-avatar="showAvatar"
                :name-and-profile-item-class="nameAndProfileItemClass"
                :account-type-item-class="accountTypeItemClass"
                :company-name-item-class="companyNameItemClass"
                :register-date-item-class="registerDateItemClass"
                :spent-amount-item-class="spentAmountItemClass"
                :orders-count-item-class="ordersCountItemClass"
                :order-id-item-class="orderIdItemClass"
                :order-type-item-class="orderTypeItemClass"
                :order-date-item-class="orderDateItemClass"
                :order-status-item-class="orderStatusItemClass"
                :order-total-item-class="orderTotalItemClass"
                :invoice-id-item-class="invoiceIdItemClass"
                :order-amount-item-class="orderAmountItemClass"
                :tx-type-item-class="txTypeItemClass"
                :tx-date-item-class="txDateItemClass"
                :tx-status-item-class="txStatusItemClass"
                :payment-status-item-class="paymentStatusItemClass"
                :document-disabled="item.documentDisabled"
                :invoice-disabled="item.invoiceDisabled"
                :download-disabled="item.downloadDisabled"
                @check="$emit('check', item.id)"
            />
        </div>
    </div>
    <Teleport to="body">
        <Transition name="fade-bottom">
            <CustomSelectDropdown
                v-if="showAccountOptions"
                v-click-outside="() => (showAccountOptions = false)"
                :items="accountOptions"
                :dropdown-top="accountDropdownTop"
                :dropdown-left="accountDropdownLeft"
                :selected-item="account"
                :custom-classes="'w-[163px]'"
                @handleSelection="handleAccountFilterChange"
            />
        </Transition>
        <Transition name="fade-bottom">
            <div
                v-if="showRegisteredRange"
                v-click-outside="() => (showRegisteredRange = false)"
                class="absolute z-10 -translate-x-full rounded-lg overflow-hidden shadow-m"
                :style="{
                    left: registeredDropdownLeft + 'px',
                    top: registeredDropdownTop + 'px',
                }"
            >
                <DatePicker v-model.range="registeredDateRange" borderless />
            </div>
        </Transition>
        <Transition name="fade-bottom">
            <RangeFilter
                v-if="showSpentRange"
                v-click-outside="() => (showSpentRange = false)"
                title="Spent"
                :range="spent"
                :dropdown-left="spentRangeDropdownLeft"
                :dropdown-top="spentRangeDropdownTop"
                @cancel="showSpentRange = false"
                @apply="handleSpentFilterChange"
            />
        </Transition>
        <Transition name="fade-bottom">
            <SliderFilter
                v-if="showOrdersRange"
                v-click-outside="() => (showOrdersRange = false)"
                title="Orders"
                :range="ordersCount"
                :dropdown-left="ordersRangeDropdownLeft"
                :dropdown-top="ordersRangeDropdownTop"
                @cancel="showOrdersRange = false"
                @apply="handleOrdersFilterChange"
            />
        </Transition>
        <Transition name="fade">
            <RangeFilterMobile
                v-if="showSpentRange"
                title="Spent"
                :range="spent"
                @cancel="showSpentRange = false"
                @apply="handleSpentFilterChange"
            />
        </Transition>
        <Transition name="fade">
            <SliderFilterMobile
                v-if="showOrdersRange"
                title="Orders"
                :range="ordersCount"
                @cancel="showOrdersRange = false"
                @apply="handleOrdersFilterChange"
            />
        </Transition>
        <Transition name="fade-bottom">
            <CustomSelectDropdown
                v-if="showOrderTypeOptions"
                v-click-outside="() => (showOrderTypeOptions = false)"
                :items="orderTypeOptionsList"
                :dropdown-top="orderTypeDropdownTop"
                :dropdown-left="orderTypeDropdownLeft"
                :selected-item="orderType"
                :custom-classes="'w-[180px]'"
                @handleSelection="handleOrderTypeFilterChange"
            />
        </Transition>
        <Transition name="fade-bottom">
            <div
                v-if="showOrderDateRange"
                v-click-outside="() => (showOrderDateRange = false)"
                class="absolute z-10 -translate-x-full rounded-lg overflow-hidden shadow-m"
                :style="{
                    left: orderDateDropdownLeft + 'px',
                    top: orderDateDropdownTop + 'px',
                }"
            >
                <DatePicker v-model.range="orderDateRange" borderless />
            </div>
        </Transition>
        <Transition name="fade-bottom">
            <CustomSelectDropdown
                v-if="showOrderStatusOptions"
                v-click-outside="() => (showOrderStatusOptions = false)"
                :items="orderStatusOptionsList"
                :dropdown-top="orderStatusDropdownTop"
                :dropdown-left="orderStatusDropdownLeft"
                :selected-item="orderStatus"
                :custom-classes="'w-[224px]'"
                @handleSelection="handleOrderStatusFilterChange"
            />
        </Transition>
        <Transition name="fade-bottom">
            <RangeFilter
                v-if="showOrderTotalRange"
                v-click-outside="() => (showOrderTotalRange = false)"
                title="Total"
                :range="orderTotal"
                :dropdown-left="orderTotalDropdownLeft"
                :dropdown-top="orderTotalDropdownTop"
                @cancel="showOrderTotalRange = false"
                @apply="handleOrderTotalFilterChange"
            />
        </Transition>
        <Transition name="fade">
            <RangeFilterMobile
                v-if="showOrderTotalRange"
                title="Total"
                :range="orderTotal"
                @cancel="showOrderTotalRange = false"
                @apply="handleOrderTotalFilterChange"
            />
        </Transition>
        <Transition name="fade-bottom">
            <CustomSelectDropdown
                v-if="showPaymentStatusOptions"
                v-click-outside="() => (showPaymentStatusOptions = false)"
                :items="orderPaymentStatusOptionsList"
                :dropdown-top="paymentStatusDropdownTop"
                :dropdown-left="paymentStatusDropdownLeft"
                :selected-item="paymentStatus"
                :custom-classes="'w-[160px]'"
                @handleSelection="handlePaymentStatusFilterChange"
            />
        </Transition>
    </Teleport>
</template>
<script lang="ts">
import SortAscDesc from '~/components/shared/tables/micro/SortAscDesc.vue';
import CustomSelect from '~/components/shared/tables/micro/CustomSelect.vue';
import CustomSelectDropdown from '~/components/shared/tables/micro/CustomSelectDropdown.vue';
import DatePickerButton from '~/components/shared/tables/micro/DatePickerButton.vue';
import FilterButton from '~/components/shared/tables/micro/FilterButton.vue';
import RangeFilter from '~/components/shared/tables/micro/RangeFilter.vue';
import RangeFilterMobile from '~/components/shared/tables/micro/RangeFilterMobile.vue';
import SliderFilter from '~/components/shared/tables/micro/SliderFilter.vue';
import SliderFilterMobile from '~/components/shared/tables/micro/SliderFilterMobile.vue';
import EmojiSadIcon from '@/assets/icons/dashboard/emoji-sad.svg';
import ProfileIcon from '@/assets/icons/dashboard/profile.svg';
import SoleTraderIcon from '@/assets/icons/dashboard/sole-trader.svg';
import AgentIcon from '@/assets/icons/dashboard/agent.svg';
import BusinessIcon from '@/assets/icons/dashboard/business.svg';
import EyeIcon from '@/assets/icons/dashboard/eye.svg';
import { DatePicker } from 'v-calendar';
import { AccountType, getOrderById, getPaymentStatusById, OrderType, PaymentStatusEnum, PaymentTypeEnum } from '~~/types';
import { FilterInterface } from '~/model/dashboard/table/filters';
import { subDays } from 'date-fns';
import CheckBoxAll from '~/components/shared/tables/micro/CheckBoxAll.vue';

interface Section {
    class: string;
    checkbox?: boolean;
    sortChange?: () => void;
    order?: string;
    title: string;
    search?: boolean;
    value?: string;
    placeholder?: string;
    filterChange?: () => void;
    select?: boolean;
    handleShow?: () => void;
    selectedItem?: string;
    optionsVisible?: boolean;
    filterButton?: boolean;
    rangeValue?: number[];
    rangeVisible?: boolean;
    textGrayCondition?: boolean;
    trackingWidestCondition?: boolean;
    customClasses?: string;
    datePicker?: boolean;
    range?: Date[];
    datePickerVisible?: boolean;
    emit: string;
}

export default defineComponent({
    name: 'CustomTable',
    components: {
        SortAscDesc,
        CustomSelect,
        CustomSelectDropdown,
        DatePickerButton,
        FilterButton,
        RangeFilter,
        RangeFilterMobile,
        SliderFilter,
        SliderFilterMobile,
        DatePicker,
        CheckBoxAll,

        // icons
        ProfileIcon,
        SoleTraderIcon,
        AgentIcon,
        BusinessIcon,
        EyeIcon,
        EmojiSadIcon,
    },
    props: [
        'items',
        'error',
        'loading',
        'customItem',
        'filters',
        'fields',
        'actionsMenuType', // functional props (do not change)
        'actionsHeader', // actions header on/off switch
        'nameOrder',
        'accountOrder',
        'companyOrder',
        'registeredOrder',
        'spentOrder',
        'ordersCountOrder',
        'orderIdOrder',
        'orderTypeOrder',
        'orderDateOrder',
        'orderStatusOrder',
        'orderTotalOrder',
        'invoiceIdOrder',
        'orderAmountOrder',
        'txTypeOrder',
        'txDateOrder',
        'txStatusOrder',
        'paymentStatusOrder', // order props (add here new order props)
        'checkAll',
        'name',
        'account',
        'company',
        'registered',
        'spent',
        'ordersCount',
        'orderId',
        'orderType',
        'orderDateRange',
        'orderStatus',
        'orderTotal',
        'paymentStatus', // filter props (add here new filter props)
        'checkBoxColWidth',
        'nameAndProfileColWidth',
        'accountTypeColWidth',
        'companyNameColWidth',
        'registerDateColWidth',
        'spentAmountColWidth',
        'ordersCountColWidth',
        'actionsHeaderColWidth',
        'orderTypeColWidth',
        'orderIdColWidth',
        'orderDateColWidth',
        'orderStatusColWidth',
        'invoiceIdColWidth',
        'orderTotalColWidth',
        'txTypeColWidth',
        'txDateColWidth',
        'txStatusColWidth',
        'paymentStatusColWidth', // column width overwrite props (add here new column width props)
        'nameAndProfileTitle',
        'accountTypeTitle',
        'companyNameTitle',
        'registerDateTitle',
        'spentAmountTitle',
        'ordersCountTitle',
        'orderTypeTitle',
        'orderIdTitle',
        'orderDateTitle',
        'orderStatusTitle',
        'orderTotalTitle',
        'invoiceIdTitle',
        'orderAmountTitle',
        'txTypeTitle',
        'txDateTitle',
        'txStatusTitle',
        'paymentStatusTitle', // column title overwrite props (add here new column title props)
        'nameAndProfileClass',
        'orderTotalInnerClass',
        'ordersCountInnerClass',
        'spentAmountInnerClass', // custom classes for individual components
        'customGeneralHeaderClass', //custom class that applies to all header elements
        'checkBoxHeaderClass',
        'nameAndProfileHeaderClass',
        'accountTypeHeaderClass',
        'companyNameHeaderClass',
        'registerDateHeaderClass',
        'spentAmountHeaderClass',
        'ordersCountHeaderClass',
        'orderIdHeaderClass',
        'orderTypeHeaderClass',
        'orderDateHeaderClass',
        'orderStatusHeaderClass',
        'orderTotalHeaderClass',
        'invoiceIdHeaderClass',
        'orderAmountHeaderClass',
        'txTypeHeaderClass',
        'txDateHeaderClass',
        'txStatusHeaderClass',
        'paymentStatusHeaderClass', // specific header class overwrites
        'checkBoxItemClass',
        'nameAndProfileItemClass',
        'accountTypeItemClass',
        'companyNameItemClass',
        'registerDateItemClass',
        'spentAmountItemClass',
        'ordersCountItemClass',
        'orderIdItemClass',
        'orderTypeItemClass',
        'orderDateItemClass',
        'orderStatusItemClass',
        'orderTotalItemClass',
        'invoiceIdItemClass',
        'orderAmountItemClass',
        'txTypeItemClass',
        'txDateItemClass',
        'txStatusItemClass',
        'paymentStatusItemClass', // specific item class overwrites
        'applyCustomClasses', // on/off switch for custom classes
        'orderStatusKey',
        'profileKey', // keys of different objects within the components
        'showAvatar', // show avatar in name and profile column
    ],
    data() {
        return {
            // filter logic
            activeFilters: [] as FilterInterface[],

            // dynamic column widths
            colsWidths: {
                checkBox: '50px',
                nameAndProfile: '359px',
                accountType: '154px',
                companyName: '254px',
                registerDate: '244px',
                spentAmount: '129px',
                ordersCount: '148px',
                orderId: '212px',
                orderType: '212px',
                orderDate: '256px',
                orderStatus: '256px',
                orderTotal: '232px',
                invoiceId: '191px',
                orderAmount: '191px',
                txType: '191px',
                txDate: '191px',
                txStatus: '191px',
                paymentStatus: '141px',
                actionsHeader: '104px',
            },

            // toggle floating windows on/off
            showAccountOptions: ref(false),
            showRegisteredRange: ref(false),
            showSpentRange: ref(false),
            showOrdersRange: ref(false),
            showOrderTypeOptions: ref(false),
            showOrderDateRange: ref(false),
            showOrderStatusOptions: ref(false),
            showOrderTotalRange: ref(false),
            showPaymentStatusOptions: ref(false),
            showFulfillmentStatusOptions: ref(false),

            // floating windows position
            isScrolling: ref(false),
            scrollTimeout: ref(),
            accountDropdownLeft: ref(0),
            accountDropdownTop: ref(0),
            registeredDropdownLeft: ref(0),
            registeredDropdownTop: ref(0),
            spentRangeDropdownLeft: ref(0),
            spentRangeDropdownTop: ref(0),
            ordersRangeDropdownLeft: ref(0),
            ordersRangeDropdownTop: ref(0),
            orderTypeDropdownLeft: ref(0),
            orderTypeDropdownTop: ref(0),
            orderDateDropdownLeft: ref(0),
            orderDateDropdownTop: ref(0),
            orderStatusDropdownLeft: ref(0),
            orderStatusDropdownTop: ref(0),
            orderTotalDropdownLeft: ref(0),
            orderTotalDropdownTop: ref(0),
            paymentStatusDropdownLeft: ref(0),
            paymentStatusDropdownTop: ref(0),

            registeredDateRange: ref([subDays(new Date(), 30), new Date()]),
            orderDateRange: ref([subDays(new Date(), 30), new Date()]),
            spentValue: 'Filter',
            orderTotalValue: 'Filter',

            // filter options
            accountOptions: ref([
                {
                    label: 'Personal',
                    value: AccountType.Personal,
                    iconType: ProfileIcon,
                },
                {
                    label: 'Sole Trader',
                    value: AccountType.SoleTrader,
                    iconType: SoleTraderIcon,
                },
                {
                    label: 'Agent',
                    value: AccountType.Agent,
                    iconType: AgentIcon,
                },
                {
                    label: 'Business',
                    value: AccountType.Business,
                    iconType: BusinessIcon,
                },
                {
                    label: 'View All',
                    value: '',
                    iconType: EyeIcon,
                },
            ]),
            orderTypeOptions: ref(OrderType),
            orderStatusOptions: ref([
                'Processing',
                'Verification Required',
                'Abandoned Checkout',
                'Delivered',
                'Shipped',
                'Partially Shipped',
                'Refunded',
                'Partially Refunded',
                'Disputed',
                'On Dispute',
                'Canceled',
                'Completed',
                'Pending',
                'Awaiting Payment',
                'Awaiting Fulfillment',
                'Awaiting Shipment',
                'Awaiting Pickup',
                'Payment Received',
                'Payment Declined',
            ]),
            paymentStatusOptions: ref(PaymentTypeEnum),
        };
    },
    computed: {
        // automatic grid columns width assignation as per needed
        colsWidthsCalculated() {
            const widths = [] as string[];
            this.fields.forEach((field: string) => {
                widths.push(this.colsWidths[field as keyof typeof this.colsWidths]);
            });
            widths.push(this.colsWidths.actionsHeader);
            return `grid-cols-[${widths.join(',')}]`;
        },

        // all possible sections predefined
        sections(): object {
            const sections = {
                checkBox: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.checkBoxHeaderClass
                            : 'flex justify-center items-center py-4 bg-[#F2F2F2]',
                    checkbox: true,
                },
                nameAndProfile: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.nameAndProfileHeaderClass
                            : 'p-4 pr-1.5 bg-[#F2F2F2] flex flex-col gap-4',
                    sortChange: this.handleNameOrderChange,
                    order: this.nameOrder,
                    title: this.nameAndProfileTitle || 'Name',
                    search: this.filters,
                    value: this.name,
                    placeholder: 'Search name',
                    filterChange: this.handleNameFilterChange,
                    emit: 'nameFilterChange',
                },
                accountType: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.accountTypeHeaderClass
                            : 'relative p-4 pr-1.5 bg-[#F2F2F2] flex flex-col gap-4',
                    sortChange: this.handleAccountOrderChange,
                    order: this.accountOrder,
                    title: this.accountTypeTitle || 'Account',
                    select: this.filters,
                    handleShow: this.handleShowAccountOptions,
                    selectedItem: this.account,
                    optionsVisible: this.showAccountOptions,
                },
                companyName: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.companyNameHeaderClass
                            : 'p-4 pr-1.5 bg-[#F2F2F2] flex flex-col gap-4',
                    sortChange: this.handleCompanyOrderChange,
                    order: this.companyOrder,
                    title: this.companyNameTitle || 'Company',
                    search: this.filters,
                    value: this.company,
                    placeholder: 'Search company',
                    filterChange: this.handleCompanyFilterChange,
                    emit: 'companyFilterChange',
                },
                registerDate: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.registerDateHeaderClass
                            : 'relative p-4 pr-1.5 bg-[#F2F2F2] flex flex-col gap-4',
                    sortChange: this.handleRegisteredOrderChange,
                    order: this.registeredOrder,
                    title: this.registerDateTitle || 'Registered',
                    datePicker: this.filters,
                    range: this.registered,
                    datePickerVisible: this.showRegisteredRange,
                    handleShow: this.handleShowRegistered,
                },
                spentAmount: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.spentAmountHeaderClass
                            : 'relative p-4 pr-1.5 bg-[#F2F2F2] flex flex-col gap-4',
                    sortChange: this.handleSpentOrderChange,
                    order: this.spentOrder,
                    title: this.spentAmountTitle || 'Spent',
                    filterButton: this.filters,
                    rangeValue: this.spentValue,
                    rangeVisible: this.showSpentRange,
                    textGrayCondition: this.spentValue === 'Filter',
                    trackingWidestCondition: this.spentValue !== 'Filter',
                    handleShow: this.handleShowSpentRange,
                    customClasses: this.spentAmountInnerClass || 'justify-center w-full',
                },
                ordersCount: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.ordersCountHeaderClass
                            : 'relative p-4 pr-1.5 bg-[#F2F2F2] flex flex-col gap-4',
                    sortChange: this.handleOrdersCountOrderChange,
                    order: this.ordersCountOrder,
                    title: this.ordersCountTitle || 'Orders count',
                    filterButton: this.filters,
                    rangeValue: this.ordersCount,
                    rangeVisible: this.showOrdersRange,
                    textGrayCondition: !this.ordersCount,
                    trackingWidestCondition: false,
                    handleShow: this.handleShowOrdersRange,
                    customClasses: this.ordersCountInnerClass || 'justify-center w-full',
                },
                orderId: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.orderIdHeaderClass
                            : 'p-4 bg-[#F2F2F2] flex flex-col gap-4',
                    title: this.orderIdTitle || 'Order #ID',
                    order: this.orderIdOrder,
                    sortChange: this.handleOrderIdOrderChange,
                    search: this.filters,
                    value: this.orderId,
                    placeholder: 'Search #ID',
                    filterChange: this.handleOrderIdFilterChange,
                    emit: 'orderIdFilterChange',
                },
                orderType: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.orderTypeHeaderClass
                            : 'relative p-4 bg-[#F2F2F2] flex flex-col gap-4',
                    title: this.orderTypeTitle || 'Order Type',
                    select: this.filters,
                    order: this.orderTypeOrder,
                    handleShow: this.handleShowOrderTypeOptions,
                    selectedItem: this.orderType,
                    optionsVisible: this.showOrderTypeOptions,
                    sortChange: this.handleOrderTypeOrderChange,
                },
                orderDate: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.orderDateHeaderClass
                            : 'relative p-4 bg-[#F2F2F2] flex flex-col gap-4',
                    title: this.orderDateTitle || 'Order Date',
                    datePicker: this.filters,
                    range: this.orderDateRange,
                    order: this.orderDateOrder,
                    datePickerVisible: this.showOrderDateRange,
                    handleShow: this.handleShowOrderDateRange,
                    sortChange: this.handleOrderDateOrderChange,
                },
                orderStatus: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.orderStatusHeaderClass
                            : 'relative p-4 bg-[#F2F2F2] flex flex-col gap-4',
                    title: this.orderStatusTitle || 'Order Status',
                    select: this.filters,
                    order: this.orderStatusOrder,
                    handleShow: this.handleShowOrderStatusOptions,
                    selectedItem: this.orderStatus,
                    optionsVisible: this.showOrderStatusOptions,
                    sortChange: this.handleOrderStatusOrderChange,
                },
                orderTotal: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.orderTotalHeaderClass
                            : 'relative p-4 bg-[#F2F2F2] flex flex-col gap-4',
                    title: this.orderTotalTitle || 'Total',
                    order: this.orderTotalOrder,
                    sortChange: this.handleOrderTotalOrderChange,
                    filterButton: this.filters,
                    rangeValue: this.orderTotalValue,
                    rangeVisible: this.showOrderTotalRange,
                    textGrayCondition: this.orderTotalValue === 'Filter',
                    trackingWidestCondition: this.orderTotalValue[0] !== 'Filter',
                    handleShow: this.handleShowOrderTotalRange,
                    customClasses: this.orderTotalInnerClass || 'justify-center gap-2 w-[120px]',
                },
                invoiceId: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.invoiceIdHeaderClass
                            : 'px-2 py-4 bg-[#F2F2F2]',
                    title: this.invoiceIdTitle || 'Invoice #ID',
                    order: this.invoiceIdOrder,
                    sortChange: this.handleInvoiceIdOrderChange,
                },
                orderAmount: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.orderAmountHeaderClass
                            : 'px-2 py-4 bg-[#F2F2F2]',
                    title: this.orderAmountTitle || 'Amount',
                    order: this.orderAmountOrder,
                    sortChange: this.handleOrderAmountOrderChange,
                },
                txType: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.txTypeHeaderClass
                            : 'px-2 py-4 bg-[#F2F2F2]',
                    title: this.txTypeTitle || 'Type',
                    order: this.txTypeOrder,
                    sortChange: this.handleTxTypeOrderChange,
                },
                txDate: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.txDateHeaderClass
                            : 'px-2 py-4 bg-[#F2F2F2]',
                    title: this.txDateTitle || 'Date',
                    order: this.txDateOrder,
                    sortChange: this.handleTxDateOrderChange,
                },
                txStatus: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.txStatusHeaderClass
                            : 'px-2 py-4 bg-[#F2F2F2]',
                    title: this.txStatusTitle || 'Status',
                    order: this.txStatusOrder,
                    sortChange: this.handleTxStatusOrderChange,
                },
                paymentStatus: {
                    class:
                        this.customGeneralHeaderClass || this.applyCustomClasses
                            ? this.customGeneralHeaderClass + ' ' + this.paymentStatusHeaderClass
                            : 'relative p-4 bg-[#F2F2F2] flex flex-col gap-4',
                    title: this.paymentStatusTitle || 'Payment',
                    order: this.paymentStatusOrder,
                    sortChange: this.handlePaymentStatusOrderChange,
                    select: this.filters,
                    handleShow: this.handleShowPaymentStatusOptions,
                    selectedItem: this.paymentStatus,
                    optionsVisible: this.showPaymentStatusOptions,
                },
            };
            return sections;
        },

        // all active sections ordered as per needed
        activeSections(): Section[] {
            const orderedSection: Section[] = [];
            this.fields.forEach((field: string) => {
                if (field in this.sections) {
                    orderedSection.push(this.sections[field as keyof typeof this.sections]);
                }
            });
            orderedSection[0].class = orderedSection[0].class + ' rounded-l-lg';
            return orderedSection;
        },

        // misc
        orderStatusOptionsList() {
            return this.orderStatusOptions.map((option) => {
                return {
                    label: option,
                };
            });
        },
        orderTypeOptionsList() {
            return Object.values(OrderType)
                .filter((v) => !isNaN(Number(v)))
                .map((type) => {
                    return {
                        label: getOrderById(type),
                        key: type,
                    };
                });
        },
        orderPaymentStatusOptionsList() {
            return Object.values(PaymentStatusEnum)
                .filter((v) => !isNaN(Number(v)))
                .map((type) => {
                    return {
                        label: getPaymentStatusById(type),
                        key: type,
                    };
                });
        },
    },
    watch: {
        // watch for registered date range changes
        registeredDateRange() {
            this.handleDateFilterChange();
        },
        orderDateRange() {
            this.handleOrderDateFilterChange();
        },
    },
    created() {
        this.overwriteColWidths();
    },
    methods: {
        // dynamic column widths assignation for manual overwrite
        overwriteColWidths() {
            if (this.checkBoxColWidth) this.colsWidths.checkBox = this.checkBoxColWidth;
            if (this.nameAndProfileColWidth) this.colsWidths.nameAndProfile = this.nameAndProfileColWidth;
            if (this.accountTypeColWidth) this.colsWidths.accountType = this.accountTypeColWidth;
            if (this.companyNameColWidth) this.colsWidths.companyName = this.companyNameColWidth;
            if (this.registerDateColWidth) this.colsWidths.registerDate = this.registerDateColWidth;
            if (this.spentAmountColWidth) this.colsWidths.spentAmount = this.spentAmountColWidth;
            if (this.ordersCountColWidth) this.colsWidths.ordersCount = this.ordersCountColWidth;
            if (this.orderIdColWidth) this.colsWidths.orderId = this.orderIdColWidth;
            if (this.orderTypeColWidth) this.colsWidths.orderType = this.orderTypeColWidth;
            if (this.orderDateColWidth) this.colsWidths.orderDate = this.orderDateColWidth;
            if (this.orderStatusColWidth) this.colsWidths.orderStatus = this.orderStatusColWidth;
            if (this.orderTotalColWidth) this.colsWidths.orderTotal = this.orderTotalColWidth;
            if (this.invoiceIdColWidth) this.colsWidths.invoiceId = this.invoiceIdColWidth;
            if (this.orderAmountColWidth) this.colsWidths.orderAmount = this.orderAmountColWidth;
            if (this.txTypeColWidth) this.colsWidths.txType = this.txTypeColWidth;
            if (this.txDateColWidth) this.colsWidths.txDate = this.txDateColWidth;
            if (this.txStatusColWidth) this.colsWidths.txStatus = this.txStatusColWidth;
            if (this.paymentStatusColWidth) this.colsWidths.paymentStatus = this.paymentStatusColWidth;
            if (this.actionsHeaderColWidth) this.colsWidths.actionsHeader = this.actionsHeaderColWidth;

            switch (this.actionsMenuType) {
                case 'customer-orders':
                    this.colsWidths.actionsHeader = '224px';
                    break;
                case 'tx-history':
                    this.colsWidths.orderId = '191px';
                    this.colsWidths.actionsHeader = 'minmax(196px,1fr)';
                    break;
                case 'orders-list':
                    this.colsWidths.actionsHeader = '85px';
                    break;
                default:
                    break;
            }
        },

        // floating window behaviour methods
        handleScroll() {
            this.showAccountOptions = false;
            this.showRegisteredRange = false;
            this.showSpentRange = false;
            this.showOrdersRange = false;
            this.showOrderTypeOptions = false;
            this.showOrderDateRange = false;
            this.showOrderStatusOptions = false;
            this.showOrderTotalRange = false;
            this.showPaymentStatusOptions = false;
            this.isScrolling = true;
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                this.isScrolling = false;
            }, 66);
        },
        handleShowAccountOptions(event: MouseEvent) {
            this.showAccountOptions = !this.showAccountOptions;
            const target = event.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            this.accountDropdownLeft = rect.right;
            this.accountDropdownTop = rect.bottom + window.scrollY + 8;
        },
        handleShowRegistered(event: MouseEvent) {
            this.showRegisteredRange = !this.showRegisteredRange;
            const target = event.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            this.registeredDropdownLeft = rect.right;
            this.registeredDropdownTop = rect.bottom + window.scrollY + 8;
        },
        handleShowSpentRange(event: MouseEvent) {
            this.showSpentRange = !this.showSpentRange;
            const target = event.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            this.spentRangeDropdownLeft = rect.right;
            this.spentRangeDropdownTop = rect.bottom + window.scrollY + 8;
        },
        handleShowOrdersRange(event: MouseEvent) {
            this.showOrdersRange = !this.showOrdersRange;
            const target = event.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            this.ordersRangeDropdownLeft = rect.right;
            this.ordersRangeDropdownTop = rect.bottom + window.scrollY + 8;
        },
        handleShowOrderTypeOptions(event: MouseEvent) {
            this.showOrderTypeOptions = !this.showOrderTypeOptions;
            const target = event.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            this.orderTypeDropdownLeft = rect.right;
            this.orderTypeDropdownTop = rect.bottom + window.scrollY + 8;
        },
        handleShowOrderDateRange(event: MouseEvent) {
            this.showOrderDateRange = !this.showOrderDateRange;
            const target = event.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            this.orderDateDropdownLeft = rect.right;
            this.orderDateDropdownTop = rect.bottom + window.scrollY + 8;
        },
        handleShowOrderStatusOptions(event: MouseEvent) {
            this.showOrderStatusOptions = !this.showOrderStatusOptions;
            const target = event.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            this.orderStatusDropdownLeft = rect.right;
            this.orderStatusDropdownTop = rect.bottom + window.scrollY + 8;
        },
        handleShowOrderTotalRange(event: MouseEvent) {
            this.showOrderTotalRange = !this.showOrderTotalRange;
            const target = event.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            this.orderTotalDropdownLeft = rect.right;
            this.orderTotalDropdownTop = rect.bottom + window.scrollY + 8;
        },
        handleShowPaymentStatusOptions(event: MouseEvent) {
            this.showPaymentStatusOptions = !this.showPaymentStatusOptions;
            const target = event.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            this.paymentStatusDropdownLeft = rect.right;
            this.paymentStatusDropdownTop = rect.bottom + window.scrollY + 8;
        },

        // datepicker methods
        formattedDate(date: Date) {
            return new Date(date).toLocaleDateString('en-GB');
        },

        // sort methods
        handleNameOrderChange() {
            this.$emit('nameOrderChange', this.nameOrder);
        },
        handleAccountOrderChange() {
            this.$emit('accountOrderChange', this.accountOrder);
        },
        handleCompanyOrderChange() {
            this.$emit('companyOrderChange', this.companyOrder);
        },
        handleRegisteredOrderChange() {
            this.$emit('registeredOrderChange', this.registeredOrder);
        },
        handleSpentOrderChange() {
            this.$emit('spentOrderChange', this.spentOrder);
        },
        handleOrdersCountOrderChange() {
            this.$emit('ordersCountOrderChange', this.ordersCountOrder);
        },
        handleOrderIdOrderChange() {
            this.$emit('orderIdOrderChange', this.orderIdOrder);
        },
        handleOrderTypeOrderChange() {
            this.$emit('orderTypeOrderChange', this.orderTypeOrder);
        },
        handleOrderDateOrderChange() {
            this.$emit('orderDateOrderChange', this.orderDateOrder);
        },
        handleOrderStatusOrderChange() {
            this.$emit('orderStatusOrderChange', this.orderStatusOrder);
        },
        handleOrderTotalOrderChange() {
            this.$emit('orderTotalOrderChange', this.orderTotalOrder);
        },
        handleInvoiceIdOrderChange() {
            this.$emit('invoiceIdOrderChange', this.invoiceIdOrder);
        },
        handleOrderAmountOrderChange() {
            this.$emit('orderAmountOrderChange', this.orderAmountOrder);
        },
        handleTxTypeOrderChange() {
            this.$emit('txTypeOrderChange', this.txTypeOrder);
        },
        handleTxDateOrderChange() {
            this.$emit('txDateOrderChange', this.txDateOrder);
        },
        handleTxStatusOrderChange() {
            this.$emit('txStatusOrderChange', this.txStatusOrder);
        },
        handlePaymentStatusOrderChange() {
            this.$emit('paymentStatusOrderChange', this.paymentStatusOrder);
        },

        // filter methods
        handleNameFilterChange(event: InputEvent) {
            this.$emit('nameFilterChange', event);
        },
        handleAccountFilterChange(event: MouseEvent, item: any) {
            this.showAccountOptions = false;
            this.$emit('accountFilterChange', event, item);
        },
        handleCompanyFilterChange(event: InputEvent) {
            this.$emit('companyFilterChange', event);
        },
        handleDateFilterChange() {
            this.showRegisteredRange = false;
            this.$emit('dateFilterChange', this.registeredDateRange);
        },
        handleSpentFilterChange(buffer: number[]) {
            this.showSpentRange = false;
            this.$emit('spentFilterChange', buffer);
            this.calculateSpentValue(buffer);
        },
        handleOrdersFilterChange(buffer: number) {
            this.showOrdersRange = false;
            this.$emit('ordersFilterChange', buffer);
        },
        handleOrderIdFilterChange(event: InputEvent) {
            this.$emit('orderIdFilterChange', event);
        },
        handleOrderTypeFilterChange(event: MouseEvent, item: any) {
            this.showOrderTypeOptions = false;
            this.$emit('orderTypeFilterChange', event, item);
        },
        handleOrderDateFilterChange() {
            this.showOrderDateRange = false;
            this.$emit('orderDateFilterChange', this.orderDateRange);
        },
        handleOrderStatusFilterChange(event: MouseEvent, item: any) {
            this.showOrderStatusOptions = false;
            this.$emit('orderStatusFilterChange', event, item);
        },
        handleOrderTotalFilterChange(buffer: number[]) {
            this.showOrderTotalRange = false;
            this.$emit('orderTotalFilterChange', buffer);
            this.calculateOrderTotalValue(buffer);
        },
        handlePaymentStatusFilterChange(event: MouseEvent, item: any) {
            this.showPaymentStatusOptions = false;
            this.$emit('paymentStatusFilterChange', event, item);
        },

        // filter button text formatters
        calculateSpentValue(buffer: number[]) {
            const spentValue: string = buffer
                .map((value: number) => {
                    if (value >= 1000) {
                        return `${Math.round(value / 1000)}K`;
                    }
                    return Math.round(value);
                })
                .join(' - ');
            const result = buffer[0] || buffer[1] ? spentValue : 'Filter';
            this.spentValue = result;
        },
        calculateOrderTotalValue(buffer: number[]) {
            const orderTotalValue: string = buffer
                .map((value: number) => {
                    if (value >= 1000) {
                        return `${Math.round(value / 1000)}K`;
                    }
                    return Math.round(value);
                })
                .join(' - ');
            const result = buffer[0] || buffer[1] ? orderTotalValue : 'Filter';
            this.orderTotalValue = result;
        },

        // clear SearchBar input
        clearSearch(section: Section) {
            section.value = '';
            this.$emit(section.emit, '');
        },
    },
});
</script>