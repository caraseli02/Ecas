<script setup lang="ts">
import {
  MoreHorizontal,
  MapPin,
  FileSpreadsheet,
  FilePlus2,
  Hourglass,
  Package,
  Truck,
  CheckCircle,
  ChevronRight
} from 'lucide-vue-next'

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
  processing: 'bg-orange-500',
  packaging: 'bg-blue-500',
  transit: 'bg-emerald-500',
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
    class="flex overflow-hidden flex-col gap-8 p-6 bg-white rounded-xl border border-solid border-neutral-300 max-md:px-4 max-md:gap-4"
  >
    <header class="flex flex-col w-full">
      <div class="flex flex-wrap gap-10 justify-between items-start w-full max-md:gap-4">
        <div class="flex flex-wrap gap-6 items-center text-2xl leading-none w-full md:w-auto max-md:gap-3">
          <div class="flex gap-3 items-center self-stretch my-auto w-full md:w-auto">
            <span class="text-gray-500">Order ID:</span>
            <span class="font-medium text-zinc-800">{{ order.orderId }}</span>
          </div>
          <div class="hidden md:block w-px h-6 bg-stone-300"></div>
          <div class="flex gap-3 items-center self-stretch my-auto text-gray-500 w-full md:w-auto">
            <span>AWB:</span>
            <span>{{ order.awb || 'Pending...' }}</span>
          </div>
        </div>
        
        <div class="flex gap-9 items-start w-full md:w-auto max-md:gap-4">
          <div class="flex gap-3 items-center font-medium">
            <div class="text-xl leading-8 text-zinc-800">
              <span>$</span>
              <span>{{ order.amount.toFixed(2) }}</span>
            </div>
            <UiButton
              class="flex items-center px-3 py-1 text-sm text-white rounded-md"
              size="xs"
              :class="billingStatusColor"
            >
              <Hourglass v-if="order.billingStatus === 'pending'" class="w-4 h-4 mr-2" />
              <CheckCircle v-if="order.billingStatus === 'paid'" class="w-4 h-4 mr-2" />
              <span class="capitalize">{{ order.billingStatus }}</span>
            </UiButton>
          </div>
          <UiButton
            class="flex justify-center items-center p-1 w-8 h-8 rounded-md bg-zinc-100"
            aria-label="More options"
            size="xs"
            @click="handleMoreOptions"
          >
            <MoreHorizontal class="w-6 h-6" />
          </UiButton>
        </div>
      </div>

      <div class="flex flex-wrap items-center mt-8 w-fit gap-4 max-md:mt-4">
        <div class="flex gap-2 items-center font-medium w-full md:w-auto">
          <div class="w-8 h-8 flex items-center justify-center bg-sky-100 rounded-full text-sky-500">
            {{ order.company.initial }}
          </div>
          <span class="text-sm leading-6 text-zinc-800">{{ order.company.name }}</span>
        </div>
        <div class="hidden md:block w-px h-6 bg-stone-300"></div>
        <div class="flex gap-1 items-center text-sm leading-6 text-zinc-800 w-fit md:flex-1">
          <MapPin class="w-5 h-5 shrink-0" />
          <address class="not-italic">{{ order.address }}</address>
        </div>
        <div class="hidden md:block w-px h-6 bg-stone-300"></div>
        <div class="flex gap-1 items-center text-sm leading-6 text-zinc-800">
          <FileSpreadsheet class="w-5 h-5" />
          <span class="capitalize">{{ order.billingStatus }}</span>
        </div>
      </div>
    </header>

    <main class="flex flex-col gap-6 px-4 py-6 rounded-xl border border-solid bg-stone-50 border-neutral-300">
      <div class="flex flex-wrap gap-10 justify-between items-center text-sm leading-6 max-md:gap-4">
        <div class="flex items-center gap-6 max-md:gap-3 w-full md:w-auto">
          <h2 class="font-medium text-zinc-800">Order received</h2>
          <div class="hidden md:block w-px h-6 bg-stone-300"></div>
          <time class="flex gap-1 text-gray-500">
            <span>{{ formattedDate.day }}</span>
            <span>{{ formattedDate.month }}</span>
            <span>{{ formattedDate.year }}</span>
          </time>
        </div>
        <button 
          class="flex items-center px-3 py-1 text-sm text-white rounded-md w-full md:w-auto justify-center md:justify-start"
          :class="statusColor"
        >
          <Hourglass class="w-4 h-4 mr-2" />
          <span class="capitalize">{{ order.status }}</span>
        </button>
      </div>

      <div class="flex flex-wrap gap-3 items-center mt-6 min-h-[36px] max-md:mt-4">
        <template v-for="(status, index) in ['processing', 'packaging', 'transit', 'fulfilled']" :key="status">
          <component
            :is="statusIcons[status]"
            class="w-9 h-9 shrink-0"
            :class="{
              'text-emerald-500': order.trackingStatus[status],
              'text-gray-300': !order.trackingStatus[status]
            }"
          />
          <div 
            v-if="index < 3"
            class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden min-w-[100px] md:min-w-[240px]"
          >
            <div
              class="h-full transition-all duration-300 ease-in-out"
              :class="{
              'bg-emerald-500': order.status === 'fulfilled' || order.status === 'transit',
              'bg-blue-500': order.status === 'packaging',
              'bg-orange-500': order.status === 'processing'
            }"
              :style="{ width: order.trackingStatus[status] ? '100%' : '0%' }"
            ></div>
          </div>
        </template>
      </div>
    </main>
  </section>
</template>
