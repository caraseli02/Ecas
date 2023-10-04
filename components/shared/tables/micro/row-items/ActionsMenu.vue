<template>
  <SkeletonLoader v-if="loading" class="w-full h-6" />
  <template v-else>
    <Tooltip :position="index === 0 ? 'bottom' : 'top'" theme="black">
      <button v-if="documentButton" @click="documentClicked" :disabled="documentDisabled"
        class="flex transition-colors duration-300"
        :class="documentDisabled ? 'text-[#BDBDBD]' : 'text-gray-300 hover:text-blue'">
        <DocumentIcon class="w-6 h-6" />
      </button>
      <template #content>
        <span>{{ txtDocument }}</span>
      </template>
    </Tooltip>
    <Tooltip :position="index === 0 ? 'bottom' : 'top'" theme="black">
      <button v-if="invoiceButton" @click="invoiceClicked" :disabled="invoiceDisabled"
        class="flex transition-colors duration-300"
        :class="invoiceDisabled ? 'text-[#BDBDBD]' : 'text-gray-300 hover:text-blue'">
        <InvoiceIcon class="w-6 h-6" />
      </button>
      <template #content>
        <span>{{ txtInvoice }}</span>
      </template>
    </Tooltip>
    <button v-if="downloadButton" @click="downloadClicked" :disabled="downloadDisabled"
      class="flex transition-colors duration-300"
      :class="downloadDisabled ? 'text-[#BDBDBD]' : 'text-gray-300 hover:text-blue'">
      <DownloadIcon class="w-5 h-5 mr-2" />
      <span class="text-sm font-medium leading-[1.71]">{{ txtDownload }}</span>
    </button>
    <div v-if="threeDotButton" class="relative">
      <button @click="handleShowOptions" class="flex text-[#9296AA] transition-colors duration-300 hover:text-blue">
        <MoreVerticalIcon class="w-6 h-6" />
      </button>
    </div>
  </template>
</template>
<script lang="ts">
import TooltipVue from '~/components/global/Tooltip.vue';
import SkeletonLoader from '~/components/global/SkeletonLoader.vue';
import DocumentIcon from '@/assets/icons/dashboard/document.svg';
import MoreVerticalIcon from '@/assets/icons/dashboard/more-vertical.svg';
import InvoiceIcon from '@/assets/icons/dashboard/invoice.svg';
import DownloadIcon from '@/assets/icons/dashboard/download-2.svg';

export default defineComponent({
  name: 'ActionsMenu',
  props: ['loading', 'index', 'documentButton', 'invoiceButton', 'downloadButton', 'threeDotButton', 'txtDocument', 'txtInvoice', 'txtDownload', 'documentDisabled', 'invoiceDisabled', 'downloadDisabled'],
  components: {
    TooltipVue,
    SkeletonLoader,
    DocumentIcon,
    MoreVerticalIcon,
    InvoiceIcon,
    DownloadIcon,
  },
  methods: {
    documentClicked(event: MouseEvent) {
      this.$emit('documentClicked', event);
    },
    handleShowOptions(event: MouseEvent) {
      this.$emit('showOptions', event);
    },
    invoiceClicked(event: MouseEvent) {
      this.$emit('invoiceClicked', event);
    },
    downloadClicked(event: MouseEvent) {
      this.$emit('downloadClicked', event);
    },
  },
});
</script>