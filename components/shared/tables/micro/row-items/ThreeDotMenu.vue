<template>
    <div
        class="absolute z-10 grid grid-cols-1 gap-1 rounded-lg bg-white p-3 w-[195px] shadow-m -translate-x-full"
        :class="[index > 5 ? '-translate-y-[calc(100%+42px)]' : '']"
        :style="{
            top: dropdownTop + 'px',
            left: dropdownLeft + 'px',
        }"
    >
        <button
            v-if="profileButton"
            class="flex items-center w-full text-left px-3 py-2 gap-3 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue-500"
            @click="profileClicked"
        >
            <ProfileIcon class="w-6 h-6 text-current" />
            <span class="text-sm leading-[1.71] font-medium">{{ profileText }}</span>
        </button>
        <button
            v-if="documentButton"
            class="flex items-center w-full text-left px-3 py-2 gap-3 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue-500"
            @click="documentClicked"
        >
            <OrdersIcon class="w-6 h-6 text-current" />
            <span class="text-sm leading-[1.71] font-medium">{{ documentText }}</span>
        </button>
        <button
            v-if="settingsButton"
            class="flex items-center w-full text-left px-3 py-2 gap-3 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue-500"
            @click="settingsClicked"
        >
            <SettingsIcon class="w-6 h-6 text-current" />
            <span class="text-sm leading-[1.71] font-medium">{{ settingsText }}</span>
        </button>
        <button
            v-if="deactivateButton"
            class="flex items-center w-full text-left px-3 py-2 gap-3 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue-500"
            @click="deactivateClicked"
        >
            <DeactivateIcon v-if="profile.active" class="w-6 h-6 text-current" />
            <UserUnlockIcon v-else class="w-6 h-6 text-current" />
            <span class="text-sm leading-[1.71] font-medium"> {{ deactivateText }} </span>
        </button>
        <button
            v-if="invoiceButton"
            class="flex items-center w-full text-left px-3 py-2 gap-3 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue-500"
            @click="invoiceClicked"
        >
            <InvoiceIcon class="w-6 h-6 text-current" />
            <span class="text-sm leading-[1.71] font-medium">{{ invoiceText }}</span>
        </button>
        <button
            v-if="editButton"
            class="flex items-center w-full text-left px-3 py-2 gap-3 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue-500"
            @click="editClicked"
        >
            <EditIcon class="w-6 h-6 text-current" />
            <span class="text-sm leading-[1.71] font-medium">{{ editText }}</span>
        </button>
        <button
            v-if="trashButton"
            class="flex items-center w-full text-left px-3 py-2 gap-3 rounded-lg text-rose-500 transition-colors duration-300 hover:bg-[#F2F2F2]"
            @click="trashClicked"
        >
            <TrashIcon class="w-6 h-6 text-current" />
            <span class="text-sm leading-[1.71] font-medium"> {{ trashText }} </span>
        </button>
    </div>
</template>
<script lang="ts">
import OrdersIcon from '@/assets/icons/dashboard/document.svg';
import ProfileIcon from '@/assets/icons/dashboard/profile.svg';
import SettingsIcon from '@/assets/icons/dashboard/setting.svg';
import DeactivateIcon from '@/assets/icons/dashboard/deactivate.svg';
import UserUnlockIcon from '@/assets/icons/dashboard/user-unlock.svg';
import TrashIcon from '@/assets/icons/dashboard/trash.svg';
import InvoiceIcon from '@/assets/icons/dashboard/invoice.svg';
import EditIcon from '@/assets/icons/dashboard/edit.svg';

export default defineComponent({
    name: 'ThreeDotMenu',
    components: {
        OrdersIcon,
        ProfileIcon,
        SettingsIcon,
        DeactivateIcon,
        UserUnlockIcon,
        TrashIcon,
        InvoiceIcon,
        EditIcon,
    },
    props: [
        'index',
        'dropdownTop',
        'dropdownLeft',
        'profileButton',
        'profile',
        'profileText',
        'documentButton',
        'documentText',
        'settingsButton',
        'settingsText',
        'deactivateButton',
        'deactivateText',
        'trashButton',
        'trashText',
        'invoiceButton',
        'invoiceText',
        'editButton',
        'editText',
        'active',
    ],
    methods: {
        profileClicked() {
            this.$router.push(`/dashboard/customers/${this.profile.firebaseId}`);
            this.$emit('profileClicked');
        },
        documentClicked() {
            this.$emit('documentClicked');
        },
        settingsClicked() {
            this.$router.push(`/dashboard/customers/${this.profile.firebaseId}/control-panel`);
            this.$emit('settingsClicked');
        },
        deactivateClicked() {
            this.$emit('deactivateClicked');
        },
        trashClicked() {
            this.$emit('trashClicked');
        },
        invoiceClicked() {
            this.$emit('invoiceClicked');
        },
        editClicked() {
            this.$emit('editClicked');
        },
    },
});
</script>
