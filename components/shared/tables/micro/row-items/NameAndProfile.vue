<template>
    <NuxtLink
        v-if="item"
        :to="`/dashboard/customers/${item.firebaseId}`"
        class="group/link flex items-center"
        event=""
        @click.native="showCustomerInformation(item)"
    >
        <div
            v-if="showAvatar"
            class="relative flex items-center justify-center rounded-full overflow-hidden w-11 h-11 flex-shrink-0 mr-4"
            :class="[
                !item.avatar ? 'bg-gray-100' : '',
                loading
                    ? ''
                    : 'after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:border-2 after:border-blue-500 after:opacity-0 after:transition-opacity after:duration-300 group-hover/link:after:opacity-100',
            ]"
        >
            <SkeletonLoader v-if="loading" class="w-full h-full" />
            <template v-else>
                <img v-if="item.avatar" :src="item.avatar" :alt="item.name" class="w-full h-full rounded-full object-cover" />
                <UserIcon v-else class="w-7 h-7 text-gray-500" />
            </template>
        </div>
        <div :class="customClass">
            <SkeletonLoader v-if="loading" class="w-full h-5 mb-2" />
            <div v-else class="flex items-center gap-3 mb-1">
                <div v-if="!showAvatar && showFlag" class="flex items-center gap-3 cursor-default">
                    <Tooltip :position="index === 0 ? 'bottom' : 'top'" theme="black">
                        <component :is="item.flag" />
                        <div class="flex items-center text-sm font-medium leading-[1.75] break-all">
                            <img v-if="item.flag && item.flag.icon" :src="item.flag.icon" :alt="item.flag.label" class="w-8 rounded mr-2" />
                        </div>
                    </Tooltip>
                </div>
                <div class="text-sm leading-[1.43] font-semibold truncate transition-colors duration-300 group-hover/link:text-blue-500">
                    {{ item.name }}
                </div>
                <div class="flex items-center gap-3 cursor-default">
                    <Tooltip :position="index === 0 ? 'bottom' : 'top'" theme="black">
                        <component :is="item.flag" v-if="showFlag && showAvatar" />
                        <div class="flex items-center text-sm font-medium leading-[1.75] break-all">
                            <img v-if="item.flag && item.flag.icon" :src="item.flag.icon" :alt="item.flag.label" class="w-8 rounded mr-2" />
                        </div>
                    </Tooltip>
                    <Tooltip v-if="item.adminSettings?.discount && showDiscount" :position="index === 0 ? 'bottom' : 'top'" theme="black">
                        <div class="border-blue-500 border-[1px] px-2 rounded-[25px] text-xs leading-[1.67] font-semibold text-[#007FFF]">
                            {{ item.adminSettings?.discount.value }} %
                        </div>
                        <template #content>
                            <span
                                >Customer Discount:
                                <strong class="font-semibold">{{ `${item.adminSettings?.discount.value}%` }}</strong></span
                            >
                        </template>
                    </Tooltip>
                    <Tooltip theme="black" :position="index === 0 ? 'bottom' : 'top'">
                        <LockIcon
                            v-if="!item.active && showLock"
                            class="w-4 h-4 text-slate-500 transition-colors duration-300 hover:text-blue-500"
                        />
                        <template #content>
                            <span class="capitalize">Account Locked</span>
                        </template>
                    </Tooltip>
                </div>
            </div>
            <SkeletonLoader v-if="loading" class="w-full h-4" />
            <div v-else class="text-xs leading-[1.33] text-slate-500 truncate">
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
    components: {
        SkeletonLoader,
        UserIcon,
        Tooltip,
        LockIcon,
    },
    props: ['item', 'index', 'loading', 'showAvatar', 'showFlag', 'showDiscount', 'showLock', 'customClass'],
    methods: {
        showCustomerInformation(item: any) {
            this.$emit('showInformation', item);
        },
    },
});
</script>
