<template>
  <div class="flex gap-3 w-full px-2">
    <img loading="lazy" src="https://picsum.photos/56/56"
      class="aspect-square object-contain object-center w-14 overflow-hidden shrink-0 max-w-full my-auto rounded-[50%]" />
    <div class="justify-center items-stretch self-stretch flex grow basis-[0%] flex-col">
      <div class="items-stretch flex justify-start gap-3 pr-5 relative">
        <div class="text-neutral-800 text-sm font-medium leading-5 whitespace-nowrap">
          {{ userDetails?.contactDetails.firstName }} {{ userDetails?.contactDetails.lastName }}
        </div>
        <!-- <Tooltip theme="black" position="top" class="self-start ml-3"> -->
        <component :is="IconTypes[3]" class="w-5 h-5" />
        <!-- <template #content>
            <span class="text-sm">Business</span>
          </template>
        </Tooltip> -->
      </div>
      <div class="text-gray-500 text-xs leading-4 whitespace-nowrap mt-1">
        {{ userDetails?.contactDetails.email }}
      </div>
      <div class="items-center flex gap-2 mt-1 pr-20">
        <div class="text-neutral-400 text-xs font-medium leading-5 self-stretch whitespace-nowrap">
          ID:
        </div>
        <div class="text-neutral-400 text-xs font-medium leading-5">
          {{ userDetails?.contactDetails._id }}
        </div>
        <CopyIcon
          class="aspect-square object-contain object-center w-4 h-4 overflow-hidden shrink-0 max-w-full my-auto text-[#9A9A9A]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BuildingIcon from '@/assets/icons/menu/busines-buildings.svg';
import UserIcon from '@/assets/icons/menu/user.svg';
import PersonalCardIcon from '@/assets/icons/menu/personalcard.svg';
import briefcaseIcon from '@/assets/icons/menu/briefcase.svg';
import CopyIcon from '@/assets/icons/copy.svg';
import { useAuthStore } from '~/store/authStore';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { userDetails } = storeToRefs(authStore);

const IconTypes = [PersonalCardIcon,
  UserIcon,
  BuildingIcon,
  briefcaseIcon,
]

</script>

<style scoped>
</style>
