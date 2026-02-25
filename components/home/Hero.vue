<template>
    <section class="mb-[30px] md:mb-[50px] xl:mb-14">
        <div class="container">
            <PopoverContainer class="hidden md:block my-3 shadow-s rounded-lg" />
            <div class="grid grid-cols-4">
                <div
                    v-for="(feature, index) in features"
                    :key="index"
                    class="relative flex flex-col items-center px-1 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-full after:w-0.5 after:bg-gray-100 after:rounded-full last:after:hidden lg:flex-row lg:px-2 lg:after:h-[30px] xl:px-2.5 xl:after:h-10"
                >
                    <component
                        :is="feature.icon"
                        class="w-8 h-8 mb-[5px] md:w-10 md:h-10 md:mb-2.5 lg:mb-0 lg:mr-2 xl:w-[50px] xl:h-[50px] xl:mr-2.5"
                    />
                    <div class="flex flex-col items-center text-center font-Inter text-slate-500 leading-[1.2] lg:text-left lg:items-start">
                        <div
                            class="text-xs font-semibold mb-[5px] mt-auto md:mb-1 lg:text-[13px] lg:mb-[5px] xl:text-xl"
                            v-html="feature.title"
                        />
                        <div class="text-[10px] md:text-[11px] lg:text-xs xl:text-base" v-html="feature.description" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import ProductsBoxIcon from '@/assets/icons/home/products-box.svg';
import FastDeliveryIcon from '@/assets/icons/home/delivery-truck.svg';
import CustomDevelopmentIcon from '@/assets/icons/home/custom-development.svg';
import CustomerSupportIcon from '@/assets/icons/home/customer-support.svg';
import PopoverContainer from '@/components/layout/header/main-menu/DektopPopoverContainer.vue';

const features = ref([
    {
        title: 'Over 10,000 products',
        description: 'Available online',
        icon: ProductsBoxIcon,
    },
    {
        title: "Fast <br class='md:hidden' /><span class='hidden md:inline'>and Secure</span> Delivery",
        description: 'Reliable Couriers',
        icon: FastDeliveryIcon,
    },
    {
        title: "<span class='md:hidden'>Custom Development</span><span class='hidden md:inline'>Research and Development</span>",
        description: "<span class='md:hidden'>Quality Growth</span><span class='hidden md:inline'>Software & Hardware</span>",
        icon: CustomDevelopmentIcon,
    },
    {
        title: "<span class='hidden md:inline'>Skilled</span> Customer Support",
        description: "Available <span class='md:hidden'>24/7</span><span class='hidden md:inline'>online & on phone</span>",
        icon: CustomerSupportIcon,
    },
]);
</script>
