<template>
  <div class="hidden relative z-20 bg-white py-3 md:py-4 xl:py-3" :class="[isScrolled ? '' : 'md:block']">
    <div class="container">
      <div class="relative flex items-center justify-between gap-6 md:gap-[25px] lg:gap-[52px] xl:gap-[162px]">
        <NuxtLink to="/" class="flex flex-shrink-0">
          <Logo class="w-[142px] xl:w-[141px]"/>
        </NuxtLink>
        <LayoutHeaderSearch :show-results="!isScrolled" class="flex-1 xl:max-w-[680px]"/>
        <div class="flex items-center xl:gap-[46px]">
          <button
              class="flex items-center text-left max-md:hidden"
              @click="
                            favoritesCartModal = {
                                show: true,
                                tab: 'shopping-cart',
                            }
                        "
          >
            <div class="flex items-center mr-0.5">
              <CartIcon class="w-6 h-6 text-gray-300 lg:mr-0"/>
              <span
                  class="flex -translate-y-2 -translate-x-2.5 items-center justify-center h-[18px] font-Inter z-10 -top-1 -right-[9px] bg-[#FA4B4B] text-white rounded-[100px] text-xs font-semibold leading-[1.5]"
                  :class="[cartItems < 10 ? 'w-[18px]' : cartItems < 100 ? 'w-6' : 'w-[31px]']"
              >
                                <span> {{ cartItems }} </span>
                            </span>
            </div>
            <div class="flex-col text-gray-300 flex-shrink-0">
              <div class="leading-[1.25] font-medium mb-0.5">37.000,00 RON</div>
              <div class="text-[10px] leading-[1.6]">(ex VAT)</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="slide-from-right">
      <LayoutAccountModal v-if="showAccountModal" @close="showAccountModal = false"/>
    </Transition>
    <div
        class="hidden fixed z-[60] top-0 left-0 w-full h-full bg-[rgba(47,50,65,0.10)] cursor-pointer transition-all duration-300 md:block"
        :class="[
                showAccountModal || favoritesCartModal.show ? 'backdrop-blur-[7.5px]' : 'backdrop-blur-none opacity-0 pointer-events-none',
            ]"
        @click="
                showAccountModal = false;
                favoritesCartModal.show = false;
            "
    />
    <Transition name="slide-from-right">
      <CartModal
          v-if="favoritesCartModal.show" :tab="favoritesCartModal.tab" :data="items"
          @close="favoritesCartModal.show = false"/>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import Logo from '@/assets/media/logo.svg';
import CartIcon from '@/assets/icons/cart.svg';
import CartModal from '@/components/layout/favorites-cart-modal/Index.vue';
import {CartInterface} from '~/model/cart/response/cart.interface';
import Emitter from 'tiny-emitter/instance.js';

const {$api} = useNuxtApp();
const cartItems = ref(0);
const items = ref<CartInterface>({} as CartInterface)
defineProps({
  isScrolled: {
    type: Boolean,
    required: true,
  },
});


const fetchList = async () => {
  const {data} = await $api.cart.fetchCartList();
  items.value = data
  console.log(items.value);
  cartItems.value = data.products.length;
};

Emitter.on('cart-and-notifications', async (login: boolean) => {
  if (login) {
    await fetchList()
  }
})

Emitter.on('remove-cart-and-notifications', async (signout: boolean) => {
  if (signout) {
    cartItems.value = 0
    items.value = {} as CartInterface
  }
})

const showAccountModal = ref(false);

const favoritesCartModal = ref({
  show: false,
  tab: 'favorites' as 'favorites' | 'shopping-cart',
});

Promise.all([fetchList()])
</script>
