<template>
    <div
        class="h-[298px] col-span-2 lg:col-span-1 w-full relative bg-white rounded-xl font-Inter pt-[15px] pb-2.5 shadow-m md:pb-[26px] lg:pb-4 lg:self-start"
    >
        <div class="flex items-end justify-between px-2.5 mb-[18px] md:px-[15px]">
            <div class="flex items-center">
                <div class="text-xl leading-tight font-semibold mr-2">{{ product.name }}</div>
                <button class="flex text-slate-500 transition-colors duration-300 mr-2 hover:text-blue-500">
                    <CopyClipboard :text="product.name || 'N/A'" class="w-5 h-5" />
                </button>
            </div>
            <img :src="product.details?.ProductImage.ProductImageLarge" alt="Microchip Logo" class="w-[82px] h-[50px] object-contain" />
        </div>
        <div class="flex items-center justify-between gap-3 px-2.5 h-8 bg-light-100 md:px-[15px]">
            <div class="text-xs leading-tight font-medium flex-shrink-0 text-neutral-700">Description</div>
            <div class="text-xs leading-tight text-slate-500 text-end">
                {{ product.description }}
            </div>
        </div>
        <div class="flex items-center justify-between gap-3 px-2.5 h-8 md:px-[15px]">
            <div class="text-xs leading-tight font-medium flex-shrink-0 text-neutral-700">Manufacturer</div>
            <div class="text-xs leading-tight text-slate-500">{{ product.manufacturer }}</div>
        </div>
        <div class="flex items-center justify-between gap-3 px-2.5 h-8 bg-light-100 md:px-[15px]">
            <div class="text-xs leading-tight font-medium flex-shrink-0">Customer’s Code</div>
            <button
                class="flex items-center text-slate-500 transition-colors duration-300 hover:text-blue-500"
                @click="showCustomProductPartNumberModal = true"
            >
                <span class="text-xs leading-tight mr-[5px] text-slate-500"> Your Custom Code </span>
                <SquarePen class="w-4 h-4 stroke-1" />
            </button>
        </div>
        <div class="flex items-center justify-between gap-3 px-2.5 h-8 md:px-[15px]">
            <div class="text-xs leading-tight font-medium flex-shrink-0">EDA / CAD Models</div>
            <button class="flex items-center">
                <CADModelsIcon class="w-4 h-4 mr-[5px]" />
                <span class="text-xs leading-tight text-slate-500"> ADIN2111BCPZ-ECAD-Model </span>
            </button>
        </div>
        <div class="flex items-center justify-between gap-3 px-2.5 h-9 bg-light-100 md:px-[15px]">
            <div class="text-xs leading-tight font-medium flex-shrink-0">Technical Datasheet</div>
            <a
                class="flex items-center"
                :href="product.details?.SummaryData.Datasheet"
                :download="`${product.name} Datasheet`"
                target="_blank"
            >
                <PDFIcon class="w-5 h-5 mr-[5px]" />
                <span class="text-xs leading-tight text-slate-500 hover:underline"> {{ product.name }}-DataSheet </span>
            </a>
        </div>
        <div class="flex items-center gap-2 px-2.5 py-2 min-h-[34px] md:px-[15px]">
            <div class="text-xs leading-tight font-medium flex-shrink-0">Tags:</div>
            <button class="flex items-center flex-wrap gap-x-2 gap-y-0.5 text-xs leading-tight font-medium text-blue-500">
                <span> #Diode </span>
                <span> #Connector </span>
                <span> #GasDetector </span>
                <span> #Thermostat </span>
                <span> #Transistor </span>
            </button>
        </div>
    </div>
    <Teleport to="body">
        <Transition name="fade">
            <LayoutCustomProductPartNumberModal v-if="showCustomProductPartNumberModal" @close="showCustomProductPartNumberModal = false" />
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { SquarePen } from 'lucide-vue-next';
import CADModelsIcon from '@/assets/icons/cad-models.svg';
import PDFIcon from '@/assets/icons/pdf.svg';
import { ProductDetail } from '~~/model/products/response/ProductDetailResponse';

const props = defineProps<{
    product: ProductDetail;
}>();

const showCustomProductPartNumberModal = ref(false);
</script>
