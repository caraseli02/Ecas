<template>
    <div class="container flex items-center flex-col gap-8 my-10 min-h-[50vh]" v-if="getOrderClientSecret">
        <template v-if="cartStore.previousCheckoutError">
            <section
                class="w-full bg-light-100 border-[1.5px] border-red-500 rounded-lg p-6 flex flex-col justify-center items-center gap-4"
            >
                <h4 class="text-2xl font-medium">Payment failed</h4>
                <AlertTriangleIcon class="text-red-500 w-10 h-10 stroke-2" />
                <p>Reason: {{ getPreviousCheckoutError?.message || 'Something went wrong' }}</p>
            </section>
            <div class="flex gap-4">
                <UiButton
                    class="w-fit"
                    variant="secondary"
                    @click="
                        cancelOrder();
                        router.push({ path: `/dashboard/client` });
                    "
                >
                    <span class="text-sm leading-[1.42857] font-medium"> Cancel order </span>
                </UiButton>
                <UiButton @click="cartStore.previousCheckoutError = null" class="w-fit">
                    <span class="text-sm leading-[1.42857] font-medium"> Try Again </span>
                </UiButton>
            </div>
        </template>
        <PaymentSessionCardForm v-else />
    </div>
    <div v-else>No data available</div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cartStore';
import { storeToRefs } from 'pinia';
import { AlertTriangleIcon } from 'lucide-vue-next';

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

    cartStore.emptyOrderClientSecret();
    cartStore.emptyPreviousCheckoutError();

    return;
};

onBeforeRouteLeave(async (to, from, next) => {
    await cancelOrder();
    next();
});
</script>
