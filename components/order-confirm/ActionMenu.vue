<script setup lang="ts">
import { DotsVerticalIcon } from '@radix-icons/vue';
import { CheckCircle, MapPin, PackageCheck } from 'lucide-vue-next';

import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
    dob: z.date({
      required_error: 'A date of birth is required.',
    }),
  })
);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

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
    <UiPopoverContent class="w-fit flex flex-col gap-2 p-2 border-none" align="end">
      <UiButton class="hover:text-blue-500 justify-start gap-2 min-w-[164px]" variant="ghost" size="sm">
        <PackageCheck class="mr-1 object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
        Fulfill Order
      </UiButton>
      <UiButton class="hover:text-blue-500 justify-start gap-2 min-w-[164px]" variant="ghost" size="sm"
        @click="isOpen = true">
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
    <UiDialogContent class="border-none shadow-s rounded-xl">
      <section data-layername="property1Desktop"
        class="flex flex-col gap-10 bg-white rounded-xl shadow-sm max-w-[480px]">
        <header class="flex gap-10 justify-between items-center w-full">
          <h2 data-layername="markAsPaid" class="self-stretch my-auto text-base font-semibold leading-7 text-zinc-800">
            Mark as Paid
          </h2>
        </header>
        <form class="flex flex-col gap-4 w-full text-sm" @submit.prevent="handleSubmit">
          <div class="flex gap-3 items-start w-full">
            <FormField class="flex flex-col" name="amount">
              <div class="flex flex-col w-full">
                <FormLabel for="amountPaid" class="leading-none text-slate-500">Amount Paid</FormLabel>
                <FormControl>
                  <UiInput class="mt-2.5 h-10 border border-grey-300" id="amountPaid" v-model="amountPaid" type="number"
                    placeholder="Amount Paid" />
                </FormControl>
              </div>
              <FormMessage />
            </FormField>
            <FormField name="currency">
              <FormItem class="relative">
                <FormLabel for="currency" data-layername="dropDownField" class="leading-none text-slate-500">
                  Currency
                </FormLabel>
                <UiSelect>
                  <FormControl>
                    <UiSelectTrigger class="border-grey-300 border">
                      <UISelectValue class="min-w-[125px]" placeholder="Currency" />
                    </UiSelectTrigger>
                  </FormControl>
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectItem value="usd">USD</UiSelectItem>
                      <UiSelectItem value="eur">EUR</UiSelectItem>
                      <UiSelectItem value="ron">RON</UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
              </FormItem>
            </FormField>
          </div>
          <FormField v-slot="{ componentField, value }" name="dob">
            <FormItem class="flex flex-col gap-2">
              <FormLabel class="text-slate-500">Payment Date</FormLabel>
              <UiPopover>
                <UiPopoverTrigger as-child>
                  <FormControl>
                    <UiButton variant="outline" :class="cn(
                      'ps-3 text-start font-normal border-grey-300',
                      !value && 'text-muted-foreground',
                    )">
                      <span>{{ value ? format(value, "PPP") : "Pick a date" }}</span>
                      <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                    </UiButton>
                  </FormControl>
                </UiPopoverTrigger>
                <UiPopoverContent class="p-0">
                  <UiCalendar v-bind="componentField" />
                </UiPopoverContent>
              </UiPopover>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="reference" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>Payment Reference</FormLabel>
              <FormControl>
                <UiInput type="text" placeholder="Payment Reference" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="comments">
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <UiTextarea placeholder="Comments..." class="resize-none min-h-32 border-grey-300"
                  v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <div
            class="flex gap-4 items-center mt-10 w-full text-base font-medium leading-7 text-white whitespace-nowrap">
            <UiButton class="h-12 w-full">Submit</UiButton>
          </div>
        </form>
      </section>
    </UiDialogContent>
  </UiDialog>
</template>

<style scoped></style>
