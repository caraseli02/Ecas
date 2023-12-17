<template>
    <div class="flex flex-col pb-4" :class="[inModal ? '' : 'border-b border-gray-200 mx-2 last:border-b-0']">
        <div class="flex" :class="[inModal ? 'items-center' : 'items-start']">
            <label v-if="inModal" class="flex cursor-pointer mr-2.5">
                <input :value="productItem.selected" type="checkbox" class="sr-only" @change="$emit('select')" />
                <div
                    class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
                    :class="[
                        productItem.selected
                            ? 'bg-blue border-blue group-hover:bg-white'
                            : 'bg-white  border-border group-hover:border-gray-300',
                    ]"
                >
                    <CheckIcon v-if="productItem.selected" class="w-4 text-white transition-colors duration-300 group-hover:text-blue" />
                </div>
            </label>
            <img
                v-if="productItem.image"
                :src="productItem.image"
                :alt="productItem.title"
                :class="[
                    inModal
                        ? 'w-9 h-9 mr-2'
                        : 'w-12 h-12 border border-border rounded-lg overflow-hidden object-cover mr-3 md:w-14 md:h-14',
                ]"
            />
            <div :class="[inModal ? '<truncate' : '']">
                <div class="flex items-center" :class="[inModal ? '' : 'mb-1']">
                    <div class="font-semibold mr-2" :class="[inModal ? 'text-xs leading-tight' : 'text-sm leading-[1.71]']">
                        {{ productItem.title }}
                    </div>
                    <button
                        v-if="!inModal && !inCart"
                        class="flex text-gray-300 transition-colors duration-300 mr-2 hover:text-blue"
                        @click="copyItems = true"
                    >
                        <CopyIcon class="w-[18px] h-[18px]" />
                    </button>
                    <button v-if="!inModal" class="flex text-gray-300 transition-colors duration-300 mr-2 hover:text-blue">
                        <InfoIcon class="w-4 h-4" />
                    </button>
                </div>
                <!-- Handle discounted price color: red -->
                <div v-if="!inModal" class="text-sm leading-[1.43] font-semibold font-Inter">
                    $ 0,095 <span class="text-xs font-normal font-Poppins">(100+)</span>
                </div>
            </div>
            <button
                v-if="!inModal"
                class="flex items-center justify-center ml-auto text-gray-300 transition-colors duration-300 hover:text-[#FA4B4B]"
                @click="deleteItem = true"
            >
                <TrashIcon class="w-5 h-5" />
            </button>
        </div>
        <div v-if="!inModal" class="flex items-end justify-between">
            <div v-if="!inCart" class="flex items-center">
                <label class="flex cursor-pointer mr-[15px]">
                    <input :value="productItem.selected" type="checkbox" class="sr-only" @change="$emit('select')" />
                    <div
                        class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
                        :class="[
                            productItem.selected
                                ? 'bg-blue border-blue group-hover:bg-white'
                                : 'bg-white  border-border group-hover:border-gray-300',
                        ]"
                    >
                        <CheckIcon
                            v-if="productItem.selected"
                            class="w-4 text-white transition-colors duration-300 group-hover:text-blue"
                        />
                    </div>
                </label>
                <div class="flex items-center text-green">
                    <CheckCircleIcon class="w-4 h-4 mr-1" />
                    <span class="text-[11px] leading-tight font-semibold font-Inter"> 16,000 in stock </span>
                </div>
            </div>
            <div v-else class="font-Inter font-semibold leading-[1.25]">$ 17,830.95</div>
            <QuantityButtons
                v-if="typeof productItem.quantity === 'number'"
                v-model="productItem.quantity"
                :object="{action : ProductAction.Update, id: productItem.id} as ProductActionObject"
                class="mr-10"
            />
        </div>
    </div>
    <Teleport to="body">
        <Transition name="slide-from-top">
            <LayoutFavoritesModalsDelete v-if="deleteItem" :products="[productItem]" :delete-from-cart="true" @close="deleteItem = false" />
        </Transition>
        <Transition name="slide-from-top">
            <LayoutFavoritesModalsCopyMoveItems v-if="copyItems" :items="[productItem]" action="copy" @close="copyItems = false" />
        </Transition>
        <Transition name="fade">
            <div
                v-if="deleteItem || copyItems"
                class="fixed z-[60] top-0 left-0 w-full h-full bg-[#333333]/30 backdrop-blur-[2px] cursor-pointer md:z-50"
                @click="
                    deleteItem = false;
                    copyItems = false;
                "
            />
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { FavoriteItem } from '~~/types';
import CheckIcon from '@/assets/icons/check.svg';
import CheckCircleIcon from '@/assets/icons/check-circle.svg';
import CopyIcon from '@/assets/icons/copy.svg';
import InfoIcon from '@/assets/icons/info-circle.svg';
import TrashIcon from '@/assets/icons/trash-can.svg';
import { ProductAction, ProductActionObject } from '~/model/cart/response/cart.interface';

const props = defineProps({
    product: {
        type: Object as PropType<FavoriteItem>,
        required: true,
    },
    inModal: {
        type: Boolean,
        required: false,
    },
    inCart: {
        type: Boolean,
        required: false,
    },
});
const productItem = ref<FavoriteItem>(props.product);
defineEmits(['select']);

const deleteItem = ref(false);

const copyItems = ref(false);
</script>