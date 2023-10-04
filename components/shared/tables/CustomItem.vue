<template>
    <div class="grid items-center" :class="columnWidths">
        <div v-for="section in activeSections" :class="section.class">
            <NameAndProfile v-if="section.profile" :item="item" :loading="loading" :index="index" :showAvatar="true"
                :showFlag="true" :showDiscount="true" :showLock="true" @showInformation="section.event" />
            <TextBox v-if="section.text" :text="item[section.name]" :loading="loading" :customClass="section.customClass" />
        </div>
        <div class="flex items-center justify-end gap-4 pl-4 pr-1.5">
            <ActionsMenu v-if="actionsMenuType === 'customers-list'" :loading="loading" :index="index" :documentButton="true" :threeDotButton="true"
                @showOptions="handleShowOptions" :txtDocument="'View Orders'" />
        </div>
    </div>
    <Teleport to="body">
        <Transition :name="index > 5 ? 'fade-full-neg' : 'fade-bottom'">
            <ThreeDotMenu v-if="showOptions" v-click-outside="() => (showOptions = false)" :index="index"
                :dropdownTop="optionsDropdownTop" :dropdownLeft="optionsDropdownLeft" :profileButton="true" :profile="item"
                :profileText="'Profile'" :documentButton="true" :documentText="'Orders'" :settingsButton="true"
                :settingsText="'Settings'" :deactivateButton="true" :deactivateText="'Deactivate Account'"
                :trashButton="true" :trashText="'Delete Account'" @profileClicked="showOptions = false"
                @documentClicked="showOptions = false" @settingsClicked="showOptions = false" @deactivateClicked="showDeactivatingModal = true;
                showOptions = false;" @trashClicked="showOptions = false" />
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

interface Section {
    name: string;
    class: string;
    customClass: string;
    profile: boolean;
    text: boolean;
    event: any;
};

export default defineComponent({
    name: 'CustomItem',
    props: ['fields', 'item', 'index', 'loading', 'isScrolling', 'actionsMenuType', 'columnWidths'],
    components: {
        NameAndProfile,
        ActionsMenu,
        ThreeDotMenu,
        TextBox,
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
                nameAndProfile: {
                    profile: true,
                    event: this.showCustomerInformation,
                    class: 'pl-4 pr-1.5 py-3'
                },
                accountType: {
                    name: 'account',
                    text: true,
                    class: 'text-sm leading-[1.43] truncate pl-4 pr-1.5',
                },
                companyName: {
                    name: 'company',
                    text: true,
                    class: 'text-sm leading-[1.43] truncate pl-4 pr-1.5',
                },
                registerDate: {
                    name: 'registered',
                    text: true,
                    class: 'text-sm leading-[1.43] truncate pl-4 pr-1.5',
                },
                spentAmount: {
                    name: 'spent',
                    text: true,
                    class: 'text-sm leading-[1.43] font-medium truncate pl-4 pr-1.5',
                },
                ordersCount: {
                    name: 'ordersCount',
                    text: true,
                    class: 'flex justify-center pl-4 pr-1.5',
                    customClass: 'text-sm leading-[1.43] font-medium text-[#006D4D] bg-[#00D39540] px-3 py-1 rounded-md',
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