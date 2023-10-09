<template>
  <NuxtLink :to="`/dashboard/customers/${item.firebaseId}`" class="group/link flex items-center" event=""
    @click.native="showCustomerInformation(item)">
    <div v-if="showAvatar"
      class="relative flex items-center justify-center rounded-full overflow-hidden w-11 h-11 flex-shrink-0 mr-4" :class="[
        !item.avatar ? 'bg-gray-200' : '',
        loading
          ? ''
          : 'after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:border-2 after:border-blue after:opacity-0 after:transition-opacity after:duration-300 group-hover/link:after:opacity-100',
      ]">
      <SkeletonLoader v-if="loading" class="w-full h-full" />
      <template v-else>
        <img v-if="item.avatar" :src="item.avatar" :alt="item.name" class="w-full h-full rounded-full object-cover" />
        <UserIcon v-else class="w-7 h-7 text-gray-100" />
      </template>
    </div>
    <div :class="customClass">
      <SkeletonLoader v-if="loading" class="w-2/3 h-5 mb-2" />
      <div v-else class="flex items-center gap-3 mb-1">
        <div v-if="!showAvatar && showFlag" class="flex items-center gap-3 cursor-default">
          <Tooltip :position="index === 0 ? 'bottom' : 'top'" theme="black">
            <component :is="item.flag" />
            <template #content>
              <span>United States</span>
            </template>
          </Tooltip>
        </div>
        <div
          class="text-sm leading-[1.43] font-semibold truncate transition-colors duration-300 group-hover/link:text-blue">
          {{ item.name }}
        </div>
        <div class="flex items-center gap-3 cursor-default">
          <Tooltip :position="index === 0 ? 'bottom' : 'top'" theme="black">
            <component v-if="showFlag && showAvatar" :is="item.flag" />
            <template #content>
              <span>United States</span>
            </template>
          </Tooltip>
          <Tooltip :position="index === 0 ? 'bottom' : 'top'" theme="black">
            <div v-if="showDiscount"
              class="border-blue border-[1px] px-2 rounded-[25px] text-xs leading-[1.67] font-semibold text-[#007FFF]">
              10%
            </div>
            <template #content>
              <span>Customer Discount: <strong class="font-semibold">10%</strong></span>
            </template>
          </Tooltip>
          <Tooltip theme="black" :position="index === 0 ? 'bottom' : 'top'">
            <LockIcon v-if="item.locked && showLock"
              class="w-4 h-4 text-gray-300 transition-colors duration-300 hover:text-blue" />
            <template #content>
              <span class="capitalize">Account Locked</span>
            </template>
          </Tooltip>
        </div>
      </div>
      <SkeletonLoader v-if="loading" class="w-full h-4" />
      <div v-else class="text-xs leading-[1.33] text-gray-300 truncate">
        {{ item.email }}
      </div>
    </div>
  </NuxtLink>
</template>
<script lang="ts">
import SkeletonLoader from '~/components/global/SkeletonLoader.vue';
import UserIcon from '@/assets/icons/dashboard/user.svg';
import Tooltip from '~/components/global/Tooltip.vue';
import LockIcon from '@/assets/icons/dashboard/orders/lock.svg';

export default defineComponent({
  name: 'NameAndProfile',
  props: ['item', 'index', 'loading', 'showAvatar', 'showFlag', 'showDiscount', 'showLock', 'customClass'],
  components: {
    SkeletonLoader,
    UserIcon,
    Tooltip,
    LockIcon,
  },
  methods: {
    showCustomerInformation(item: any) {
      this.$emit('showInformation', item);
    },
  },
});
</script>