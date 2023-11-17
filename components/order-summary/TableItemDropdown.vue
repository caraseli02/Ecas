<template>
    <div class="bg-[#FFF] rounded-b-lg custom-shadow flex flex-col gap-4 py-4">
        <div class="gap-2 flex flex-col xl:flex-row xl:justify-between">
            <div class="flex flex-row px-4 gap-3">
                <div class="border-2 rounded-lg min-w-[60px] w-[60px] h-[60px] overflow-hidden">
                    <img :src="item.productEntity?.details?.ProductImage?.ProductImageSmall"
                        class="object-cover w-full h-full" />
                </div>
                <div class="flex flex-col w-full truncate">
                    <div class="flex flex-row justify-between items-center">
                        <span
                            class="text-[#222] text-xs font-semibold leading-4 truncate xl:hidden max-w-[220px] sm:max-w-[350px] lg:max-w-[180px] xl:max-w-[260px]">{{
                                item.id }}</span>
                        <div class="hidden xl:hidden lg:flex">
                            <div v-if="stockItem && !shortStock" class="flex flex-row">
                                <GreenCheckCircleSmall />
                                <span class="ml-2 text-[#0FAC7E] text-xs font-medium leading-4">{{ item.productEntity?.stock
                                }}
                                    in stock</span>
                            </div>
                            <div v-if="stockItem && shortStock" class="flex flex-row">
                                <OrangeCheckCircleSmall />
                                <span class="ml-2 text-[#FF8A00] text-xs font-medium leading-4">{{ item.productEntity?.stock
                                }}
                                    in stock</span>
                            </div>
                            <div v-if="!stockItem" class="flex flex-row">
                                <WarningError />
                                <span class="ml-2 text-[#FA4B4B] text-xs font-medium leading-4">{{ item.productEntity?.stock
                                }}
                                    in stock</span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="flex flex-col xl:flex-row max-w-[220px] sm:max-w-[350px] lg:max-w-[180px] xl:max-w-[260px] truncate">
                        <span class="text-[#5E6278] text-xs font-normal leading-4">Description:&nbsp;</span>
                        <span class="text-[#222] text-xs font-medium leading-4 truncate">{{
                            item.productEntity?.details?.SummaryData?.PartDescription }}</span>
                    </div>
                    <div
                        class="flex flex-col xl:flex-row max-w-[220px] sm:max-w-[350px] lg:max-w-[180px] xl:max-w-[260px] truncate">
                        <span class="text-[#5E6278] text-xs font-normal leading-4">Manufacturer:&nbsp;</span>
                        <span class="text-[#222] text-xs font-medium leading-4 truncate">{{
                            item.productEntity?.details?.SummaryData?.Manufacturer }}</span>
                    </div>
                    <div class="mt-2 hidden xl:flex">
                        <div v-if="stockItem && !shortStock" class="flex flex-row">
                            <GreenCheckCircleSmall />
                            <span class="ml-2 text-[#0FAC7E] text-xs font-medium leading-4">{{ item.productEntity?.stock }}
                                in stock</span>
                        </div>
                        <div v-if="stockItem && shortStock" class="flex flex-row">
                            <OrangeCheckCircleSmall />
                            <span class="ml-2 text-[#FF8A00] text-xs font-medium leading-4">{{ item.productEntity?.stock }}
                                in stock</span>
                        </div>
                        <div v-if="!stockItem" class="flex flex-row">
                            <WarningError />
                            <span class="ml-2 text-[#FA4B4B] text-xs font-medium leading-4">{{ item.productEntity?.stock }}
                                in stock</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="xl:pl-0 px-4">
                <div class="grid grid-cols-1 xl:grid-flow-col xl:gap-[16px] gap-2">
                    <div class="flex flex-row justify-between xl:gap-4 items-center xl:flex-col">
                        <span
                            class="text-[#222] text-center text-sm font-normal leading-6 xl:gap-4 px-0 xl:px-4 whitespace-nowrap">Unit
                            Price</span>
                        <div v-if="stockItem && item.discount.value" class="flex lg:hidden">
                            <div
                                class="px-2 border-[1px] rounded-[25px] border-[#FA4B4B] bg-white ml-4 flex items-center lg:hidden">
                                <span class="text-xs font-semibold leading-5 text-[#FA4B4B]">{{ item.discount.value }}
                                    %</span>
                            </div>
                        </div>
                        <div v-if="item.discount.value" class="flex flex-col text-center h-[36px] justify-center">
                            <span class="line-through text-[#222] text-sm font-normal leading-5">RON {{
                                item.productEntity?.priceRon }}</span>
                            <span class="text-[#FA4B4B] text-sm font-normal leading-5">RON {{ discountedPrice }}</span>
                        </div>
                        <div v-else class="flex flex-col text-center h-[36px] justify-center">
                            <span class="text-[#222] text-sm font-normal leading-5">RON {{ item.productEntity?.priceRon
                            }}</span>
                        </div>
                    </div>
                    <div class="flex flex-row justify-between items-center xl:flex-col xl:gap-4">
                        <span
                            class="text-[#222] text-center text-sm font-normal leading-6 xl:gap-4 px-0 xl:px-4">Quantity</span>
                        <div>
                            <SharedQuantityCounter :value="item.stock" @update:value="updateQuantityValue" />
                        </div>
                    </div>
                    <div class="flex flex-row justify-between items-center xl:flex-col xl:gap-4">
                        <span class="text-[#222] text-center text-sm font-normal leading-6 xl:gap-4 px-0 xl:px-4">Tax (VAT
                            19%)</span>
                        <div class="flex flex-col text-center h-[36px] justify-center">
                            <span class="text-[#222] text-sm font-normal leading-5">RON {{ taxPrice }}</span>
                        </div>
                    </div>
                    <div class="flex flex-row justify-between items-center xl:flex-col xl:gap-4">
                        <span
                            class="text-[#222] text-center text-sm font-normal leading-6 xl:gap-4 px-0 xl:px-4">Subtotal</span>
                        <div class="flex flex-col text-center h-[36px] justify-center">
                            <span class="text-[#222] text-sm font-normal leading-5">RON {{ subtotal }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-[1px] -mt-2 bg-[#EBEBEB] mx-4 rounded-lg xl:hidden block"></div>
        <div class="relative px-4 flex flex-row justify-between xl:justify-start xl:gap-6">
            <button @click="showPackagingDetails = !showPackagingDetails" class="flex flex-col gap-2 items-center group xl:flex-row">
                <PackageBox class="text-[#5E6278] group-hover:text-[#007FFF] transition duration-150 block xl:hidden"/>
                <PackageBoxSmall class="text-[#5E6278] group-hover:text-[#007FFF] transition duration-150 hidden xl:block"/>
                <span class="text-[#5E6278] text-xs font-normal leading-5 group-hover:text-[#007FFF] transition duration-150">Packaging</span>
            </button>
            <Transition name="fade-bottom">
                <div v-if="showPackagingDetails" v-click-outside="() => (showPackagingDetails = false)" class="absolute border-[1px] p-3 xl:bottom-7 bottom-[76px] z-10 max-w-[216px] min-h-[176px] bg-[#FFF] rounded-xl shadow-l flex flex-col gap-3">
                    <h2 class="text-[#222] text-sm font-medium leading-6">
                        Packaging Details
                    </h2>
                    <p class="text-[#222] text-xs font-normal leading-5">
                        A tube is a rigid extruded plastic package designed to fit the profile of the part and protect the leads. Tubes ship with the exact number of parts ordered and a rubber plug or plastic peg in each end to prevent the parts from sliding out.
                    </p>
                </div>
            </Transition>
            <button @click="showDeliveryDetails = !showDeliveryDetails" class="flex flex-col gap-2 items-center group xl:flex-row">
                <DeliveryTruck class="text-[#5E6278] group-hover:text-[#007FFF] transition duration-150 block xl:hidden"/>
                <DeliveryTruckSmall class="text-[#5E6278] group-hover:text-[#007FFF] transition duration-150 hidden xl:block"/>
                <span class="text-[#5E6278] text-xs font-normal leading-5 group-hover:text-[#007FFF] transition duration-150">Delivery</span>
            </button>
            <Transition name="fade-bottom">
                <div v-if="showDeliveryDetails" v-click-outside="() => (showDeliveryDetails = false)" class="absolute border-[1px] p-3 xl:bottom-7 bottom-[76px] xl:left-12 left-[calc(25%-40px)] z-10 max-w-[240px] min-h-[176px] bg-[#FFF] rounded-xl shadow-l flex flex-col gap-3">
                    <h2 class="text-[#222] text-sm font-medium leading-6">
                        Delivery Details
                    </h2>
                    <p class="text-[#222] text-xs font-normal leading-5">
                        Standard delivery time is min. 30 working days. The date needs confirmation. Contact us for enquiry.
                    </p>
                    <div class="h-[1px] w-full bg-[#EBEBEB] rounded-lg"></div>
                    <div class="flex flex-row gap-2">
                        <span class="text-[#222] text-xs font-normal leading-5">Estimated delivery date</span>
                        <span class="text-[#FA4B4B] text-xs font-medium leading-5">26/5/2024</span>
                    </div>
                </div>
            </Transition>
            <button @click="likeItem" class="relative flex flex-col gap-2 xl:hidden items-center group">
                <HeartSolid v-show="item.liked" class="absolute top-[1px] text-[#007FFF]" />
                <HeartOutline class="w-5 h-5 text-[#5E6278] group-hover:text-[#007FFF] transition duration-150" />
                <span class="text-[#5E6278] text-xs font-normal leading-5 group-hover:text-[#007FFF] transition duration-150">Favourites</span>
            </button>
            <button @click="deleteItem" class="flex flex-col gap-2 xl:hidden items-center group">
                <TrashOutlineBig class="text-[#5E6278] group-hover:text-[#FA4B4B] transition duration-150" />
                <span class="text-[#5E6278] text-xs font-normal leading-5 group-hover:text-[#FA4B4B] transition duration-150">Delete</span>
            </button>
        </div>
    </div>
</template>
<script lang="ts">
import OrangeCheckCircleSmall from '@/assets/icons/orange-check-circle-small.svg';
import GreenCheckCircleSmall from '@/assets/icons/green-check-circle-small.svg';
import WarningError from '@/assets/icons/warning-error.svg';
import PackageBox from '@/assets/icons/package-box.svg';
import PackageBoxSmall from '@/assets/icons/package-box-small.svg';
import DeliveryTruck from '@/assets/icons/delivery-truck.svg';
import DeliveryTruckSmall from '@/assets/icons/delivery-truck-small.svg';
import HeartOutline from '@/assets/icons/heart-outline.svg';
import HeartSolid from '@/assets/icons/heart-solid.svg';
import TrashOutlineBig from '@/assets/icons/trash-outline-big.svg';

export default defineComponent({
    name: 'TableItemDropdown',
    props: ['item', 'shortStock', 'stockItem', 'liked'],
    components: {
        OrangeCheckCircleSmall,
        GreenCheckCircleSmall,
        WarningError,
        PackageBox,
        DeliveryTruck,
        HeartOutline,
        HeartSolid,
        TrashOutlineBig,
        PackageBoxSmall,
        DeliveryTruckSmall,
    },
    data() {
        return {
            showPackagingDetails: false,
            showDeliveryDetails: false,
        };
    },
    computed: {
        discountedPrice() {
            return this.item.productEntity?.priceRon - (this.item.productEntity?.priceRon * this.item.discount.value) / 100;
        },
        taxPrice() {
            if (this.item.discount.value) {
                return parseFloat((this.discountedPrice * this.item.stock * 0.19).toFixed(2)) as number;
            }
            return parseFloat((this.item.productEntity?.priceRon * this.item.stock * 0.19).toFixed(2)) as number;
        },
        subtotal() {
            if (this.item.discount.value) {
                return (this.discountedPrice * this.item.stock + this.taxPrice).toFixed(2);
            }
            return (this.item.productEntity?.priceRon * this.item.stock + this.taxPrice).toFixed(2);
        },
    },
    methods: {
        updateQuantityValue(value: number) {
            // this.$emit('update:quantity', value);
            // write request to update item.stock here
            this.item.stock = value;
        },
        deleteItem() {
            // write request to delete item here
            this.$emit('delete:item', this.item.id);
        },
        likeItem() {
            // write request to like item here
            this.$emit('like:item', this.item.id);
            this.item.liked = !this.item.liked;
        },
    },
});
</script>
<style>.custom-shadow {
    box-shadow: 0px 3px 8px 0px rgba(133, 133, 133, 0.25);
}</style>