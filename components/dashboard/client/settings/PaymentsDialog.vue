<script setup lang="ts">
import { PlusCircleIcon, Building2Icon, PhoneIcon, CreditCardIcon, CalendarDaysIcon } from 'lucide-vue-next';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { countries } from '@/data/countries';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface Country {
  label: string;
  value: string;
  icon: string;
  regions: {
    name: string;
    shortCode: string;
  }[];
}

const formSchema = toTypedSchema(z.object({
  phoneNumber: z.string().min(1, 'Phone Number is required').regex(/^\+?\d{1,4}?\s?-?\(?\d{1,3}?\)?\s?-?\d{1,4}\s?-?\d{1,4}\s?-?\d{1,9}$/, 'Invalid phone number'),
  cardNumber: z.string().min(16, 'Card Number is required').max(16, 'Card Number should be 16 digits'),
  expiryDate: z.string().min(1, 'Expiry Date is required'),
  cvv: z.string().min(3, 'CVV is required').max(4, 'CVV should be 3 or 4 digits'),
}));

const { handleSubmit, values } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  console.log({
    title: 'You submitted the following values:',
    description: JSON.stringify(values, null, 2),
  });
});

const country = ref<undefined | Country>(undefined);

const isOpen = ref(false);
</script>

<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogTrigger as-child>
      <UiButton class="rounded-full" size="icon" variant="ghost">
        <PlusCircleIcon class="aspect-square w-10 h-10 stroke-1 text-blue-500" />
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="max-w-[350px] sm:max-w-[480px] rounded-xl">
      <UiDialogHeader>
        <UiDialogTitle>Add New Card</UiDialogTitle>
      </UiDialogHeader>
      <section class="flex flex-col self-stretch bg-white rounded-xl shadow-sm max-md:px-5 max-h-[85vh] overflow-y-auto">
        <form class="mt-5 flex flex-col gap-y-6 gap-x-9" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="phoneNumber">
            <FormItem>
              <FormLabel>Contact Phone number</FormLabel>
              <FormControl>
                <div class="relative">
                  <input v-model="values.phoneNumber" type="tel" placeholder="+1 (555) 867-5309" class="mt-1 block w-full pr-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-bind="componentField"/>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="cardNumber">
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <div class="relative">
                  <input v-model="values.cardNumber" type="text" placeholder="0000-0000-0000-0000" class="mt-1 block w-full pr-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-bind="componentField"/>
                  <div class="absolute inset-y-0 right-3 pl-3 flex items-center pointer-events-none">
                    <CreditCardIcon class="h-5 w-5 text-gray-400"/>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <div class="flex flex-col md:flex-row gap-4 mb-4">
            <FormField v-slot="{ componentField }" name="expiryDate">
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <div class="relative">
                    <input v-model="values.expiryDate" type="text" placeholder="MM/YY" class="mt-1 block w-full pr-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-bind="componentField"/>
                    <div class="absolute inset-y-0 right-3 pl-3 flex items-center pointer-events-none">
                      <CalendarDaysIcon class="h-5 w-5 text-gray-400"/>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="cvv">
              <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <div class="relative">
                    <input v-model="values.cvv" type="text" placeholder="123" class="mt-1 block w-full pr-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-bind="componentField"/>
                    <div class="absolute inset-y-0 right-3 pl-3 flex items-center pointer-events-none">
                      <CreditCardIcon class="h-5 w-5 text-gray-400"/>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div class="flex justify-end gap-4 col-span-2 sticky bottom-0 bg-white pt-2">
            <UiButton @click="isOpen = !isOpen" variant="secondary" type="reset">
              Cancel
            </UiButton>
            <UiButton type="submit" class="w-60">
              Continue
            </UiButton>
          </div>
        </form>
      </section>
    </UiDialogContent>
  </UiDialog>
</template>

<style scoped lang="postcss">
label {
  @apply text-slate-500;
}
</style>
