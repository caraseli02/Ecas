<script setup lang="ts">
import {
  MoreVertical,
  MapPin,
  FileSpreadsheet,
  FilePlus2,
  DotIcon,
  Package,
  Truck,
  CheckCircle,
  ChevronRight
} from 'lucide-vue-next'
import { cn } from '~/lib/utils';

interface OrderStatus {
  processing: boolean,
  packaging: boolean,
  transit: boolean,
  fulfilled: boolean
}

interface Order {
  orderId: string
  awb: string | null
  amount: number
  status: 'processing' | 'packaging' | 'transit' | 'fulfilled'
  company: {
    name: string
    initial: string
  }
  address: string
  billingStatus: 'paid' | 'pending'
  orderDate: Date
  trackingStatus: OrderStatus
}

const props = withDefaults(defineProps<{
  order: Order
}>(), {
  order: () => ({
    orderId: 'S-241030007',
    awb: null,
    amount: 457.92,
    status: 'processing',
    company: {
      name: 'Ecas Electro S.R.L',
      initial: 'E'
    },
    address: 'Bd. Dimitrie Pompei Nr. 8, Sector 2, Bucuresti, 90210, Romania',
    billingStatus: 'paid',
    orderDate: new Date('2024-11-27'),
    trackingStatus: {
      processing: true,
      packaging: false,
      transit: false,
      fulfilled: false
    }
  })
})

const formattedDate = computed(() => {
  const date = new Date(props.order.orderDate)
  return {
    day: date.getDate(),
    month: date.toLocaleString('en-US', { month: 'long' }),
    year: date.getFullYear()
  }
})

const statusColor = computed(() => ({
  processing: 'bg-purple-500',
  packaging: 'bg-blue-500',
  transit: 'bg-blue-500',
  fulfilled: 'bg-emerald-500'
}[props.order.status]))

const statusIcons = {
  processing:  FilePlus2,
  packaging: Package,
  transit: Truck,
  fulfilled: MapPin
}

const billingStatusColor = computed(() => ({
  paid: 'bg-green-500',
  pending: 'bg-orange-500'
}[props.order.billingStatus]))

const handleMoreOptions = () => {
  // Implement more options menu logic
}
</script>

