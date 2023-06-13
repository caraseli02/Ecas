<template>
  <div class="flex items-center justify-between py-2">
    <NuxtLink to="/" class="group/link flex items-center">
      <div
        class="relative flex items-center justify-center rounded-full overflow-hidden w-11 h-11 flex-shrink-0 mr-3 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:border-[3px] after:border-blue after:opacity-0 after:transition-opacity after:duration-300 group-hover/link:after:opacity-100"
        :class="[!item.avatar ? 'bg-gray-200' : '']"
      >
        <img
          v-if="item.avatar"
          :src="item.avatar"
          :alt="item.name"
          class="w-full h-full rounded-full object-cover"
        />
        <UserIcon v-else class="w-7 h-7 text-gray-100" />
      </div>
      <div class="truncate">
        <div
          class="text-sm leading-[1.43] font-semibold truncate mb-1 transition-colors duration-300 group-hover:text-blue"
        >
          {{ item.name }}
        </div>
        <div class="text-xs leading-[1.67] text-gray-300 truncate">
          {{ item.email }}
        </div>
      </div>
    </NuxtLink>
    <div class="relative">
      <button
        class="flex text-[#9296AA] transition-colors duration-300 hover:text-blue"
        @click="showOptions = !showOptions"
      >
        <MoreVerticalIcon class="w-7 h-7" />
      </button>
      <Transition name="fade">
        <div
          v-if="showOptions"
          v-click-outside="() => (showOptions = false)"
          class="absolute z-10 -bottom-2 right-0 translate-y-full grid grid-cols-1 gap-1 w-full rounded-lg bg-white p-3 min-w-[224px]"
          :style="{
            boxShadow: '0px 0px 6px rgba(51, 51, 51, 0.2)',
          }"
        >
          <button
            class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
            @click="showOptions = false"
          >
            <ProfileIcon class="w-6 h-6 mr-3 text-current" />
            <span class="text-sm leading-[1.71] font-medium">Profile</span>
          </button>
          <button
            class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
            @click="showOptions = false"
          >
            <OrdersIcon class="w-6 h-6 mr-3 text-current" />
            <span class="text-sm leading-[1.71] font-medium">Orders</span>
          </button>
          <button
            class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
            @click="showOptions = false"
          >
            <SettingsIcon class="w-6 h-6 mr-3 text-current" />
            <span class="text-sm leading-[1.71] font-medium">Settings</span>
          </button>
          <button
            class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
            @click="
              showDeactivatingModal = true;
              showOptions = false;
            "
          >
            <DeactivateIcon class="w-6 h-6 mr-3 text-current" />
            <span class="text-sm leading-[1.71] font-medium"
              >Deactivate Account</span
            >
          </button>
          <button
            class="flex items-center w-full text-left px-3 py-2 rounded-lg text-[#FA4B4B] transition-colors duration-300 hover:bg-[#F2F2F2]"
            @click="showOptions = false"
          >
            <TrashIcon class="w-6 h-6 mr-3 text-current" />
            <span class="text-sm leading-[1.71] font-medium"
              >Delete Account</span
            >
          </button>
        </div>
      </Transition>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <DashboardDeactivateUserModal
        v-if="showDeactivatingModal"
        :user="(item as any)"
        @close="showDeactivatingModal = false"
      />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import MoreVerticalIcon from "@/assets/icons/dashboard/more-vertical.svg";
import ProfileIcon from "@/assets/icons/dashboard/profile.svg";
import OrdersIcon from "@/assets/icons/dashboard/document.svg";
import SettingsIcon from "@/assets/icons/dashboard/setting.svg";
import DeactivateIcon from "@/assets/icons/dashboard/deactivate.svg";
import TrashIcon from "@/assets/icons/dashboard/trash.svg";
import UserIcon from "@/assets/icons/dashboard/user.svg";

defineProps({
  item: {
    type: Object as PropType<{
      name: string;
      email: string;
      avatar?: any;
    }>,
    required: true,
  },
});

const showOptions = ref(false);
const showDeactivatingModal = ref(false);
</script>
