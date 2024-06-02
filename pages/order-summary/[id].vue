<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { FileText, MapPin, BoxIcon, InfoIcon, TruckIcon, Undo2Icon, PackageOpenIcon, SettingsIcon } from 'lucide-vue-next';
import { CartProductsInterface } from '~/types';

const route = useRoute()
console.log(route.params.id);
const breakpoints = useBreakpoints(breakpointsTailwind)

const lgAndLarger = breakpoints.greaterOrEqual('lg') // sm and larger

const data: CartProductsInterface[] = [
  {
    'id': '657efb1db390bbc35fc714a7',
    'stock': '0',
    '_id': '6645e1d0c556a9f8987f7bec',
    'productEntity': {
      '_id': '657efb1db390bbc35fc714a7',
      'class': 'CIA',
      'alias': 'LM2675M-5.0',
      'description': 'Switch. Reg 1A 5V 45Vs SO8',
      'variant': 'NSC-LM2675M-5.0/NOPB',
      'manufacturer': 'Texas Instruments',
      'manufacturerCode': 'LM2675M-5.0/NOPB',
      'stock': 10,
      'priceHistory': [
        {
          'price': 1.627438775510204,
          'active': true,
          'createdAt': '2023-12-17T13:43:57.858Z',
          'updatedAt': '2023-12-17T13:43:57.858Z'
        }
      ],
      'sold': 3770,
      'adminSettings': {
        'featured': false,
        'discount': {
          'value': 8,
          '_id': '665c93e596ae3f4e0184e5d9'
        }
      },
      'additionalInfo': {
        'searchedCount': 188
      },
      'details': {
        'ProductImage': {
          'ProductImageSmall': 'http://download.siliconexpert.com/pdfs/2018/4/5/9/32/2/872/txn_/manual/d0008a.jpg',
          'ProductImageLarge': 'http://download.siliconexpert.com/pdfs/2018/4/5/9/20/34/330/txn_/manual/d0008a.jpg'
        }
      },
      'priceConfiguration': {
        'configuration': [
          {
            'price': 1.7901826530612244,
            'quantity': 10,
            'createdAt': '2023-12-17T13:43:58.432Z',
            'updatedAt': '2023-12-17T13:43:58.432Z'
          },
          {
            'price': 1.7576338775510203,
            'quantity': 25,
            'createdAt': '2023-12-17T13:43:58.432Z',
            'updatedAt': '2023-12-17T13:43:58.432Z'
          },
          {
            'price': 1.7250851020408162,
            'quantity': 50,
            'createdAt': '2023-12-17T13:43:58.432Z',
            'updatedAt': '2023-12-17T13:43:58.432Z'
          },
          {
            'price': 1.692536326530612,
            'quantity': 100,
            'createdAt': '2023-12-17T13:43:58.432Z',
            'updatedAt': '2023-12-17T13:43:58.432Z'
          }
        ],
        'smartLinkId': '657ef7c7983864bc552c1f59',
        'updatedAt': '2023-12-17T13:43:58.432Z'
      }
    },
    'initialUnitPrice': 1.7901826530612244,
    'unitPriceAfterDiscounts': 1.6469680408163265,
    'subtotal': 0,
    'total': 0,
    'discount': {
      'value': 8
    }
  },
  {
    'id': '657efbbeb390bbc35fc717db',
    'stock': '10',
    '_id': '665c906796ae3f4e0184e42f',
    'productEntity': {
      '_id': '657efbbeb390bbc35fc717db',
      'class': 'DIO',
      'alias': '1N5819HW',
      'description': 'DIODE, SCKY RECTI, 1A, 40V, SOD123',
      'variant': 'TEC-1N5819HW',
      'manufacturer': 'Tech Public',
      'manufacturerCode': '1N5819HW',
      'stock': 0,
      'priceHistory': [
        {
          'price': 0.024763469381632656,
          'active': true,
          'createdAt': '2023-12-17T13:46:38.414Z',
          'updatedAt': '2023-12-17T13:46:38.414Z'
        }
      ],
      'sold': 1263,
      'adminSettings': {
        'featured': false
      },
      'additionalInfo': {
        'searchedCount': 51
      },
      'details': {
        'ProductImage': {
          'ProductImageSmall': 'http://download.siliconexpert.com/pdfs/2017/2/13/7/11/21/832/dds_/manual/ddz9717-7.jpg',
          'ProductImageLarge': 'http://download.siliconexpert.com/pdfs/2017/2/13/7/17/45/693/dds_/manual/ddz9717-7.jpg'
        }
      },
      'priceConfiguration': {
        'configuration': [
          {
            'price': 0.027239816319795922,
            'quantity': 10,
            'createdAt': '2023-12-17T13:46:38.868Z',
            'updatedAt': '2023-12-17T13:46:38.868Z'
          },
          {
            'price': 0.026744546932163268,
            'quantity': 25,
            'createdAt': '2023-12-17T13:46:38.868Z',
            'updatedAt': '2023-12-17T13:46:38.868Z'
          },
          {
            'price': 0.026249277544530616,
            'quantity': 50,
            'createdAt': '2023-12-17T13:46:38.868Z',
            'updatedAt': '2023-12-17T13:46:38.868Z'
          },
          {
            'price': 0.025754008156897962,
            'quantity': 100,
            'createdAt': '2023-12-17T13:46:38.868Z',
            'updatedAt': '2023-12-17T13:46:38.868Z'
          }
        ],
        'smartLinkId': '657ef796983864bc552c1a66',
        'updatedAt': '2023-12-17T13:46:38.868Z'
      }
    },
    'initialUnitPrice': 0.027239816319795922,
    'unitPriceAfterDiscounts': 0.027239816319795922,
    'subtotal': 0.27239816319795923,
    'total': 0.3241538142055715,
    'discount': {
      'value': 0
    }
  },
  {
    'id': '657efb18b390bbc35fc71489',
    'stock': '10',
    '_id': '665c906a96ae3f4e0184e44c',
    'productEntity': {
      '_id': '657efb18b390bbc35fc71489',
      'class': 'CIA',
      'alias': '78L05ACD-SMD',
      'description': 'U-Reg +5V 0,1A SO8',
      'variant': 'ONS-MC78L05ACDR2G',
      'manufacturer': 'OnSemi',
      'manufacturerCode': 'MC78L05ACDR2G',
      'stock': 0,
      'priceHistory': [
        {
          'price': 0.0571501398122449,
          'active': true,
          'createdAt': '2023-12-17T13:43:52.614Z',
          'updatedAt': '2023-12-17T13:43:52.614Z'
        },
        {
          'price': 0.059203385889795915,
          'active': false,
          'createdAt': '2023-12-17T13:44:04.842Z',
          'updatedAt': '2023-12-17T13:44:04.842Z'
        }
      ],
      'sold': 286,
      'adminSettings': {
        'featured': false
      },
      'additionalInfo': {
        'searchedCount': 20
      },
      'details': {
        'ProductImage': {
          'ProductImageSmall': 'http://download.siliconexpert.com/pdfs/2017/3/19/9/50/37/794/ons_/manual/lm393edr2g.jpg',
          'ProductImageLarge': 'http://download.siliconexpert.com/pdfs/2017/3/19/9/36/0/965/ons_/manual/lm393edr2g.jpg'
        }
      },
      'priceConfiguration': {
        'configuration': [
          {
            'price': 0.0628651537934694,
            'quantity': 10,
            'createdAt': '2023-12-17T13:44:05.471Z',
            'updatedAt': '2023-12-17T13:44:05.471Z'
          },
          {
            'price': 0.061722150997224494,
            'quantity': 25,
            'createdAt': '2023-12-17T13:44:05.471Z',
            'updatedAt': '2023-12-17T13:44:05.471Z'
          },
          {
            'price': 0.06057914820097959,
            'quantity': 50,
            'createdAt': '2023-12-17T13:44:05.471Z',
            'updatedAt': '2023-12-17T13:44:05.471Z'
          },
          {
            'price': 0.0594361454047347,
            'quantity': 100,
            'createdAt': '2023-12-17T13:44:05.471Z',
            'updatedAt': '2023-12-17T13:44:05.471Z'
          }
        ],
        'smartLinkId': '657ef796983864bc552c1a66',
        'updatedAt': '2023-12-17T13:44:05.471Z'
      }
    },
    'initialUnitPrice': 0.0628651537934694,
    'unitPriceAfterDiscounts': 0.0628651537934694,
    'subtotal': 0.628651537934694,
    'total': 0.7480953301422858,
    'discount': {
      'value': 0
    }
  },
  {
    'id': '657efafdb390bbc35fc713fd',
    'stock': '10',
    '_id': '665c906e96ae3f4e0184e46d',
    'productEntity': {
      '_id': '657efafdb390bbc35fc713fd',
      'class': 'BAT',
      'alias': 'CR2032B',
      'description': 'Varta Lithium Button Cell 3V 230mAh',
      'variant': null,
      'manufacturer': 'Varta',
      'manufacturerCode': '6032 101 501',
      'stock': 120250,
      'priceHistory': [
        {
          'price': 0.26777869897959183,
          'active': true,
          'createdAt': '2023-12-17T13:43:25.632Z',
          'updatedAt': '2023-12-17T13:43:25.632Z'
        }
      ],
      'sold': 636,
      'adminSettings': {
        'featured': false
      },
      'additionalInfo': {
        'searchedCount': 71
      },
      'details': {
        'ProductImage': {
          'ProductImageSmall': 'http://download.siliconexpert.com/pdfs2/2022/9/8/12/51/52/93383/vrta_/manual/05_cr2032.jpg',
          'ProductImageLarge': 'http://download.siliconexpert.com/pdfs2/2022/9/8/12/53/33/974737/vrta_/manual/05_cr2032.jpg'
        }
      },
      'priceConfiguration': {
        'configuration': [
          {
            'price': 0.294556568877551,
            'quantity': 10,
            'createdAt': '2023-12-17T13:43:26.400Z',
            'updatedAt': '2023-12-17T13:43:26.400Z'
          },
          {
            'price': 0.2892009948979592,
            'quantity': 25,
            'createdAt': '2023-12-17T13:43:26.400Z',
            'updatedAt': '2023-12-17T13:43:26.400Z'
          },
          {
            'price': 0.28384542091836734,
            'quantity': 50,
            'createdAt': '2023-12-17T13:43:26.400Z',
            'updatedAt': '2023-12-17T13:43:26.400Z'
          },
          {
            'price': 0.2784898469387755,
            'quantity': 100,
            'createdAt': '2023-12-17T13:43:26.400Z',
            'updatedAt': '2023-12-17T13:43:26.400Z'
          }
        ],
        'smartLinkId': '657ef796983864bc552c1a66',
        'updatedAt': '2023-12-17T13:43:26.400Z'
      }
    },
    'initialUnitPrice': 0.294556568877551,
    'unitPriceAfterDiscounts': 0.294556568877551,
    'subtotal': 2.9455656887755097,
    'total': 3.5052231696428566,
    'discount': {
      'value': 0
    }
  }
]

