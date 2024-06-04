<script setup lang="ts">
import { FileText, MapPin, BoxIcon, TruckIcon, Undo2Icon, PackageOpenIcon } from 'lucide-vue-next';
import { CartProductsInterface } from '~/types';

const route = useRoute()

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

const hasMixedItems = computed(() => {
  return data.find((item) => Number(item.stock) === 0)
})

</script>

<template>
  <section class="container px-4 py-6 md:p-6 flex flex-col gap-10">
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
          <UiButton
            variant="secondary"
            class="w-[114px] md:w-full lg:w-fit flex gap-2 justify-center px-6 py-2 text-slate-500 rounded-lg bg-zinc-100 max-md:px-5">
            <FileText class="shrink-0 w-6 aspect-square stroke-[1.5]" />
            <span class="hidden lg:inline">View</span> Invoices
          </UiButton>
          <UiButton
            variant="secondary"
            class="w-[114px] md:w-full lg:w-fit flex gap-2 justify-center px-6 py-2 text-slate-500 rounded-lg bg-zinc-100 max-md:px-5">
            <MapPin class="shrink-0 w-6 aspect-square stroke-[1.5]" />
            Track <span class="hidden lg:inline">Order</span>
          </UiButton>
          <UiButton
            variant="secondary"
            class="w-[114px] md:w-full lg:w-fit flex gap-2 justify-center px-6 py-2 text-slate-500 rounded-lg bg-zinc-100 max-md:px-5">
            <BoxIcon class="shrink-0 w-6 aspect-square stroke-[1.5]" />
            View All <span class="hidden lg:inline">Orders</span>
          </UiButton>
        </div>
        <div
          class="flex items-center flex-wrap gap-3 order-1 lg:order-2 pr-20 mt-3 lg:mt-0 text-sm font-medium leading-6 max-md:flex-wrap max-md:pr-5">
          <div class="flex gap-2">
            <div class="text-slate-500">Order Date:</div>
            <div class="text-neutral-700">21 September 2023, 18:25</div>
          </div>
          <UiSeparator class="hidden lg:block h-4" orientation="vertical" />
          <div class="flex gap-2">
            <div class="text-slate-500">Shipping Method:</div>
            <div class=" text-neutral-700">3-5 Business Days</div>
          </div>
        </div>
      </div>
    </div>
    <OrderConfirmDetails />
    <UiSeparator />
    <OrderConfirmAddress />
    <OrderConfirmStackItems :data="data" />
    <OrderConfirmBackItems :data="data" />
    <section class="flex flex-col lg:flex-row gap-9">
      <div class="flex flex-col order-3 lg:order-1 w-full self-stretch text-sm leading-6 text-neutral-700">
        <h2 class="w-full font-semibold max-md:max-w-full">Customer Notes</h2>
        <textarea
placeholder="Please deliver after 4PM and call me (0742624425) prior to delivery."
          class="min-h-[336px] justify-center px-3 pt-3 pb-16 mt-4 rounded-lg border border-solid bg-light-100 border-grey-300 max-md:pb-10 max-md:max-w-full" />
      </div>
      <OrderConfirmPaySummary v-if="hasMixedItems" />
    </section>

    <div class="flex flex-col gap-6">
      <h4 class="font-semibold text-sm">Need Help?</h4>
      <section class="flex gap-6 flex-wrap">
        <UiButton size="xs" class="gap-2 px-0" variant="ghost">
          <TruckIcon class="w-5 h-5 stroke-1.5" />
          Delivery Info
        </UiButton>
        <UiButton size="xs" class="gap-2 px-0" variant="ghost">
          <Undo2Icon class="w-5 h-5 stroke-1.5" />
          Returns
        </UiButton>
        <UiButton size="xs" class="gap-2 px-0" variant="ghost">
          <PackageOpenIcon class="w-5 h-5 stroke-1.5" />
          Order Issues
        </UiButton>
      </section>
    </div>
  </section>
</template>

<style scoped>
</style>
