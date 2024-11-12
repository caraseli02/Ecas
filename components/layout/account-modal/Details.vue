<template>
    <div class="flex gap-3 w-full px-2">
        <img
            loading="lazy"
            src="https://picsum.photos/56/56"
            class="aspect-square object-contain object-center w-14 overflow-hidden shrink-0 max-w-full my-auto rounded-[50%]"
            alt="_"
        />
        <div class="justify-center items-stretch self-stretch flex grow basis-[0%] flex-col">
            <div class="items-stretch flex justify-start gap-3 pr-5 relative">
                <div class="text-neutral-700 text-sm font-medium leading-5 whitespace-nowrap">
                    {{ fullname || 'Loading...' }}
                </div>
                <Tooltip theme="black" position="top">
                    <component :is="getIconBadgeByAccountType()" class="w-5 h-5 hover:text-blue-500" />
                    <template #content>
                        <span class="text-sm">{{
                            getUserDetails.accountType ? AccountType[getUserDetails.accountType] : AccountRole[getUserDetails.role]
                        }}</span>
                    </template>
                </Tooltip>
            </div>
            <div class="text-slate-500 text-xs leading-4 whitespace-nowrap mt-1">
                {{ getUserDetails?.contactDetails.email || 'Loading...' }}
            </div>
            <div class="items-center flex gap-2 mt-1 pr-20">
                <div class="text-stone-500 text-xs font-medium leading-5 self-stretch whitespace-nowrap">Client code:</div>
                <div class="text-stone-500 text-xs font-medium leading-5">
                    {{ getUserDetails?.clientCode || 'N/A' }}
                </div>
                <CopyClipboard
                    :text="getUserDetails?._id as string"
                    class="aspect-square object-contain object-center w-4 h-4 overflow-hidden shrink-0 max-w-full my-auto text-[#9A9A9A]"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BuildingIcon from '@/assets/icons/menu/busines-buildings.svg';
import UserIcon from '@/assets/icons/menu/user.svg';
import PersonalCardIcon from '@/assets/icons/menu/personalcard.svg';
import briefcaseIcon from '@/assets/icons/menu/briefcase.svg';
import { useAuthStore } from '~/store/authStore';
import { storeToRefs } from 'pinia';
import { AccountRole, AccountType } from '~/types';

const authStore = useAuthStore();

const { getUserDetails } = storeToRefs(authStore);
const accountTypeIcon = ref('');

onMounted(() => {
    if (!getUserDetails.value) return;

    if (getUserDetails.value.role === AccountRole.Client && getUserDetails.value.accountType === AccountType.Business) {
        accountTypeIcon.value = BuildingIcon;
    } else if (
        getUserDetails.value.role === AccountRole.Client &&
        (getUserDetails.value.accountType === AccountType.SoleTrader || getUserDetails.value.accountType === AccountType.Agent)
    ) {
        accountTypeIcon.value = briefcaseIcon;
    }

    if (getUserDetails.value.role !== AccountRole.Client) {
        accountTypeIcon.value = PersonalCardIcon;
    }
});

const getIconBadgeByAccountType = () => {
    switch (getUserDetails.value?.accountType) {
        case AccountType.Personal:
            return PersonalCardIcon;
        case AccountType.Business:
            return BuildingIcon;
        case AccountType.SoleTrader:
        case AccountType.Agent:
            return briefcaseIcon;
        default:
            return UserIcon;
    }
};

const IconTypes = [PersonalCardIcon, UserIcon, BuildingIcon, briefcaseIcon];

const fullname = computed(() => {
    if (getUserDetails.value?.role === AccountRole.Client && getUserDetails.value?.accountType === AccountType.Personal) {
        accountTypeIcon.value = UserIcon;
        return `${getUserDetails.value?.personalDetails?.firstName} ${getUserDetails.value?.personalDetails?.lastName}`;
    } else {
        return `${getUserDetails.value?.contactDetails?.firstName} ${getUserDetails.value?.contactDetails?.lastName}`;
    }
});
</script>

<style scoped></style>
