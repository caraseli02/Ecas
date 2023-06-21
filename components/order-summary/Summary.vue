<template>
  <div
    class="border border-border shadow-m pt-[25px] px-2.5 pb-[30px] rounded-md mb-[30px] md:mb-5"
  >
    <div class="flex items-center justify-between mb-[18px]">
      <div class="font-semibold">
        All Items Total
        <span class="text-xs font-normal text-gray-300">(excl VAT)</span>
      </div>
      <div class="text-right font-Inter font-semibold">$ 27.874,69</div>
    </div>
    <div class="flex items-center justify-between mb-0.2">
      <div>Number of items</div>
      <div class="text-right font-Inter">6</div>
    </div>
    <div class="flex items-center justify-between mb-0.2">
      <div>Delivery</div>
      <div class="text-right font-Inter">$ 0.00</div>
    </div>
    <div class="flex items-center justify-between mb-2.5">
      <div class="flex items-center">
        <div class="mr-2">Handling Charge</div>
        <QuestionIcon class="w-4 h-4 text-gray-300" />
      </div>
      <div class="text-right font-Inter">$ 0.00</div>
    </div>
    <div
      class="flex items-center justify-between pb-1.5 border-b border-border mb-2.5"
    >
      <div class="font-semibold">
        VAT
        <span class="text-xs font-normal text-gray-300">(19%)</span>
      </div>
      <div class="text-right font-Inter font-semibold">$ 5296,19</div>
    </div>
    <div
      class="flex items-center justify-between font-semibold text-lg mb-[30px] lg:mb-[70px]"
    >
      <div class="">Total</div>
      <div class="text-right font-Inter">$ 33.170,88</div>
    </div>
    <button
      class="flex items-center justify-center bg-blue text-white rounded px-[15px] py-[9px] text-sm font-medium w-full"
    >
      <LockIcon class="w-6 h-6 mr-2" />
      <span>Pay $33.170,88</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import QuestionIcon from "@/assets/icons/question.svg";
import LockIcon from "@/assets/icons/lock.svg";
</script>
