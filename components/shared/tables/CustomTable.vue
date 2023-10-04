<template>
    <div class="mb-6 min-h-[350px] md:mb-8">
        <div class="dashboardTable grid grid-cols-1 gap-1 rounded-t-lg overflow-x-auto scrollbar-thin"
            @scroll="handleScroll">
            <div class="grid items-center rounded-t-lg" :class="colsWidthsCalculated">
                <div v-for="(section, index) in activeSections" :key="index" :class="section.class">
                    <SortAscDesc @sortChange="section.sortChange" :order="section.order" :title="section.title" />
                    <DashboardSearch v-if="section.search" v-model="section.value" :placeholder="section.placeholder"
                        size="sm" class="w-full" @input="section.filterChange" />
                    <CustomSelect v-if="section.select" @handleShow="section.handleShow"
                        :selectedItem="section.selectedItem" :optionsVisible="section.optionsVisible" />
                    <DatePickerButton v-if="section.datePicker" :range="section.range"
                        :datePickerVisible="section.datePickerVisible" @showDatePicker="section.handleShow" />
                    <FilterButton v-if="section.filterButton" :rangeValue="section.rangeValue"
                        :rangeVisible="section.rangeVisible" :textGrayCondition="section.textGrayCondition"
                        :trackingWidestCondition="section.trackingWidestCondition" @showSpentRange="section.handleShow"
                        :customClasses="section.customClasses" />
                </div>
                <div v-if="actionsHeader" :class="filters ? 'p-4' : 'px-4 pt-4'"
                    class="pr-1.5 w-full rounded-r-lg bg-[#F2F2F2] self-stretch">
                    <div class="relative">
                        <div class="flex items-center mb-4">
                            <span class="text-sm leading-[1.43] font-medium"> Actions </span>
                        </div>
                    </div>
                </div>
            </div>
            <component :is="customItem" v-for="(item, index) in items" :key="index" :item="item" :index="index"
                :is-scrolling="isScrolling" :loading="loading" />
        </div>
    </div>
    <Teleport to="body">
        <Transition name="fade-bottom">
            <CustomSelectDropdown v-if="showAccountOptions" v-click-outside="() => showAccountOptions = false"
                :items="accountOptions" :dropdownTop="accountDropdownTop" :dropdownLeft="accountDropdownLeft"
                :selectedItem="account" @handleSelection="handleAccountFilterChange" :customClasses="'w-[163px]'" />
        </Transition>
        <Transition name="fade-bottom">
            <div v-if="showRegisteredRange" v-click-outside="() => (showRegisteredRange = false)"
                class="absolute z-10 -translate-x-full rounded-lg overflow-hidden shadow-m" :style="{
                    left: registeredDropdownLeft + 'px',
                    top: registeredDropdownTop + 'px',
                }">
                <DatePicker v-model.range="registeredDateRange" borderless />
            </div>
        </Transition>
        <Transition name="fade-bottom">
            <RangeFilter v-if="showSpentRange" v-click-outside="() => (showSpentRange = false)" title="Spent" :range="spent"
                :dropdownLeft="spentRangeDropdownLeft" :dropdownTop="spentRangeDropdownTop" @cancel="showSpentRange = false"
                @apply="handleSpentFilterChange" />
        </Transition>
        <Transition name="fade-bottom">
            <SliderFilter v-if="showOrdersRange" v-click-outside="() => (showOrdersRange = false)" title="Orders"
                :range="ordersCount" :dropdownLeft="ordersRangeDropdownLeft" :dropdownTop="ordersRangeDropdownTop"
                @cancel="showOrdersRange = false" @apply="handleOrdersFilterChange" />
        </Transition>
        <Transition name="fade">
            <RangeFilterMobile v-if="showSpentRange" title="Spent" :range="spent" @cancel="showSpentRange = false"
                @apply="handleSpentFilterChange" />
        </Transition>
        <Transition name="fade">
            <SliderFilterMobile v-if="showOrdersRange" title="Orders" :range="ordersCount" @cancel="showOrdersRange = false"
                @apply="handleOrdersFilterChange" />
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
import ProfileIcon from '@/assets/icons/dashboard/profile.svg';
import SoleTraderIcon from '@/assets/icons/dashboard/sole-trader.svg';
import AgentIcon from '@/assets/icons/dashboard/agent.svg';
import BusinessIcon from '@/assets/icons/dashboard/business.svg';
import EyeIcon from '@/assets/icons/dashboard/eye.svg';
import { DatePicker } from 'v-calendar';
import { AccountType } from '~~/types';
import { FilterInterface } from '~/model/dashboard/table/filters';
import { subDays } from 'date-fns';

interface Section {
    class: string;
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
}

