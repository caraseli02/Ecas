<script setup lang="ts">
import { DotsVerticalIcon } from '@radix-icons/vue';
import { MapPin, CheckCircle, PackageCheck } from 'lucide-vue-next';

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const isOpen = ref(true);

const amountPaid = ref('');
const currency = ref('');
const paymentDate = ref('');
const paymentReference = ref('');
const comments = ref('');

// const handleSubmit = () => {
//   console.log('Form submitted', {
//     amountPaid: amountPaid.value,
//     currency: currency.value,
//     paymentDate: paymentDate.value,
//     paymentReference: paymentReference.value,
//     comments: comments.value,
//   });
// };

defineEmits(['close']);
</script>

<template>
  <UiPopover>
    <UiPopoverTrigger>
      <UiButton variant="ghost" size="icon"
        class="flex overflow-hidden justify-center items-center self-stretch p-1 my-auto w-8 h-8 rounded-md bg-zinc-100"
        aria-label="Additional options">
        <DotsVerticalIcon alt="" class="object-contain self-stretch my-auto w-6 aspect-square" />
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-fit flex flex-col gap-2 p-2" align="end">
      <UiButton class="hover:text-blue-500 justify-start gap-2 min-w-[164px]" variant="ghost" size="sm">
        <PackageCheck class="mr-1 object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
        Fulfill Order
      </UiButton>
      <UiButton @click="isOpen = true" class="hover:text-blue-500 justify-start gap-2 min-w-[164px]" variant="ghost"
        size="sm">
        <CheckCircle class="mr-1 object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
        Mark as Paid
      </UiButton>
      <UiButton class="hover:text-blue-500 justify-start gap-2 min-w-[164px]" variant="ghost" size="sm">
        <MapPin class="mr-1 object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
        Track Order
      </UiButton>
    </UiPopoverContent>
  </UiPopover>
  <UiDialog v-model:open="isOpen">
    <UiDialogContent>
      <section data-layername="property1Desktop"
        class="flex flex-col gap-10 bg-white rounded-xl shadow-sm max-w-[480px]">
        <header class="flex gap-10 justify-between items-center w-full">
          <h2 data-layername="markAsPaid" class="self-stretch my-auto text-base font-semibold leading-7 text-zinc-800">
            Mark as Paid
          </h2>
        </header>
        <form class="flex flex-col mt-10 w-full text-sm" @submit.prevent="handleSubmit">
          <div class="flex gap-3 items-start w-full">
            <FormField class="flex" name="amount">
              <FormLabel for="amountPaid" class="leading-none text-gray-500">Amount Paid</FormLabel>
              <FormControl>
                <UiInput id="amountPaid" v-model="amountPaid" type="number" placeholder="Amount Paid" />
              </FormControl>
              <FormMessage />
            </FormField>
            <FormField name="currency">
              <FormItem class="relative">
                <FormLabel for="currency" data-layername="dropDownField" class="leading-none text-gray-500">
                  Currency
                </FormLabel>
                <UiSelect>
                  <FormControl>
                    <UiSelectTrigger>
                      <UISelectValue placeholder="Currency" />
                    </UiSelectTrigger>
                  </FormControl>
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectItem value="usd">USD</UiSelectItem>
                      <UiSelectItem value="eur">EUR</UiSelectItem>
                      <UiSelectItem value="ron">ron</UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
              </FormItem>
            </FormField>
          </div>
          <div data-layername="dropDown" class="flex flex-col mt-4 w-full">
            <label for="paymentDate" data-layername="dropDownDate" class="leading-none text-gray-500">Payment
              Date</label>
            <div class="relative">
              <input id="paymentDate" v-model="paymentDate" type="date" data-layername="48DateTitle"
                class="flex overflow-hidden gap-10 justify-between items-center px-3 py-2 mt-1 w-full leading-7 bg-white rounded-lg border border-solid border-neutral-300 text-neutral-400" />
              <img loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/dded5c48c60c50e2e0386a3b0e6f55055d256ab8c09147d1ae4ae2af0c56a6a3?placeholderIfAbsent=true&apiKey=20497529553648aab918fa2d322ece87"
                alt=""
                class="object-contain shrink-0 absolute right-3 top-1/2 transform -translate-y-1/2 w-5 aspect-square pointer-events-none" />
            </div>
          </div>
          <div data-layername="textField" class="flex flex-col justify-center mt-4 w-full">
            <label for="paymentReference" class="leading-none text-gray-500">Payment Reference</label>
            <input id="paymentReference" v-model="paymentReference" type="text" data-layername="48Title"
              class="overflow-hidden gap-10 self-stretch px-3 py-2 mt-1 w-full leading-7 bg-white rounded-lg border border-solid border-neutral-300 text-neutral-400"
              placeholder="Payment Reference" />
          </div>
          <div class="flex flex-col mt-4 w-full">
            <label for="comments" data-layername="commentsOptional" class="leading-none text-gray-500">
              Comments <span class="text-xs">(Optional)</span>
            </label>
            <textarea id="comments" v-model="comments" data-layername="comments"
              class="overflow-hidden gap-2 p-3 pb-16 mt-1 w-full leading-6 rounded-lg border border-solid bg-stone-50 border-neutral-200 min-h-[120px] text-stone-300"
              placeholder="Comments..."></textarea>
          </div>
          <div
            class="flex gap-4 items-center mt-10 w-full text-base font-medium leading-7 text-white whitespace-nowrap">
            <button type="submit" data-layername="button"
              class="flex overflow-hidden flex-1 shrink justify-center items-center self-stretch px-6 py-0 my-auto w-full bg-sky-500 rounded-lg basis-0 min-w-[240px]">
              <span data-layername="settings" class="self-stretch p-2 my-auto">Submit</span>
            </button>
          </div>
        </form>
      </section>
    </UiDialogContent>
  </UiDialog>
</template>

<style scoped></style>
