<template>
    <div v-if="getPreviousCheckoutError && getOrderClientSecret">
        <p>Payment failed. Reason: {{ getPreviousCheckoutError?.message }}</p>

        <button
            class="flex items-center justify-center w-1/12 text-left px-4 py-2 rounded-md transition-colors duration-300 bg-[#F2F2F2] text-slate-500 hover:text-white hover:bg-blue-500 xl:px-6"
            @click="retry = true"
        >
            <CopyIcon class="w-5 h-5 mr-2 text-current xl:w-6 xl:h-6" />
            <span class="text-sm leading-[1.42857] font-medium"> Retry </span>
        </button>
        <button
            class="flex items-center justify-center w-1/12 text-left px-4 py-2 rounded-md transition-colors duration-300 bg-[#F2F2F2] text-slate-500 hover:text-white hover:bg-blue-500 xl:px-6"
            @click="
                cancelOrder();
                router.push({ path: `/dashboard/client` });
            "
        >
            <CopyIcon class="w-5 h-5 mr-2 text-current xl:w-6 xl:h-6" />
            <span class="text-sm leading-[1.42857] font-medium"> Cancel order </span>
        </button>
        <PaymentSessionCardForm v-if="retry" />
    </div>
    <div v-else>No data available</div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cartStore';
import { storeToRefs } from 'pinia';
import CopyIcon from 'assets/icons/dashboard/copy.svg';

const { $api } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const cartStore = useCartStore();
const { getPreviousCheckoutError, getOrderClientSecret } = storeToRefs(cartStore);

const orderId = ref<string>();
const retry = ref(false);

orderId.value = <string>route.query.id;

const cancelOrder = async () => {
    if (!orderId.value) {
        return;
    }

    await $api.orders.cancelOrder(orderId.value);
    console.log('Order cancelled');

    cartStore.emptyOrderClientSecret();
    cartStore.emptyPreviousCheckoutError();

    return;
};

onBeforeRouteLeave(async (to, from, next) => {
    console.log('Leaving checkout fail page');

    await cancelOrder();
    next();
});
</script>