export default defineComponent({
    name: 'CustomTable',
    props: ['items', 'loading', 'customItem', 'nameAndProfile', 'accountType', 'companyName', 'registerDate', 'spentAmount', 'ordersNumber',
        'actionsHeader', 'nameOrder', 'accountOrder', 'companyOrder', 'registeredOrder', 'spentOrder', 'ordersCountOrder', 'name', 'account',
        'company', 'registered', 'spent', 'ordersCount', 'nameAndProfileColWidth', 'accountTypeColWidth', 'companyNameColWidth', 'registerDateColWidth',
        'spentAmountColWidth', 'ordersNumberColWidth', 'actionsHeaderColWidth', 'filters', 'fields'],
    data() {
        return {
            // filter logic
            activeFilters: [] as FilterInterface[],

            // dynamic column widths
            colsWidths: [] as object[],

            // toggle floating windows on/off
            showAccountOptions: ref(false),
            showRegisteredRange: ref(false),
            showSpentRange: ref(false),
            showOrdersRange: ref(false),

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

            registeredDateRange: ref([subDays(new Date(), 30), new Date()]),
            spentValue: '',

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
        };
    },
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

        // icons
        ProfileIcon,
        SoleTraderIcon,
        AgentIcon,
        BusinessIcon,
        EyeIcon,
    },
    computed: {

        // automatic grid columns width assignation as per needed
        colsWidthsCalculated() {
            const widths: string[] = [];
            this.colsWidths.forEach((item: any) => {
                const key = Object.keys(item)[0];
                widths.push(item[key]);
            });
            return `grid-cols-[${widths.join(',')}]`;
        },

        // all possible sections predefined
        sections(): object {
            const sections = {
                nameAndProfile: {
                    class: "p-4 pr-1.5 bg-[#F2F2F2] rounded-l-lg flex flex-col gap-4",
                    sortChange: this.handleNameOrderChange,
                    order: this.nameOrder,
                    title: "Name",
                    search: this.filters,
                    value: this.name,
                    placeholder: "Search name, email, country, discount",
                    filterChange: this.handleNameFilterChange,
                },
                accountType: {
                    class: "relative p-4 pr-1.5 bg-[#F2F2F2] flex flex-col gap-4",
                    sortChange: this.handleAccountOrderChange,
                    order: this.accountOrder,
                    title: "Account",
                    select: this.filters,
                    handleShow: this.handleShowAccountOptions,
                    selectedItem: this.account,
                    optionsVisible: this.showAccountOptions,

                },
                companyName: {
                    class: "p-4 pr-1.5 bg-[#F2F2F2] flex flex-col gap-4",
                    sortChange: this.handleCompanyOrderChange,
                    order: this.companyOrder,
                    title: "Company",
                    search: this.filters,
                    value: this.company,
                    placeholder: "Search company",
                    filterChange: this.handleCompanyFilterChange,
                },
                registerDate: {
                    class: "relative p-4 pr-1.5 bg-[#F2F2F2] flex flex-col gap-4",
                    sortChange: this.handleRegisteredOrderChange,
                    order: this.registeredOrder,
                    title: "Registered",
                    datePicker: this.filters,
                    range: this.registered,
                    datePickerVisible: this.showRegisteredRange,
                    handleShow: this.handleShowRegistered,
                },
                spentAmount: {
                    class: "relative p-4 pr-1.5 bg-[#F2F2F2] flex flex-col gap-4",
                    sortChange: this.handleSpentOrderChange,
                    order: this.spentOrder,
                    title: "Spent",
                    filterButton: this.filters,
                    rangeValue: this.spentValue,
                    rangeVisible: this.showSpentRange,
                    textGrayCondition: !this.spent[0] && !this.spent[1],
                    trackingWidestCondition: this.spent[0] || this.spent[1],
                    handleShow: this.handleShowSpentRange,
                    customClasses: "justify-between w-full",
                },
                ordersCount: {
                    class: "relative p-4 pr-1.5 bg-[#F2F2F2] flex flex-col gap-4",
                    sortChange: this.handleOrdersCountOrderChange,
                    order: this.ordersCountOrder,
                    title: "Orders count",
                    filterButton: this.filters,
                    rangeValue: this.ordersCount,
                    rangeVisible: this.showOrdersRange,
                    textGrayCondition: !this.ordersCount,
                    trackingWidestCondition: false,
                    handleShow: this.handleShowOrdersRange,
                    customClasses: "justify-between w-full",
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
            return orderedSection;
        },
    },
    watch: {
        // watch for registered date range changes
        registeredDateRange() {
            this.handleDateFilterChange();
        }
    },
    methods: {

        // custom column width construction
        calculateColWidths() {
            if (this.fields.includes('nameAndProfile')) this.colsWidths.push({ nameAndProfile: this.nameAndProfileColWidth || '359px' });
            if (this.fields.includes('accountType')) this.colsWidths.push({ accountType: this.accountTypeColWidth || '154px' });
            if (this.fields.includes('companyName')) this.colsWidths.push({ companyName: this.companyNameColWidth || '254px' });
            if (this.fields.includes('registerDate')) this.colsWidths.push({ registerDate: this.registerDateColWidth || '244px' });
            if (this.fields.includes('spentAmount')) this.colsWidths.push({ spentAmount: this.spentAmountColWidth || '129px' });
            if (this.fields.includes('ordersCount')) this.colsWidths.push({ ordersNumber: this.ordersNumberColWidth || '148px' });
            this.colsWidths.push({ actionsHeader: this.actionsHeaderColWidth || '104px' });
        },

        // floating window behaviour methods
        handleScroll() {
            this.showAccountOptions = false;
            this.showRegisteredRange = false;
            this.showSpentRange = false;
            this.showOrdersRange = false;
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

        // misc methods       
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
    },
    created() {
        this.calculateColWidths();
    },
});
</script>