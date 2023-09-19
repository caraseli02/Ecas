<template>
  <div class="bg-white rounded-xl p-4 shadow-xs md:p-6">
    <div class="flex items-center justify-between" :class="[emptyData || error ? 'mb-[169px] md:mb-[161px]' : 'mb-8']">
      <div class="flex items-center justify-between">
        <div class="text-sm font-semibold md:text-xl md:leading-[1.2]">Customer Information</div>
      </div>
      <WarningIcon v-if="error" class="w-6 h-6"/>
      <div v-else class="relative">
        <button class="flex" @click="showOptions = !showOptions">
          <DotsVerticalIcon class="w-6 h-6 text-[#9296AA] transition-colors duration-300 hover:text-blue"/>
        </button>
        <Transition name="fade-full">
          <div
              v-if="showOptions"
              v-click-outside="() => (showOptions = false)"
              class="absolute z-10 -bottom-3.5 right-0 translate-y-full grid grid-cols-1 gap-1 w-full rounded-lg bg-white p-3 min-w-[224px] shadow-m"
          >
            <button
                class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                @click="showOptions = false, $router.push($route.fullPath + '/control-panel')"
            >
              <SettingsIcon class="w-6 h-6 mr-3 text-current"/>
              <span class="text-sm leading-[1.71] font-medium"> Control Panel </span>

            </button>
            <button
                class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                @click="showOptions = false"
            >
              <DeactivateIcon class="w-6 h-6 mr-3 text-current"/>
              <span class="text-sm leading-[1.71] font-medium"> Deactivate Account </span>
            </button>
            <button
                class="flex items-center w-full text-left px-3 py-2 rounded-lg text-[#FA4B4B] transition-colors duration-300 hover:bg-[#F2F2F2]"
                @click="showOptions = false"
            >
              <TrashIcon class="w-6 h-6 mr-3 text-current"/>
              <span class="text-sm leading-[1.71] font-medium"> Delete Account </span>
            </button>
          </div>
        </Transition>
      </div>
    </div>
    <div v-if="emptyData || error" class="flex flex-col items-center justify-center flex-1 mb-[157px] md:mb-[149px]">
      <EmojiSadIcon class="w-[52px] h-[52px] mb-4"/>
      <div class="text-sm font-medium text-gray-100">No data available</div>
    </div>
    <template v-else>
      <div class="flex items-start md:items-center" :class="[isLoading ? 'mb-3' : 'mb-5']">
        <SkeletonLoader v-if="isLoading" type="circle" class="w-16 h-16 mr-4"/>
        <img v-else :src="Avatar" alt="Name" class="w-16 h-16 flex-shrink-0 rounded-full object-cover mr-4"/>
        <div class="md:grid md:grid-cols-[repeat(2,auto)] md:justify-between md:flex-1">
          <SkeletonLoader v-if="isLoading" class="w-[140px] h-5 mb-2"/>
          <div v-else class="font-semibold leading-tight mb-2 md:order-1">
            {{ customerInformation.contactDetails.firstName + ' ' + customerInformation.contactDetails.lastName }}
          </div>
          <SkeletonLoader v-if="isLoading" class="w-[160px] h-5 mb-2 md:w-[180px]"/>
          <div v-else class="flex items-center text-sm mb-2 md:order-3 md:mb-0">
            <span class="text-gray-300 mr-2">Account Type:</span>
            <span class="font-medium">{{
                AccountType[customerInformation.accountType as unknown as keyof typeof AccountType]
              }}</span>
          </div>
          <SkeletonLoader v-if="isLoading" class="w-[180px] h-5 mb-2"/>
          <div
              v-else="customerInformation.accountType === 2 || customerInformation.accountType === 3"
              class="text-sm font-medium text-blue mb-2 md:order-4 md:mb-0"
          >
            {{ customerInformation?.companyDetails?.name }}
          </div>
          <SkeletonLoader v-if="isLoading" class="w-[180px] h-5"/>
          <div v-else class="flex items-center text-sm md:order-2 md:mb-2">
            <span class="text-gray-300 mr-2">Last Active:</span>
            <span class="font-medium">{{ customerInformation.lastActivityDate || '-' }}</span>
          </div>
        </div>
      </div>
      <div>
        <div class="pb-5 border-b border-gray-200 mb-5">
          <SkeletonLoader v-if="isLoading" class="w-full h-[304px] md:h-[232px]"/>
          <template v-else>
            <div class="text-sm font-semibold mb-4">Account Details</div>
            <div class="grid grid-cols-1 gap-2">
              <div class="grid grid-cols-[140px,1fr] gap-3">
                <div class="text-sm text-gray-300 leading-[1.75]">User Name</div>
                <div class="text-sm font-medium leading-[1.75] break-all">
                  {{ customerInformation.contactDetails.email }}
                </div>
              </div>
              <div class="grid grid-cols-[140px,1fr] gap-3">
                <div class="text-sm text-gray-300 leading-[1.75]">Name</div>
                <div class="text-sm font-medium leading-[1.75] break-all">
                  {{ customerInformation.contactDetails.firstName }}
                </div>
              </div>
              <div class="grid grid-cols-[140px,1fr] gap-3">
                <div class="text-sm text-gray-300 leading-[1.75]">Surname</div>
                <div class="text-sm font-medium leading-[1.75] break-all">
                  {{ customerInformation.contactDetails.lastName }}
                </div>
              </div>
              <div class="grid grid-cols-[140px,1fr] gap-3">
                <div class="text-sm text-gray-300 leading-[1.75]">Country</div>
                <div class="flex items-center text-sm font-medium leading-[1.75] break-all">
                  <USAFlag v-if="customerInformation?.personalDetails?.country" class="w-6 h-6 mr-2"/>
                  <span>{{ customerInformation?.personalDetails?.address.country || 'N/A' }} </span>
                </div>
              </div>
              <div class="grid grid-cols-[140px,1fr] gap-3">
                <div class="text-sm text-gray-300 leading-[1.75]">Mobile Number</div>
                <div class="text-sm font-medium leading-[1.75] break-all">
                  {{ customerInformation.contactDetails.phone }}
                </div>
              </div>
              <div class="grid grid-cols-[140px,1fr] gap-3">
                <div class="text-sm text-gray-300 leading-[1.75]">Address</div>
                <div class="text-sm font-medium leading-[1.75] break-all">
                  {{ customerInformation?.personalDetails?.address.name1 || 'N/A' }}
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="flex items-start justify-between gap-5">
          <SkeletonLoader v-if="isLoading" class="w-[120px] h-10 md:w-[160px] md:h-[18px]"/>
          <div v-else class="md:flex md:items-center">
            <div class="flex items-center mb-1 md:mb-0">
              <div class="w-2 h-2 rounded-full bg-[#00D395] mr-2"/>
              <span class="text-sm font-medium leading-tight text-gray-300">Registered</span>
            </div>
            <div class="text-sm font-medium leading-tight pl-4">{{
                getCurrentDate(customerInformation.createdAt)
              }}
            </div>
          </div>
          <SkeletonLoader v-if="isLoading" class="w-[120px] h-10 md:w-[160px] md:h-[18px]"/>
          <div v-else class="md:flex md:items-center">
            <div class="flex items-center mb-1 md:mb-0">
              <div class="w-2 h-2 rounded-full bg-blue mr-2"/>
              <span class="text-sm font-medium leading-tight text-gray-300">Email Marketing</span>
            </div>
            <div class="text-sm font-medium leading-tight pl-4">
              {{
                customerInformation.adminSettings?.marketingPreferences?.emailMarketing?.email ? 'Subscribed'
                    : 'Not Subscribed'
              }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/assets/icons/dashboard/avatar.png';
import DotsVerticalIcon from '@/assets/icons/dots-vertical.svg';
import USAFlag from '@/assets/icons/flags/usa.svg';
import SettingsIcon from '@/assets/icons/dashboard/setting.svg';
import DeactivateIcon from '@/assets/icons/dashboard/deactivate.svg';
import TrashIcon from '@/assets/icons/dashboard/trash.svg';
import EmojiSadIcon from '@/assets/icons/dashboard/emoji-sad.svg';
import WarningIcon from '@/assets/icons/dashboard/warning.svg';
import {useNuxtApp} from '#app';
import {UserDetails} from '~/types/auth/user-details';
import {AccountType} from '~/types';
import moment from 'moment';

const showOptions = ref(false);

const error = ref(false);
const emptyData = ref(false);
const isLoading = ref(false);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const customerInformation = ref<UserDetails>({} as UserDetails);
const {$api} = useNuxtApp();

const fetchInformation = async () => {
  error.value = false;
  isLoading.value = true;

  const response = (await $api.customerProfile.fetchCustomerInformation(props.id || '')) as {
    status: string;
    data: UserDetails;
  };

  if (response.status !== 'success') {
    isLoading.value = false;
    error.value = true;

    return;
  } else {
    isLoading.value = false;
  }

  customerInformation.value = response.data;
};

const getCurrentDate = (date: string) => {
  return moment(date).format('DD MMM YYYY, HH:mm');
};

await fetchInformation();
</script>