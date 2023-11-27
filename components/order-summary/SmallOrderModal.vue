<template>
    <div class="p-4 flex flex-col gap-4 border border-[#D4D4D4] rounded-xl bg-[#FFF] shadow-l">
        <div>
            <span class="text-[#222] text-sm font-semibold leading-6">Small Order Handling Charge</span>
        </div>
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <p class="text-[#222] text-xs font-normal leading-5">We offer free delivery and free handling for all online orders of $40.00 or more excluding VAT.</p>
                <div>   
                    <p class="text-[#222] text-xs font-normal leading-5">Orders under $40.00 are subject to a</p>
                    <p class="italic text-[#222] text-xs font-normal leading-5">Small Order Handling Charge.</p>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <div class="h-[1px] rounded-lg bg-[#EBEBEB] block"></div>
                <div class="flex flex-row justify-between">
                    <span class="text-[#222] text-xs font-normal leading-5">$40.00 or more excl. VAT</span>
                    <span class="text-[#FA4B4B] text-xs font-medium leading-5">FREE</span>
                </div>
                <div class="h-[1px] rounded-lg bg-[#EBEBEB] block"></div>
                <div class="flex flex-row justify-between">
                    <span class="text-[#222] text-xs font-normal leading-5">$20.00 - $39.99 excl. VAT</span>
                    <span class="text-[#222] text-xs font-medium leading-5">$ 5.49</span>
                </div>
                <div class="h-[1px] rounded-lg bg-[#EBEBEB] block"></div>
                <div class="flex flex-row justify-between">
                    <span class="text-[#222] text-xs font-normal leading-5">Up to $20.00 excl. VAT</span>
                    <span class="text-[#222] text-xs font-medium leading-5">$ 7.49</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default defineComponent({
    name: 'SmallOrderModal',
});
</script>