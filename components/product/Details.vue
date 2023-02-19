<template>
  <div
    class="relative bg-white rounded-md font-Inter pt-[15px] pb-2.5 shadow-card md:pb-[26px] lg:pb-4 lg:self-start"
  >
    <div class="flex items-end justify-between px-2.5 mb-[18px] md:px-[15px]">
      <div class="flex items-center">
        <div class="text-xl leading-tight font-semibold mr-2">ADIN2111BCPZ</div>
        <button
          class="flex text-gray-300 transition-colors duration-300 mr-2 hover:text-blue"
        >
          <CopyIcon class="w-[22px] h-[22px]" />
        </button>
        <button
          class="flex text-gray-300 transition-colors duration-300 mr-2 hover:text-blue"
          @click="customProductPartNumberModal = true"
        >
          <EditIcon class="w-[22px] h-[22px]" />
        </button>
      </div>
      <img
        :src="MicrochipLogo"
        alt="Microchip Logo"
        class="w-[82px] h-[50px] object-contain"
      />
    </div>
    <div
      class="flex items-center justify-between gap-3 px-2.5 pt-[5px] pb-1.5 bg-[#F2F2F2] md:px-[15px]"
    >
      <div class="text-xs leading-tight font-medium flex-shrink-0">
        Description
      </div>
      <div class="text-xs leading-tight">
        EAR99, Active, 8542.31.00.01, PIC16, EU RoHS
      </div>
    </div>
    <div
      class="flex items-center justify-between gap-3 px-2.5 pt-[5px] pb-1.5 md:px-[15px]"
    >
      <div class="text-xs leading-tight font-medium flex-shrink-0">
        Manufacturer
      </div>
      <div class="text-xs leading-tight font-medium">MICROCHIP</div>
    </div>
    <div
      class="flex items-center justify-between gap-3 px-2.5 pt-[5px] pb-1.5 bg-[#F2F2F2] md:px-[15px]"
    >
      <div class="text-xs leading-tight font-medium flex-shrink-0">
        Customer’s Code
      </div>
      <button
        class="flex items-center text-gray-300 transition-colors duration-300 hover:text-blue"
        @click="customProductPartNumberModal = true"
      >
        <span class="text-xs leading-tight font-medium mr-[5px]">
          Your Custom Code
        </span>
        <EditIcon class="w-[22px] h-[22px]" />
      </button>
    </div>
    <div
      class="flex items-center justify-between gap-3 px-2.5 pt-[5px] pb-1.5 md:px-[15px]"
    >
      <div class="text-xs leading-tight font-medium flex-shrink-0">
        EDA / CAD Models
      </div>
      <button class="flex items-center">
        <CADModelsIcon class="w-[22px] h-[22px] mr-[5px]" />
        <span class="text-xs leading-tight text-gray-300">
          ADIN2111BCPZ-ECAD-Model
        </span>
      </button>
    </div>
    <div
      class="flex items-center justify-between gap-3 px-2.5 pt-[5px] pb-1.5 bg-[#F2F2F2] md:px-[15px]"
    >
      <div class="text-xs leading-tight font-medium flex-shrink-0">
        Technical Datasheet
      </div>
      <button class="flex items-center">
        <PDFIcon class="w-[22px] h-[22px] mr-[5px]" />
        <span class="text-xs leading-tight text-gray-300">
          ADIN2111BCPZ-DataSheet
        </span>
      </button>
    </div>
    <div class="flex items-start gap-3 px-2.5 pt-[5px] pb-1.5 md:px-[15px]">
      <div class="text-xs leading-tight font-medium flex-shrink-0">Tags:</div>
      <button class="flex items-center flex-wrap gap-x-2 gap-y-0.5">
        <span class="text-xs leading-tight font-semibold text-blue">
          #Diode
        </span>
        <span class="text-xs leading-tight font-semibold text-blue">
          #Connector
        </span>
        <span class="text-xs leading-tight font-semibold text-blue">
          #GasDetector
        </span>
        <span class="text-xs leading-tight font-semibold text-blue">
          #Thermostat
        </span>
        <span class="text-xs leading-tight font-semibold text-blue">
          #Transistor
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import MicrochipLogo from "@/assets/media/product/microchip.png";
import CADModelsIcon from "@/assets/icons/cad-models.svg";
import PDFIcon from "@/assets/icons/pdf.svg";
import CopyIcon from "@/assets/icons/copy.svg";
import EditIcon from "@/assets/icons/edit.svg";
import { customProductPartNumberModal } from "~~/system/modal/custom-product-part-number";
</script>
