<script setup lang="ts">
import { PlusCircleIcon, Building2Icon } from 'lucide-vue-next';

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
  addressAlias: z.string().min(1, 'Address Alias is required'),
  country: z.string().min(1, 'Country is required'),
  county: z.string().min(1, 'County/Region is required'),
  addressLine1: z.string().min(1, 'Address Line 1 is required'),
  addressLine2: z.string().optional(),
  postcode: z.string().min(1, 'Postcode is required'),
  phoneNumber: z.string().min(1, 'Phone Number is required').regex(/^\+?\d{1,4}?\s?-?\(?\d{1,3}?\)?\s?-?\d{1,4}\s?-?\d{1,4}\s?-?\d{1,9}$/, 'Invalid phone number'),
  companyEmail: z.string().min(1, 'Company Email is required').email('Invalid email address'),
}));

const { handleSubmit, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    country: '',
  },
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
    <UiDialogContent class="sm:max-w-[640px]">
      <UiDialogHeader>
        <UiDialogTitle>Add Shipping Address</UiDialogTitle>
      </UiDialogHeader>
      <section class="flex flex-col self-stretch bg-white rounded-xl shadow-sm max-md:px-5 max-h-[85vh] overflow-y-auto">
        <form class="mt-5 flex flex-col gap-y-6 gap-x-9" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="addressAlias">
            <FormItem>
              <FormLabel>Address Alias</FormLabel>
              <FormControl>
                <section class="flex items-center">
                  <div class="flex items-center justify-center w-11 h-11 rounded-l-lg bg-stone-50 border border-grey-300">
                    <Building2Icon class="w-5 h-5" />
                  </div>
                  <UiInput class="rounded-l-[0px] border-l-0" type="text" placeholder="Address Alias 1" v-bind="componentField" />
                </section>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <section class="flex  justify-between gap-6">
            <FormField name="country">
          <FormItem class="flex flex-col w-full">
            <FormControl>
              <FormSelect
                v-model="country"
                :options="countries"
                :show-disabled-styles="false"
                label="Country"
                placeholder="United States"
                search
                size="lg"
                class="relative z-20"
            />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
            <FormField v-slot="{ componentField }" name="county">
              <FormItem class="w-full">
                <FormLabel>County/Region</FormLabel>
                <FormControl>
                  <UiInput type="text" placeholder="County/Region" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </section>
          <FormField v-slot="{ componentField }" name="addressLine1">
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <UiInput type="text" placeholder="Address Line 1" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="addressLine2">
            <FormItem>
              <FormLabel>Address Line 2</FormLabel>
              <FormControl>
                <UiInput type="text" placeholder="Address Line 2" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="postcode">
            <FormItem>
              <FormLabel>Postcode</FormLabel>
              <FormControl>
                <UiInput type="text" placeholder="Postcode" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="phoneNumber">
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <UiInput type="tel" placeholder="+1 (555) 867-5309" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="companyEmail">
            <FormItem>
              <FormLabel>Company Email</FormLabel>
              <FormControl>
                <UiInput type="email" placeholder="youremail@company.com" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex justify-end gap-4 col-span-2 sticky bottom-0 bg-white pt-2">
            <UiButton @click="isOpen = !isOpen" variant="secondary" type="reset">
              Cancel
            </UiButton>
            <UiButton type="submit" class="w-60">
              Save
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
