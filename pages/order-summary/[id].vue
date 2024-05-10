<script setup lang="ts">
import { FileText, MapPin, BoxIcon, InfoIcon, TruckIcon, Undo2Icon, PackageOpenIcon, SettingsIcon } from 'lucide-vue-next';

const route = useRoute()
console.log(route.params.id);

</script>

<template>
  <section class="container p-6 flex flex-col gap-10">
    <div class="flex flex-col self-stretch">
      <div class="flex gap-2.5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <div class="flex gap-5 justify-between my-auto">
          <h1 class="text-2xl font-semibold leading-8 text-neutral-700">
            Order ID: <span class="text-blue-500">#{{ route.params.id }}</span>
          </h1>
          <UiBadge class="justify-center px-2 py-1 my-auto text-sm font-medium leading-5 text-white bg-blue-500 rounded">
            Mixed Order
          </UiBadge>
        </div>
        <div class="flex gap-4 text-sm font-medium leading-6 text-white max-md:flex-wrap">
          <UiButton class="flex gap-2 justify-center px-6 py-2 text-gray-500 rounded-lg bg-zinc-100 max-md:px-5">
            <FileText class="shrink-0 w-6 aspect-square stroke-[1.5]" />
            <div>View Invoices</div>
          </UiButton>
          <UiButton class="flex gap-2 justify-center px-6 py-2 bg-blue-500 rounded-lg max-md:px-5">
            <MapPin class="shrink-0 w-6 aspect-square stroke-[1.5]" />
            <div>Track Order</div>
          </UiButton>
          <UiButton class="flex gap-2 justify-center px-6 py-2 bg-blue-500 rounded-lg max-md:px-5">
            <BoxIcon class="shrink-0 w-6 aspect-square stroke-[1.5]" />
            <div>View All Orders</div>
          </UiButton>
        </div>
      </div>
      <div class="flex gap-3 pr-20 mt-4 text-sm font-medium leading-6 max-md:flex-wrap max-md:pr-5">
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
    <UiSeparator />
    <div class="flex gap-9 max-md:flex-col max-md:gap-0">
      <div class="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <div class="flex flex-col grow text-sm font-semibold leading-5 text-zinc-800 max-md:mt-9 max-md:max-w-full">
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
          <h2 class="text-base font-semibold leading-7 text-zinc-800 max-md:max-w-full">
            Payment Method
          </h2>
          <div v-if="false" class="flex gap-2 self-start pr-8 mt-9 max-md:pr-5">
            <p class="text-sm font-medium leading-6 text-gray-500">Visa</p>
            <p class="text-sm font-medium leading-6 text-gray-500">**73</p>
            <div
              class="flex justify-center items-center px-1 py-2 bg-violet-100 rounded border border-gray-300 border-solid shadow-xl">
              <img
loading="lazy"
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
    <div class="flex gap-9 max-md:flex-col max-md:gap-0">
      <div class="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <div class="flex flex-col grow max-md:mt-9 max-md:max-w-full">
          <h2 class="text-base font-semibold leading-7 text-zinc-800 max-md:max-w-full">
            Shipping Address
          </h2>
          <div class="flex gap-5 justify-between mt-9 w-full max-md:flex-wrap max-md:max-w-full">
            <h3 class="text-sm font-semibold leading-6 text-zinc-800">Address Alias 1</h3>
            <div
              class="flex gap-1 justify-center px-2 py-1 text-xs font-medium leading-4 text-emerald-500 whitespace-nowrap bg-white border border-emerald-500 border-solid rounded-[100px]">
              <img
loading="lazy"
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
          <h2 class="text-base font-semibold leading-7 text-zinc-800 max-md:max-w-full">
            Billing Address
          </h2>
          <p class="mt-9 max-md:max-w-full">5073 Mark Brown Rd</p>
          <p class="mt-2 max-md:max-w-full">NE Dalton, Georgia (GA)</p>
          <p class="mt-2 max-md:max-w-full">30721, United States</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <UiBadge size="xs" class="bg-green-600 text-white w-fit rounded-md">Stock Order</UiBadge>
      <section class="flex flex-col gap-10 p-6 border border-gray-300 rounded-xl">
        <div class="flex flex-col gap-10">
          <div class="flex gap-4 justify-between self-stretch max-md:flex-wrap">
            <h2 class="text-sm font-semibold leading-6 text-zinc-800 flex-grow w-full min-w-[412px]">Product Details</h2>
            <h2 class="text-end font-semibold text-zinc-800 w-full">Unit Price</h2>
            <h2 class="text-end font-semibold text-zinc-800 w-full">Quantity</h2>
            <h2 class="text-end font-semibold w-full">Tax (19%)</h2>
            <h2 class="text-end font-semibold w-full px-5">Subtotal</h2>
          </div>
          <div class="flex gap-4 justify-between self-stretch max-md:flex-wrap">
            <div class="flex gap-3 mt-6  w-full max-w-[412px]">
              <figure class="flex justify-center items-center rounded-lg border border-solid border-neutral-300">
                <img
loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f0e317f0dfbab4d69127f5afa8253c7f20a68253647a4fe1593dde48544e9eb?apiKey=20497529553648aab918fa2d322ece87&"
                  alt="Product image" class="aspect-square w-[72px]" />
              </figure>
              <div class="flex flex-col  w-full max-w-[328px]">
                <div class="flex gap-2">
                  <span class="text-sm font-medium leading-6 text-gray-500">Item:</span>
                  <div class="flex gap-5 justify-between">
                    <span class="text-sm font-medium leading-6 text-zinc-800 ">RSCSK3343R3D02008T</span>
                    <span
                      class="justify-center px-2 my-auto text-xs font-semibold leading-5 text-red-500 bg-white rounded-3xl border border-red-500 border-solid">
                      5 %
                    </span>
                  </div>
                </div>
                <div class="flex gap-2 text-sm font-medium leading-6 whitespace-nowrap">
                  <span class="text-gray-500">Description:</span>
                  <span class="text-ellipsis text-zinc-800 w-full max-w-[328px] truncate">
                    Diode: rectifying; SMD; 100V; 0.15A; 4ns; SOD323; Ufmax: 1.2V; 200mW
                  </span>
                </div>
                <div class="flex gap-2 text-sm font-medium leading-6 whitespace-nowrap">
                  <span class="text-gray-500">Manufacturer:</span>
                  <span class="text-ellipsis text-zinc-800">Texas Instruments</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-center text-sm self-stretch px-6 py-4 leading-5 max-md:px-5">
              <p class="text-zinc-800">
                <span class="font-semibold text-zinc-800">$</span><span class="text-zinc-800 line-through"> 16.35</span>
              </p>
              <p class="mt-1 text-red-500">
                <span class="font-semibold text-red-500">$</span><span class="text-red-500"> 15.19</span>
              </p>
            </div>
            <div class="flex flex-col p-6 max-md:px-5 text-sm ">
              <p class="font-semibold">16</p>
            </div>
            <div class="flex flex-col p-6 max-md:px-5 text-sm ">
              <p><span class="font-semibold">$</span> 11.46</p>
            </div>
            <div class="flex flex-col p-6 max-md:px-5 text-sm ">
              <p><span class="font-semibold">$</span> 60.32</p>
            </div>
          </div>
        </div>
        <UiSeparator />
        <div class="flex justify-end w-full">
          <div class="flex flex-col gap-4 max-w-[480px] w-full">
            <header class="w-full text-sm font-semibold leading-6 text-zinc-800">
              Payment Summary
            </header>
            <section class="flex flex-col gap-2">
              <div class="flex gap-2 justify-between pr-5 w-full text-sm font-medium leading-6">
                <div class="text-gray-500">Subtotal</div>
                <div class="text-zinc-800">$ 419.24</div>
              </div>
              <div class="flex gap-2 justify-between pr-5 w-full text-sm leading-6">
                <div class="flex gap-5 justify-between whitespace-nowrap">
                  <div class="font-medium text-gray-500">Discount</div>
                  <div class="text-zinc-800">10%</div>
                </div>
                <div class="font-medium text-zinc-800">$ 41.924</div>
              </div>
              <div class="flex gap-5 text-sm leading-6">
                <div class="flex gap-2 font-medium text-gray-500">
                  <div>Handling Charge</div>
                  <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />
                </div>
                <div class="flex flex-1 gap-5 justify-between pr-5 text-zinc-800">
                  <div>Small order charge</div>
                  <div class="font-medium">$ 5.49</div>
                </div>
              </div>
              <div class="flex gap-5 text-sm leading-6">
                <div class="flex gap-2 font-medium text-gray-500 whitespace-nowrap">
                  <div>Shipping</div>
                  <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />

                </div>
                <div class="flex flex-1 gap-5 justify-between pr-5 text-zinc-800">
                  <div>Standard Delivery (3-5 Days)</div>
                  <div class="font-medium">$ 7.49</div>
                </div>
              </div>
              <div class="flex gap-2 justify-between pr-5 w-full text-sm leading-6">
                <div class="flex gap-5 justify-between whitespace-nowrap">
                  <div class="flex gap-2 font-medium text-gray-500">
                    <div>Tax:</div>
                    <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />

                  </div>
                  <div class="text-zinc-800">(19%)</div>
                </div>
                <div class="font-medium text-zinc-800">$ 38.68</div>
              </div>
              <UiSeparator class="bg-light-500" />
              <div class="flex gap-2 justify-between pr-5 mt-2 w-full text-zinc-800">
                <div class="text-xl leading-9">Stock Order Total</div>
                <div class="text-2xl font-semibold leading-9">$ 457.92</div>
              </div>
            </section>
          </div>
        </div>

      </section>

    </div>
    <div class="flex flex-col self-stretch text-sm leading-6 text-zinc-800">
      <h2 class="w-full font-semibold max-md:max-w-full">Customer Notes</h2>
      <textarea
placeholder="Please deliver after 4PM and call me (0742624425) prior to delivery."
        class="justify-center px-3 pt-3 pb-16 mt-4 rounded-lg border border-solid bg-light-100 border-grey-300 min-h-[204px] max-md:pb-10 max-md:max-w-full" />

    </div>
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
  </section>
</template>

<style scoped>
</style>