const stockItems: ComputedRef<CartProductsInterface[]> = computed(() => {
  return data.filter(
    (item: CartProductsInterface) => item.productEntity?.stock !== undefined && item.productEntity.stock >= item.stock
  );
});

const backOrderItems: ComputedRef<CartProductsInterface[]> = computed(() => {
  return data.filter(
    (item: CartProductsInterface) => item.productEntity?.stock !== undefined && item.productEntity.stock < item.stock
  );
});

const subtotal = computed(() => {
  return data.reduce((acc, item) => acc + item.unitPriceAfterDiscounts * item.stock, 0);
});

const discountRate = ref(10); // Assuming a flat 10% discount for simplicity

const discount = computed(() => {
  return subtotal.value * (discountRate.value / 100);
});

const shippingCost = computed(() => {
  // Implement logic to determine shipping cost based on order size, location, etc.
  return data.length > 0 ? 7.49 : 0; // Placeholder value
});

const taxRate = ref(19); // 19% tax rate

const tax = computed(() => {
  return (subtotal.value - discount.value + shippingCost.value) * (taxRate.value / 100);
});

const stockItemsTotal = computed(() => {
  return data.filter(item => item.productEntity.stock >= parseInt(item.stock))
    .reduce((acc, item) => acc + item.unitPriceAfterDiscounts * item.stock, 0);
});