<template>
  <section
    class="w-full mx-auto flex overflow-hidden flex-col gap-8 p-6 bg-white rounded-xl border border-solid border-D3D3D3-300 max-md:px-4 max-md:gap-4"
  >
    <section class="flex flex-col w-full">
      <div class="flex flex-wrap gap-10 justify-between items-start w-full max-md:gap-4">
        <div class="flex flex-col lg:flex-row flex-wrap gap-6 items-center text-xl sm:text-2xl leading-none w-full md:w-auto max-md:gap-3 border md:border-none border-grey-300 p-2 bg-light-100 md:bg-transparent rounded-lg">
          <div class="flex justify-between md:justify-start gap-3 items-center self-stretch my-auto w-full md:w-auto">
            <span class="text-gray-500 font-normal">Order ID:</span>
            <span class="font-medium text-zinc-800">{{ order.orderId }}</span>
          </div>
          <div class="hidden lg:block w-px h-6 bg-stone-300"></div>
          <div class="flex justify-between md:justify-start gap-3 items-center self-stretch my-auto text-slate-500 w-full md:w-auto text-base sm:text-2xl">
            <span class="font-normal">AWB:</span>
            <p class="flex items-center gap-2" v-if="order.awb">
              {{ order.awb }}
              <CopyClipboard :text="order.awb" />
            </p>
            <p v-else class="flex items-center gap-2 text-sm text-neutral-700">
              <span  class="bg-orange-500 flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full" aria-hidden="true"></span>
              Pending
            </p>

          </div>
        </div>
        
        <div class="flex justify-end gap-4 lg:gap-9 items-start w-full md:w-auto max-md:gap-4">
            <UiBadge
              class="flex gap-3 items-center font-normal px-3 py-1 text-sm rounded-md h-8"
              variant="outline"
            >
            <div class="text-zinc-800">
              <span>$</span>
              <span>{{ order.amount.toFixed(2) }}</span>
            </div>
            <UiSeparator class="h-4 bg-grey-300" orientation="vertical" />
              
              <span class="capitalize flex gap-1">
                <span :class="billingStatusColor" class="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full" aria-hidden="true"></span>
                {{ order.billingStatus }}
              </span>
            </UiBadge>
          <UiButton
            class="flex justify-center items-center p-1 w-8 h-8 rounded-md bg-zinc-100"
            aria-label="More options"
            size="xs"
            @click="handleMoreOptions"
          >
            <MoreVertical class="w-6 h-6 text-black stroke-1" />
          </UiButton>
        </div>
      </div>

      <div class="flex flex-wrap items-center mt-8 w-full lg:w-fit gap-4 max-md:mt-4">
        <div class="flex gap-2 items-center font-medium w-full lg:w-auto">
          <div class="w-8 h-8 flex items-center justify-center bg-sky-100 rounded-full text-sky-500">
            {{ order.company.initial }}
          </div>
          <span class="text-sm leading-6 text-zinc-800">{{ order.company.name }}</span>
        </div>
        <div class="hidden lg:block w-px h-6 bg-stone-300"></div>
        <div class="flex gap-1 items-center text-sm leading-6 text-zinc-800 w-fit md:flex-1">
          <MapPin class="w-5 h-5 shrink-0" />
          <address class="not-italic">{{ order.address }}</address>
        </div>
        <div class="hidden lg:block w-px h-6 bg-stone-300"></div>
        <div class="flex gap-1 items-center text-sm leading-6 text-zinc-800">
          <FileSpreadsheet class="w-5 h-5" />
          <span class="capitalize">{{ order.billingStatus }}</span>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-6 px-4 py-6 rounded-xl border border-solid bg-light-100 border-grey-300">
      <div class="flex md:flex-wrap gap-10 justify-between md:items-center text-sm leading-6 max-md:gap-4">
        <div class="flex flex-col md:flex-row md:items-center max-md:gap-1 w-full md:w-auto">
          <h2 class="font-medium text-zinc-800">Order updated</h2>
          <DotIcon class="hidden md:block text-stone-300" />
          <time class="flex gap-1 text-gray-500">
            <span>{{ formattedDate.day }}</span>
            <span>{{ formattedDate.month }}</span>
            <span>{{ formattedDate.year }}</span>
          </time>
        </div>
        <UiBadge 
          :class="cn('flex items-start md:items-center justify-end md:justify-start gap-2 bg-light-100 text-neutral-700 font-normal p-0 text-sm rounded-md w-full md:w-auto')"
        >
          <span :class="statusColor" class="flex shrink-0 self-stretch w-3 h-3 rounded-full mt-1" aria-hidden="true"></span>
          <span class="capitalize">{{ order.status }}</span>
        </UiBadge>
      </div>

      <div class="relative flex justify-between flex-wrap gap-3 items-center min-h-[36px]">
        <template v-for="(status, index) in ['processing', 'packaging', 'transit', 'fulfilled']" :key="status">
          <component
            :is="statusIcons[status]"
            class="w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 shrink-0 z-10 bg-light-100 p-1"
            :class="{
              'text-slate-500': order.trackingStatus[status],
              'text-gray-300': !order.trackingStatus[status]
            }"
          />
        </template>
        <div 
            class="mx-6 md:mx-8 lg:mx-10 absolute inset-0 top-4 lg:top-3.5 flex-1 h-1 md:h-1.5 lg:h-2 bg-gray-200 rounded-full overflow-hidden min-w-[100px] md:min-w-[240px]"
          >
            <div
              class="h-full transition-all duration-300 ease-in-out rounded-full"
              :class="{
              'bg-emerald-500 full': order.status === 'fulfilled',
              'bg-blue-500 w-[85.5%]': order.status === 'transit',
              'bg-blue-500 w-1/2': order.status === 'packaging',
              'bg-purple-500 w-[12.5%]': order.status === 'processing' && order.billingStatus === 'paid',
            }"
            ></div>
          </div>
      </div>
    </section>
  </section>
</template>
