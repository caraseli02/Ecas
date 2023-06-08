<template>
  <div
    class="grid grid-cols-[359px,154px,254px,244px,129px,148px,104px] items-center"
  >
    <div class="px-4 py-3">
      <NuxtLink to="/" class="group/link flex items-center">
        <div
          class="relative flex items-center justify-center rounded-full overflow-hidden w-11 h-11 flex-shrink-0 mr-4 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:border-[3px] after:border-blue after:opacity-0 after:transition-opacity after:duration-300 group-hover/link:after:opacity-100"
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
        <div class="w-[calc(100%-60px)]">
          <div class="flex items-center gap-3 mb-1">
            <div
              class="text-sm leading-[1.43] font-semibold truncate transition-colors duration-300 group-hover/link:text-blue"
            >
              {{ item.name }}
            </div>
            <div class="flex items-center gap-3 cursor-default">
              <Tooltip :position="isFirst ? 'bottom' : 'top'" theme="black">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                >
                  <rect
                    y="2.85742"
                    width="20"
                    height="14.2857"
                    rx="4"
                    fill="white"
                  />
                  <mask
                    id="mask0_801_26126"
                    style="mask-type: luminance"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="2"
                    width="20"
                    height="16"
                  >
                    <path
                      d="M0 4.85742C0 3.75285 0.895431 2.85742 2 2.85742H18C19.1046 2.85742 20 3.75285 20 4.85742V15.1431C20 16.2477 19.1046 17.1431 18 17.1431H2C0.895431 17.1431 0 16.2477 0 15.1431V4.85742Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0_801_26126)">
                    <rect
                      x="9.52344"
                      y="2.85742"
                      width="10.4762"
                      height="14.2857"
                      fill="#E5253D"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 17.1431H6.66667V2.85742H0V17.1431Z"
                      fill="#0A3D9C"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.66797 17.1431H13.3346V2.85742H6.66797V17.1431Z"
                      fill="#FFD955"
                    />
                  </g>
                </svg>
                <template #content>
                  <span>Romania</span>
                </template>
              </Tooltip>
              <Tooltip :position="isFirst ? 'bottom' : 'top'" theme="black">
                <div
                  class="bg-blue px-2 rounded-[25px] text-xs leading-[1.67] font-semibold text-white"
                >
                  10%
                </div>
                <template #content>
                  <span
                    >Customer Discount:
                    <strong class="font-semibold">10%</strong></span
                  >
                </template>
              </Tooltip>
            </div>
          </div>
          <div class="text-xs leading-[1.33] text-gray-300 truncate">
            {{ item.email }}
          </div>
        </div>
      </NuxtLink>
    </div>
    <div class="text-sm leading-[1.43] truncate pl-4 pr-2">
      {{ item.account }}
    </div>
    <div class="text-sm leading-[1.43] truncate px-4">
      {{ item.company }}
    </div>
    <div class="text-sm leading-[1.43] truncate px-4">
      {{ item.registered }}
    </div>
    <div class="text-sm leading-[1.43] font-medium truncate px-4">
      {{ item.spent }}
    </div>
    <div class="flex justify-center px-4">
      <div
        class="text-sm leading-[1.43] font-medium text-[#006D4D] bg-[#00D39540] px-3 py-1 rounded-md"
      >
        {{ item.ordersCount }}
      </div>
    </div>
    <div class="flex items-center justify-end gap-4 px-4">
      <Tooltip :position="isFirst ? 'bottom' : 'top'" theme="black">
        <button
          class="flex text-gray-300 transition-colors duration-300 hover:text-blue"
        >
          <DocumentIcon class="w-7 h-7" />
        </button>
        <template #content>
          <span>View order</span>
        </template>
      </Tooltip>
      <div class="relative">
        <button
          class="flex text-gray-300 transition-colors duration-300 hover:text-blue"
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
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <DashboardDeactivateUserModal
        v-if="showDeactivatingModal"
        :user="item"
        @close="showDeactivatingModal = false"
      />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { DashboardTableItem } from "~/types";
import DocumentIcon from "@/assets/icons/dashboard/document.svg";
import MoreVerticalIcon from "@/assets/icons/dashboard/more-vertical.svg";
import UserIcon from "@/assets/icons/dashboard/user.svg";
import ProfileIcon from "@/assets/icons/dashboard/profile.svg";
import OrdersIcon from "@/assets/icons/dashboard/document.svg";
import SettingsIcon from "@/assets/icons/dashboard/setting.svg";
import DeactivateIcon from "@/assets/icons/dashboard/deactivate.svg";
import TrashIcon from "@/assets/icons/dashboard/trash.svg";

defineProps({
  item: {
    type: Object as PropType<DashboardTableItem>,
    required: true,
  },
  isFirst: {
    type: Boolean,
    default: false,
  },
});

const showOptions = ref(false);
const showDeactivatingModal = ref(false);
</script>