const backorderItemsTotal = computed(() => {
  return data.filter(item => item.productEntity.stock < parseInt(item.stock))
    .reduce((acc, item) => acc + item.unitPriceAfterDiscounts * item.stock, 0);
});

const orderTotal = computed(() => {
  return subtotal.value - discount.value + shippingCost.value + tax.value;
});

const payableNow = computed(() => {
  // You might calculate this differently based on business rules
  return stockItemsTotal.value + tax.value; // Simplified example
});

</script>

<template>
  <section class="container px-4 md:p-6 flex flex-col gap-10">
    <div class="flex flex-col self-stretch">
      <div class="flex flex-wrap lg:gap-4 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <div class="flex gap-5 justify-between my-auto">
          <h1 class="text-2xl font-semibold leading-8 text-neutral-700">
            Order ID: <span class="text-blue-500">#{{ route.params.id }}</span>
          </h1>
          <UiBadge class="justify-center px-2 py-1 my-auto text-sm font-medium leading-5 text-white bg-blue-500 rounded">
            Mixed Order
          </UiBadge>
        </div>
        <div
          class="md:w-full lg:w-fit flex gap-2 md:gap-4 order-2 lg:order-1 mt-5 lg:mt-0 text-sm font-medium leading-6 text-white max-md:flex-wrap">
          <UiButton variant="secondary"
            class="w-[114px] md:w-full lg:w-fit flex gap-2 justify-center px-6 py-2 text-gray-500 rounded-lg bg-zinc-100 max-md:px-5">
            <FileText class="shrink-0 w-6 aspect-square stroke-[1.5]" />
            <span class="hidden lg:inline">View</span> Invoices
          </UiButton>
          <UiButton variant="secondary"
            class="w-[114px] md:w-full lg:w-fit flex gap-2 justify-center px-6 py-2 text-gray-500 rounded-lg bg-zinc-100 max-md:px-5">
            <MapPin class="shrink-0 w-6 aspect-square stroke-[1.5]" />
            Track <span class="hidden lg:inline">Order</span>
          </UiButton>
          <UiButton variant="secondary"
            class="w-[114px] md:w-full lg:w-fit flex gap-2 justify-center px-6 py-2 text-gray-500 rounded-lg bg-zinc-100 max-md:px-5">
            <BoxIcon class="shrink-0 w-6 aspect-square stroke-[1.5]" />
            View All <span class="hidden lg:inline">Orders</span>
          </UiButton>
        </div>
        <div
          class="flex flex-wrap gap-3 order-1 lg:order-2 pr-20 mt-3 lg:mt-0 text-sm font-medium leading-6 max-md:flex-wrap max-md:pr-5">
          <div class="flex gap-2">
            <div class="text-gray-500">Order Date:</div>
            <div class="text-neutral-700">21 September 2023, 18:25</div>
          </div>
          <div class="flex gap-2">
            <div class="text-gray-500">Shipping Method:</div>
            <div class=" text-neutral-700">3-5 Business Days</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-9 max-md:flex-col max-md:gap-0">
      <div class="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <div class="flex flex-col grow text-sm font-semibold leading-5 text-neutral-700 max-md:mt-9 max-md:max-w-full">
          <h2 class="text-base leading-7 max-md:max-w-full">Customer Details</h2>
          <p class="mt-9 leading-6 max-md:max-w-full">Madalina Popescu</p>
          <p class="mt-2 font-medium text-gray-500 max-md:max-w-full">
            madalina.popescu@company.com
          </p>
          <p class="mt-2 font-medium text-gray-500 max-md:max-w-full">
            +40 (742) 624 425
          </p>
        </div>
      </div>
      <div class="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <div class="flex flex-col max-md:mt-9 max-md:max-w-full">
          <h2 class="text-base font-semibold leading-7 text-neutral-700 max-md:max-w-full">
            Payment Method
          </h2>
          <div v-if="false" class="flex gap-2 self-start pr-8 mt-9 max-md:pr-5">
            <p class="text-sm font-medium leading-6 text-gray-500">Visa</p>
            <p class="text-sm font-medium leading-6 text-gray-500">**73</p>
            <div
              class="flex justify-center items-center px-1 py-2 bg-violet-100 rounded border border-gray-300 border-solid shadow-xl">
              <img loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e53ea3231ba188441a6034265f4f0ada066f8bb4f5df5f996b3b263a866e52a9?apiKey=20497529553648aab918fa2d322ece87&"
                alt="Visa logo" class="w-6 aspect-[3.03] fill-blue-700" />
            </div>
          </div>
          <UiDropdownMenu v-if="true">
            <UiDropdownMenuTrigger class="w-fit flex items-center gap-2 mt-9">Credit
              <InfoIcon class="w-4 h-4 stroke-1" />
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="p-4">
              <article class="flex flex-col w-full max-w-[261px]">
                <header class="flex gap-4 justify-between w-full text-sm font-medium leading-6 text-neutral-800">
                  <h2>Credit Info</h2>
                  <SettingsIcon class="shrink-0 self-start w-5 aspect-square stroke-1.5" />
                </header>
                <section class="flex gap-5 justify-between mt-4 text-xs leading-5 text-gray-500 rounded-lg">
                  <div class="flex flex-col justify-center">
                    <h3>Credit Limit</h3>
                    <p class="mt-1 font-medium text-neutral-800">€ 10,000.00</p>
                    <h3 class="mt-4">Till Due</h3>
                    <p class="mt-1 font-medium text-neutral-800">42 Days</p>
                  </div>
                  <div class="flex flex-col justify-center">
                    <h3>Credit Term</h3>
                    <p class="mt-1 font-medium text-neutral-800">60 Days</p>
                    <h3 class="mt-4">Total Spent</h3>
                    <p class="mt-1 font-medium text-neutral-800">€ 7,561.23</p>
                  </div>
                  <div class="flex flex-col justify-center">
                    <h3>Due Date</h3>
                    <p class="mt-1 font-medium text-neutral-800">26 Sep 2023</p>
                    <h3 class="mt-4">Available</h3>
                    <p class="mt-1 font-medium text-red-500">€ 2,438.77</p>
                  </div>
                </section>
              </article>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
    </div>
    <UiSeparator />
    <div class="flex gap-9 max-md:flex-col max-md:gap-0">
      <div class="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <div class="flex flex-col grow max-md:mt-9 max-md:max-w-full">
          <h2 class="text-base font-semibold leading-7 text-neutral-700 max-md:max-w-full">
            Shipping Address
          </h2>
          <div class="flex gap-5 justify-between mt-9 w-full max-md:flex-wrap max-md:max-w-full">
            <h3 class="text-sm font-semibold leading-6 text-neutral-700">Address Alias 1</h3>
            <div
              class="flex gap-1 justify-center px-2 py-1 text-xs font-medium leading-4 text-emerald-500 whitespace-nowrap bg-white border border-emerald-500 border-solid rounded-[100px]">
              <img loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f56331855d63b16575002768f1107fd33b48669e6ae764671dbd605ad6de81dc?apiKey=20497529553648aab918fa2d322ece87&"
                alt="" class="shrink-0 w-4 aspect-square" />
              <span>Default</span>
            </div>
          </div>
          <p class="mt-2 text-sm font-medium leading-5 text-gray-500 max-md:max-w-full">
            5073 Mark Brown Rd
          </p>
          <p class="mt-2 text-sm font-medium leading-5 text-gray-500 max-md:max-w-full">
            NE Dalton, Georgia (GA)
          </p>
          <p class="mt-2 text-sm font-medium leading-5 text-gray-500 max-md:max-w-full">
            30721, United States
          </p>
        </div>
      </div>
      <div class="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <div class="flex flex-col px- text-sm font-medium leading-5 text-gray-500 max-md:mt-9 max-md:max-w-full">
          <h2 class="text-base font-semibold leading-7 text-neutral-700 max-md:max-w-full">
            Billing Address
          </h2>
          <p class="mt-9 max-md:max-w-full">5073 Mark Brown Rd</p>
          <p class="mt-2 max-md:max-w-full">NE Dalton, Georgia (GA)</p>
          <p class="mt-2 max-md:max-w-full">30721, United States</p>
        </div>
      </div>
    </div>
    <div v-if="stockItems.length > 0" class="flex flex-col gap-4">
      <UiBadge class="bg-green-600 text-white w-fit rounded-md h-7">Stock Order</UiBadge>
      <section class="flex flex-col gap-10 px-4 py-6 md:p-6 border border-gray-300 rounded-xl">
        <h2 class="text-sm font-semibold leading-6 text-neutral-700">Product Details</h2>
        <div class="flex flex-col gap-10">
          <div v-for="item in stockItems" :key="'stock-' + item.id"
            class="flex flex-col lg:flex-row gap-2 lg:gap-4 justify-between self-stretch">
            <div class="flex gap-3 mt-6 w-full lg:max-w-[412px]">
              <figure class="flex justify-center items-center rounded-lg border border-solid border-grey-300">
                <img :src="item.productEntity.details.ProductImage.ProductImageSmall" alt="Product image"
                  class="aspect-square min-w-[60px] lg:w-[72px] rounded-lg " />
              </figure>
              <div class="flex flex-col w-full max-w-[254px] md:max-w-none lg:max-w-[328px]">
                <div class="flex flex-col sm:flex-row gap-2">
                  <span class="text-sm font-medium leading-6 text-gray-500">Item:</span>
                  <div class="flex gap-5 justify-between">
                    <span class="text-sm font-medium leading-6 text-neutral-700">{{ item.productEntity.alias }}</span>
                    <span
                      class="justify-center px-2 my-auto text-xs font-semibold leading-5 text-red-500 bg-white rounded-3xl border border-red-500 border-solid">
                      {{ item.discount.value }} %
                    </span>
                  </div>
                </div>
                <div class="flex gap-2 text-sm font-medium leading-6 whitespace-nowrap">
                  <span class="text-gray-500">Description:</span>
                  <span class="text-ellipsis text-neutral-700 w-full lg:max-w-[328px] truncate">
                    {{ item.productEntity.description }}
                  </span>
                </div>
                <div class="flex gap-2 text-sm font-medium leading-6 whitespace-nowrap">
                  <span class="text-gray-500">Manufacturer:</span>
                  <span class="text-ellipsis text-neutral-700">{{ item.productEntity.manufacturer }}</span>
                </div>
              </div>
            </div>
            <template v-if="lgAndLarger">
              <div class="flex flex-col justify-center text-sm self-stretch px-6 py-4 leading-5">
                <p class="text-neutral-700">
                  <span class="font-semibold text-neutral-700">$</span><span class="text-neutral-700 line-through">
                    {{ item.initialUnitPrice.toFixed(2) }}
                  </span>
                </p>
                <p class="mt-1 text-red-500">
                  <span class="font-semibold text-red-500">$</span><span class="text-red-500"> {{
                    item.unitPriceAfterDiscounts.toFixed(2) }}</span>
                </p>
              </div>
              <div class="flex flex-col p-6 text-sm">
                <p class="font-semibold">{{ item.stock }}</p>
              </div>
              <div class="flex flex-col p-6 text-sm">
                <p><span class="font-semibold">$</span> {{ (item.stock * item.unitPriceAfterDiscounts).toFixed(2) }}</p>
              </div>
              <div class="flex flex-col p-6 text-sm">
                <p><span class="font-semibold">$</span> {{ (item.stock * item.unitPriceAfterDiscounts * 0.19).toFixed(2)
                }}</p>
              </div>
            </template>
            <template v-else>
              <section class="flex flex-col self-stretch pb-2 max-w-2xl text-sm">
                <article class="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                  <p class="my-auto leading-6 text-neutral-800">Unit Price</p>
                  <section class="flex flex-col leading-[143%]">
                    <p class="text-neutral-800 line-through">
                      <span class="leading-5 text-neutral-800">$</span><span class="leading-5">16.35</span>
                    </p>
                    <p class="font-medium text-red-500 ">
                      <span class="text-red-500">$</span><span> 15.19</span>
                    </p>
                  </section>
                </article>
                <article
                  class="flex gap-5 justify-between mt-1 w-full leading-6 whitespace-nowrap text-neutral-800 max-md:flex-wrap max-md:max-w-full">
                  <p>Quantity</p>
                  <p>8</p>
                </article>
                <article
                  class="flex gap-5 justify-between mt-1 w-full leading-6 text-neutral-800 max-md:flex-wrap max-md:max-w-full">
                  <p>Tax (VAT 19%)</p>
                  <p>$14.8</p>
                </article>
                <article
                  class="flex gap-5 justify-between mt-1 w-full leading-6 whitespace-nowrap text-neutral-800 max-md:flex-wrap max-md:max-w-full">
                  <p>Subtotal</p>
                  <p>$130.8</p>
                </article>
              </section>
            </template>
          </div>
        </div>
        <UiSeparator class="bg-light-500" />
        <div class="flex flex-col gap-4 w-full">
          <header class="w-full text-sm font-semibold leading-6 text-neutral-700">
            Stock Order Payment Summary
          </header>
          <section class="flex flex-col gap-2">
            <div class="flex gap-2 justify-between w-full text-sm font-medium leading-6">
              <div class="text-gray-500">Subtotal</div>
              <div class="text-neutral-700">$ 419.24</div>
            </div>
            <div class="flex gap-2 justify-between w-full text-sm leading-6">
              <div class="flex gap-5 justify-between whitespace-nowrap">
                <div class="font-medium text-gray-500">Discount</div>
                <div class="text-neutral-700">10%</div>
              </div>
              <div class="font-medium text-neutral-700">$ 41.924</div>
            </div>
            <div class="flex gap-5 text-sm leading-6">
              <div
                class="flex flex-col md:flex-row justify-between md:justify-start w-full gap-2 font-medium text-gray-500">
                <div class="flex gap-2">
                  Handling Charge
                  <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />
                </div>
                <div>Small order charge</div>
              </div>
              <div class="flex justify-end text-neutral-700 font-medium min-w-12 w-full">
                $ 5.49
              </div>
            </div>
            <div class="flex gap-5 text-sm leading-6">
              <div
                class="flex flex-col md:flex-row justify-between md:justify-start w-full gap-2 font-medium text-gray-500 whitespace-nowrap">
                <div class="flex gap-2">
                  Shipping
                  <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />
                </div>
                <div>Standard Delivery (3-5 Days)</div>
              </div>
              <div class="flex justify-end text-neutral-700 font-medium min-w-12 w-full">
                $ 7.49
              </div>
            </div>
            <div class="flex gap-2 justify-between w-full text-sm leading-6">
              <div class="flex gap-5 justify-between whitespace-nowrap">
                <div class="flex gap-2 font-medium text-gray-500">
                  <div>Tax:</div>
                  <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />

                </div>
                <div class="text-neutral-700">(19%)</div>
              </div>
              <div class="font-medium text-neutral-700">$ 38.68</div>
            </div>
            <UiSeparator class="bg-light-500" />
            <div class="flex gap-2 justify-between mt-2 w-full text-neutral-700">
              <div class="text-xl leading-9">Stock Order Total</div>
              <div class="text-2xl font-semibold leading-9">$ 457.92</div>
            </div>
          </section>
        </div>
      </section>

    </div>
    <div v-if="stockItems.length > 0" class="flex flex-col gap-4">
      <UiBadge class="bg-rose-500 text-white w-fit rounded-md h-7">Back Order</UiBadge>
      <section class="flex flex-col gap-10 px-4 py-6 md:p-6 border border-gray-300 rounded-xl">
        <h2 class="text-sm font-semibold leading-6 text-neutral-700">Product Details</h2>
        <div class="flex flex-col gap-10">
          <div v-for="item in backOrderItems" :key="'stock-' + item.id"
            class="flex flex-col lg:flex-row gap-2 lg:gap-4 justify-between self-stretch">
            <div class="flex gap-3 mt-6 w-full lg:max-w-[412px]">
              <figure class="flex justify-center items-center rounded-lg border border-solid border-grey-300">
                <img :src="item.productEntity.details.ProductImage.ProductImageSmall" alt="Product image"
                  class="aspect-square rounded-lg min-w-[60px] lg:w-[72px]" />
              </figure>
              <div class="flex flex-col w-full max-w-[254px] md:max-w-none lg:max-w-[328px]">
                <div class="flex flex-col sm:flex-row gap-2">
                  <span class="text-sm font-medium leading-6 text-gray-500">Item:</span>
                  <div class="flex gap-5 justify-between">
                    <span class="text-sm font-medium leading-6 text-neutral-700">{{ item.productEntity.alias }}</span>
                    <span
                      class="justify-center px-2 my-auto text-xs font-semibold leading-5 text-red-500 bg-white rounded-3xl border border-red-500 border-solid">
                      {{ item.discount.value }} %
                    </span>
                  </div>
                </div>
                <div class="flex gap-2 text-sm font-medium leading-6 whitespace-nowrap">
                  <span class="text-gray-500">Description:</span>
                  <span class="text-ellipsis text-neutral-700 w-full lg:max-w-[328px] truncate">
                    {{ item.productEntity.description }}
                  </span>
                </div>
                <div class="flex gap-2 text-sm font-medium leading-6 whitespace-nowrap">
                  <span class="text-gray-500">Manufacturer:</span>
                  <span class="text-ellipsis text-neutral-700">{{ item.productEntity.manufacturer }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-center text-sm self-stretch px-6 py-4 leading-5">
              <p class="text-neutral-700">
                <span class="font-semibold text-neutral-700">$</span><span class="text-neutral-700 line-through">
                  {{ item.initialUnitPrice.toFixed(2) }}
                </span>
              </p>
              <p class="mt-1 text-red-500">
                <span class="font-semibold text-red-500">$</span><span class="text-red-500"> {{
                  item.unitPriceAfterDiscounts.toFixed(2) }}</span>
              </p>
            </div>
            <div class="flex flex-col p-6 text-sm">
              <p class="font-semibold">{{ item.stock }}</p>
            </div>
            <div class="flex flex-col p-6 text-sm">
              <p><span class="font-semibold">$</span> {{ (item.stock * item.unitPriceAfterDiscounts).toFixed(2) }}</p>
            </div>
            <div class="flex flex-col p-6 text-sm">
              <p><span class="font-semibold">$</span> {{ (item.stock * item.unitPriceAfterDiscounts * 0.19).toFixed(2) }}
              </p> <!-- 19% tax calculation -->
            </div>
          </div>
        </div>
        <UiSeparator class="bg-light-500" />
        <div class="flex flex-col gap-4 w-full">
          <header class="w-full text-sm font-semibold leading-6 text-neutral-700">
            Stock Order Payment Summary
          </header>
          <section class="flex flex-col gap-2">
            <div class="flex gap-2 justify-between w-full text-sm font-medium leading-6">
              <div class="text-gray-500">Subtotal</div>
              <div class="text-neutral-700">$ 419.24</div>
            </div>
            <div class="flex gap-2 justify-between w-full text-sm leading-6">
              <div class="flex gap-5 justify-between whitespace-nowrap">
                <div class="font-medium text-gray-500">Discount</div>
                <div class="text-neutral-700">10%</div>
              </div>
              <div class="font-medium text-neutral-700">$ 41.924</div>
            </div>
            <div class="flex gap-5 text-sm leading-6">
              <div
                class="flex flex-col md:flex-row justify-between md:justify-start w-full gap-2 font-medium text-gray-500">
                <div class="flex gap-2">
                  Handling Charge
                  <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />
                </div>
                <div>Small order charge</div>
              </div>
              <div class="flex justify-end text-neutral-700 font-medium min-w-12 w-full">
                $ 5.49
              </div>
            </div>
            <div class="flex gap-5 text-sm leading-6">
              <div
                class="flex flex-col md:flex-row justify-between md:justify-start w-full gap-2 font-medium text-gray-500 whitespace-nowrap">
                <div class="flex gap-2">
                  Shipping
                  <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />
                </div>
                <div>Standard Delivery (3-5 Days)</div>
              </div>
              <div class="flex justify-end text-neutral-700 font-medium min-w-12 w-full">
                $ 7.49
              </div>
            </div>
            <div class="flex gap-2 justify-between w-full text-sm leading-6">
              <div class="flex gap-5 justify-between whitespace-nowrap">
                <div class="flex gap-2 font-medium text-gray-500">
                  <div>Tax:</div>
                  <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />

                </div>
                <div class="text-neutral-700">(19%)</div>
              </div>
              <div class="font-medium text-neutral-700">$ 38.68</div>
            </div>
            <UiSeparator class="bg-light-500" />
            <div class="flex gap-2 justify-between mt-2 w-full text-neutral-700">
              <div class="text-xl leading-9">Stock Order Total</div>
              <div class="text-2xl font-semibold leading-9">$ 457.92</div>
            </div>
          </section>
        </div>
      </section>

    </div>
    <section class="flex flex-col lg:flex-row gap-9">
      <div class="flex flex-col order-3 lg:order-1 w-full self-stretch text-sm leading-6 text-neutral-700">
        <h2 class="w-full font-semibold max-md:max-w-full">Customer Notes</h2>
        <textarea placeholder="Please deliver after 4PM and call me (0742624425) prior to delivery."
          class="min-h-[336px] justify-center px-3 pt-3 pb-16 mt-4 rounded-lg border border-solid bg-light-100 border-grey-300 max-md:pb-10 max-md:max-w-full" />
      </div>
      <div class="flex flex-col gap-4 w-full order-2">
        <header class="w-full text-sm font-semibold leading-6 text-neutral-700">
          Order Payment Summary
        </header>
        <section class="flex flex-col gap-2">
          <div class="flex gap-2 justify-between w-full text-sm font-medium leading-6">
            <div class="text-gray-500">Subtotal</div>
            <div class="text-neutral-700">${{ subtotal.toFixed(2) }}</div>
          </div>
          <div class="flex gap-2 justify-between w-full text-sm leading-6">
            <div class="flex gap-5 justify-between whitespace-nowrap">
              <div class="font-medium text-gray-500">Discount</div>
              <div class="text-neutral-700">{{ discountRate }}%</div>
            </div>
            <div class="font-medium text-neutral-700">${{ discount.toFixed(3) }}</div>
          </div>
          <div class="flex gap-5 text-sm leading-6">
            <div
              class="flex flex-col md:flex-row justify-between md:justify-start w-full gap-2 font-medium text-gray-500">
              <div class="flex gap-2">
                Handling Charge
                <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />
              </div>
              <div>Small order charge</div>
            </div>
            <div class="flex justify-end text-neutral-700 font-medium min-w-12 w-full">
              $ 5.49 <!-- This could be another computed property if variable -->
            </div>
          </div>
          <div class="flex gap-5 text-sm leading-6">
            <div
              class="flex flex-col md:flex-row justify-between md:justify-start w-full gap-2 font-medium text-gray-500 whitespace-nowrap">
              <div class="flex gap-2">
                Shipping
                <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />
              </div>
              <div>Standard Delivery (3-5 Days)</div>
            </div>
            <div class="flex justify-end text-neutral-700 font-medium min-w-12 w-full">
              ${{ shippingCost.toFixed(2) }}
            </div>
          </div>
          <div class="flex gap-2 justify-between w-full text-sm leading-6">
            <div class="flex gap-5 justify-between whitespace-nowrap">
              <div class="flex gap-2 font-medium text-gray-500">
                <div>Tax:</div>
                <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />
              </div>
              <div class="text-neutral-700">({{ taxRate }}%)</div>
            </div>
            <div class="font-medium text-neutral-700">${{ tax.toFixed(2) }}</div>
          </div>
          <div class="flex gap-2 justify-between w-full text-neutral-700">
            <div class="text-xl leading-9">Backorder Items Total</div>
            <div class="text-2xl font-semibold leading-9">${{ backorderItemsTotal.toFixed(2) }}</div>
          </div>
          <div class="flex gap-2 justify-between w-full text-neutral-700">
            <div class="text-xl leading-9">Stock Items Total</div>
            <div class="text-2xl font-semibold leading-9">${{ stockItemsTotal.toFixed(2) }}</div>
          </div>
          <UiSeparator class="bg-light-500" />
          <div class="flex gap-2 justify-between w-full text-neutral-700">
            <div class="text-xl leading-9">Order Total</div>
            <div class="text-2xl font-semibold leading-9">${{ orderTotal.toFixed(2) }}</div>
          </div>
          <div class="flex gap-2 justify-between w-full text-neutral-700">
            <div class="text-xl leading-9">Payable now</div>
            <div class="text-2xl font-semibold leading-9">${{ payableNow.toFixed(2) }}</div>
          </div>
        </section>
      </div>
    </section>

    <div class="flex flex-col gap-6">
      <h4 class="font-semibold text-sm">Need Help?</h4>
      <section class="flex gap-6">
        <UiButton class="gap-2 pl-0" variant="ghost">
          <TruckIcon class="w-5 h-5 stroke-1.5" />
          Delivery Info
        </UiButton>
        <UiButton class="gap-2 pl-0" variant="ghost">
          <Undo2Icon class="w-5 h-5 stroke-1.5" />
          Returns
        </UiButton>
        <UiButton class="gap-2 pl-0" variant="ghost">
          <PackageOpenIcon class="w-5 h-5 stroke-1.5" />
          Order Issues
      </UiButton>
    </section>
  </div>
</section></template>

<style scoped>
</style>
