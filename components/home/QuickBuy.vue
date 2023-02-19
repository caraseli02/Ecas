<template>
  <div
    class="bg-white rounded-md px-[5px] pt-5 pb-[25px] shadow-card md:pb-5 lg:pb-[25px]"
  >
    <div class="flex items-center px-2.5 mb-[13px]">
      <QuickBuyIcon class="w-[30px] h-[30px] mr-2" />
      <h2 class="text-xl font-semibold">Quick Buy</h2>
    </div>
    <p
      class="text-xs text-gray-300 px-2.5 mb-6 md:mb-[15px] lg:mb-6 xl:text-sm xl:mb-[30px]"
    >
      Are you in a hurry? Use the Quick Buy feature!
    </p>
    <div
      class="grid grid-cols-1 gap-2.5 px-2.5 mb-[25px] max-h-[146px] overflow-y-auto scrollbar-thin md:mb-6 md:max-h-[94px] xl:mb-8"
    >
      <div
        v-for="(product, index) in products"
        :key="index"
        class="flex gap-2.5"
      >
        <label class="bg-[#F2F2F2] rounded-md flex-1">
          <input
            v-model="product.code"
            type="text"
            placeholder="Product code"
            class="bg-transparent w-full px-2.5 py-2.5 text-sm leading-normal text-gray-300 placeholder:text-gray-300 focus:outline-none"
          />
        </label>
        <div class="flex bg-[#F5F5F5] rounded-md overflow-hidden">
          <button
            :disabled="product.quantity === 0"
            class="flex items-center justify-center text-gray-300 bg-gray-200 w-[42px] h-[42px] transition-colors duration-300 disabled:text-[#D4D4D4]"
            @click="product.quantity -= 1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 22 22"
              class="w-[22px] h-[22px]"
            >
              <path
                fill="currentColor"
                d="M21.214 11c0 .653-.526 1.178-1.179 1.178H1.964a1.178 1.178 0 1 1 0-2.357h18.071c.653 0 1.179.53 1.179 1.179Z"
              />
            </svg>
          </button>
          <label class="flex">
            <input
              v-model="product.quantity"
              type="number"
              :min="0"
              placeholder="Quantity"
              @input="($event) => handleQuantityInput($event, index)"
              class="bg-transparent w-[58px] px-0.5 py-2.5 text-sm leading-normal text-gray-300 text-center placeholder:text-[12px] focus:outline-none"
            />
          </label>
          <button
            class="flex items-center justify-center bg-gray-200 w-[42px] h-[42px]"
            @click="product.quantity += 1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 22 22"
              class="w-[22px] h-[22px] text-gray-300"
            >
              <g clip-path="url(#clip0_209_83)">
                <path
                  fill="#5E6278"
                  d="M21.214 11c0 .653-.526 1.178-1.179 1.178h-7.857v7.858a1.18 1.18 0 0 1-2.357 0v-7.858H1.964a1.178 1.178 0 1 1 0-2.357H9.82V1.964a1.178 1.178 0 0 1 2.357 0v7.857h7.857c.653 0 1.179.53 1.179 1.179Z"
                />
              </g>
              <defs>
                <clipPath id="clip0_209_83">
                  <path fill="#fff" d="M0 0h22v22H0z" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="flex gap-2.5 px-2.5">
      <button
        class="flex items-center justify-center w-[42px] h-[42px] rounded bg-[#F2F2F2]"
        @click="
          products.push({
            code: '',
            quantity: 0,
          })
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 22 22"
          class="w-5 h-5 text-gray-300"
        >
          <g clip-path="url(#clip0_209_83)">
            <path
              fill="#5E6278"
              d="M21.214 11c0 .653-.526 1.178-1.179 1.178h-7.857v7.858a1.18 1.18 0 0 1-2.357 0v-7.858H1.964a1.178 1.178 0 1 1 0-2.357H9.82V1.964a1.178 1.178 0 0 1 2.357 0v7.857h7.857c.653 0 1.179.53 1.179 1.179Z"
            />
          </g>
          <defs>
            <clipPath id="clip0_209_83">
              <path fill="#fff" d="M0 0h22v22H0z" />
            </clipPath>
          </defs>
        </svg>
      </button>
      <button
        class="flex items-center justify-center flex-1 bg-blue rounded text-white py-2"
      >
        <CartIcon class="w-6 h-6 mr-[5px]" />
        <span class="text-sm font-medium">Add to cart</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuickBuyIcon from "@/assets/icons/quick-buy-2.svg";
import CartIcon from "@/assets/icons/cart.svg";

const products = ref([
  {
    code: "",
    quantity: 0,
  },
  {
    code: "",
    quantity: 0,
  },
]);

const handleQuantityInput = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement;
  target.value = target.value.replace(/\D+/g, "");

  if (parseInt(target.value) < 0 || !target.value) {
    products.value[index].quantity = 0;
  }
};

onMounted(() => {
  if (window.innerWidth < 768) {
    products.value.push({
      code: "",
      quantity: 0,
    });
  }
});
</script>
