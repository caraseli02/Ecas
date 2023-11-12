<template>
  <div class="flex items-center justify-between w-full">
    <NuxtLink :to="`/dashboard/customers/${item.firebaseId}`" class="group/link flex items-center w-[calc(100%-40px)]">
      <div
          class="relative flex items-center justify-center rounded-full overflow-hidden w-10 h-10 flex-shrink-0 mr-3"
          :class="[
                    !item.avatar ? 'bg-gray-200' : '',
                    loading
                        ? ''
                        : 'after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:border-2 after:border-blue after:opacity-0 after:transition-opacity after:duration-300 group-hover/link:after:opacity-100',
                ]">
        <SkeletonLoader v-if="loading" type="circle" class="w-full h-full"/>
        <template v-else>
          <img
              v-if="item.avatar" :src="item.avatar" :alt="`${item.name}`"
              class="w-full h-full rounded-full object-cover"/>
          <UserIcon v-else class="w-7 h-7 text-gray-100"/>
        </template>
      </div>
      <div :class="[loading ? 'w-full' : 'truncate']">
        <SkeletonLoader v-if="loading" class="block w-2/3 h-4 mb-2"/>
        <div
            v-else
            class="text-sm leading-[1.43] font-semibold truncate transition-colors duration-300 group-hover/link:text-blue">
          {{ `${item.name}` }}
        </div>
        <SkeletonLoader v-if="loading" class="w-full h-4"/>
        <div v-else class="text-xs leading-[1.67] text-gray-300 truncate">{{ item.email }}</div>
      </div>
      <Tooltip v-if="!item.active" theme="black" :position="'top'" class="self-start ml-3">
        <LockIcon
            class="w-4 h-4 text-gray-300 transition-colors duration-300 hover:text-blue"/>
        <template #content>
          <span class="capitalize">Account Locked</span>
        </template>
      </Tooltip>
    </NuxtLink>
    <div v-if="!loading" class="relative">
      <button
          class="flex text-[#9296AA] transition-colors duration-300 hover:text-blue"
          @click="showOptions = !showOptions">
        <MoreVerticalIcon class="w-6 h-6"/>
      </button>
      <Transition name="fade-full">
        <div
            v-if="showOptions" v-click-outside="() => (showOptions = false)"
            class="absolute z-10 -bottom-2 right-0 translate-y-full grid grid-cols-1 gap-1 w-full rounded-lg bg-white p-3 min-w-[224px] shadow-m">
          <button
              class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
              @click="showOptions = false">
            <ProfileIcon class="w-6 h-6 mr-3 text-current"/>
            <span class="text-sm leading-[1.71] font-medium">Profile</span>
          </button>
          <button
              class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
              @click="showOptions = false">
            <OrdersIcon class="w-6 h-6 mr-3 text-current"/>
            <span class="text-sm leading-[1.71] font-medium">Orders</span>
          </button>
          <button
              class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
              @click="showOptions = false">
            <SettingsIcon class="w-6 h-6 mr-3 text-current"/>
            <span class="text-sm leading-[1.71] font-medium">Settings</span>
          </button>
          <button
              class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
              @click="
                            showDeactivatingModal = true;
                        showOptions = false;
                        ">
            <DeactivateIcon class="w-6 h-6 mr-3 text-current"/>
            <span class="text-sm leading-[1.71] font-medium"> Deactivate Account </span>
          </button>
          <button
              class="flex items-center w-full text-left px-3 py-2 rounded-lg text-[#FA4B4B] transition-colors duration-300 hover:bg-[#F2F2F2]"
              @click="showOptions = false">
            <TrashIcon class="w-6 h-6 mr-3 text-current"/>
            <span class="text-sm leading-[1.71] font-medium">Delete Account</span>
          </button>
        </div>
      </Transition>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <DashboardDeactivateUserModal
          v-if="showDeactivatingModal" :user="item"
          @close="showDeactivatingModal = false"/>
    </Transition>
    <div
        class="fixed z-50 top-0 left-0 w-full h-full bg-[#2F3241]/10 transition-all duration-300 cursor-pointer"
        :class="[showDeactivatingModal ? 'backdrop-blur-[7.5px]' : 'backdrop-blur-0 opacity-0 pointer-events-none']"
        @click="showDeactivatingModal = false"/>
  </Teleport>
</template>

<script setup lang="ts">
import {PropType} from 'vue';
import MoreVerticalIcon from '@/assets/icons/dashboard/more-vertical.svg';
import ProfileIcon from '@/assets/icons/dashboard/profile.svg';
import OrdersIcon from '@/assets/icons/dashboard/document.svg';
import SettingsIcon from '@/assets/icons/dashboard/setting.svg';
import DeactivateIcon from '@/assets/icons/dashboard/deactivate.svg';
import TrashIcon from '@/assets/icons/dashboard/trash.svg';
import UserIcon from '@/assets/icons/dashboard/user.svg';
import {DashboardTableItem} from '~/types';
import LockIcon from '@/assets/icons/dashboard/orders/lock.svg';

const props = defineProps({
  item: {
    type: Object as PropType<DashboardTableItem>,
    required: true,
  },
  type: {
    type: String as PropType<'default' | 'detailed' | 'landing'>,
    required: false,
    default: 'default',
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
});


const showOptions = ref(false);
const showDeactivatingModal = ref(false);
</script>
