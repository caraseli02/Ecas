<script setup lang="ts">
import { FilePenLineIcon, CopyIcon } from 'lucide-vue-next';
import { ref, watch, h } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { countries } from '@/data/countries';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

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
  companyName: z.string({
    required_error: 'Company Name is required',
  }).min(1),
  registrationNumber: z.string({
    required_error: 'Company Registration Number is required',
  }).min(1),
  taxId: z.string({
    required_error: 'Tax ID is required',
  }).min(1),
  vatNumber: z.string({
    required_error: 'V.A.T Number is required',
  }).min(1),
  country: z.string({
    required_error: 'Country is required',
  }).min(1),
  county: z.string({
    required_error: 'County/Region is required',
  }).min(1),
  city: z.string({
    required_error: 'City is required',
  }).min(1),
  addressLine1: z.string({
    required_error: 'Address Line 1 is required',
  }).min(1),
  addressLine2: z.string().optional(),
  postcode: z.string({
    required_error: 'Postcode is required',
  }).min(1),
  phoneNumber: z.string({
    required_error: 'Phone Number is required',
  }).min(1).regex(/^\+?\d{1,4}?\s?-?\(?\d{1,3}?\)?\s?-?\d{1,4}\s?-?\d{1,4}\s?-?\d{1,9}$/, 'Invalid phone number'),
  mobileNumber: z.string({
    required_error: 'Mobile Number is required',
  }).min(1).regex(/^\+?\d{1,4}?\s?-?\(?\d{1,3}?\)?\s?-?\d{1,4}\s?-?\d{1,4}\s?-?\d{1,9}$/, 'Invalid mobile number'),
  bankName: z.string({
    required_error: 'Bank Name is required',
  }).min(1),
  iban: z.string({
    required_error: 'IBAN is required',
  }).min(1).regex(/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/, 'Invalid IBAN'),
  companyEmail: z.string({
    required_error: 'Company Email is required',
  }).email('Invalid email address'),
}));

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    country: '',
  },
});

const onSubmit = handleSubmit((values) => {
  console.log({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  });
});

const openEdit = ref(false);
const country = ref<undefined | Country>(undefined);

// Watch for changes to the country and update values.country
watch(country, (newCountry) => {
  if (newCountry) {
    setFieldValue('country', newCountry.value);
    console.log(newCountry, values.country);
  }
});

</script>

<template>
  <div class="bg-white shadow-l rounded-xl">
    <section class="flex flex-col self-stretch p-4 md:p-6 bg-white rounded-xl shadow-sm">
      <header class="flex flex-col md:flex-row gap-2.5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <h2 class="self-start text-xl font-semibold leading-7 text-neutral-700">Company Details</h2>
        <div class="flex flex-col md:flex-row gap-3 text-sm font-medium leading-6 text-gray-500">
          <UiButton
:class="openEdit ? 'text-white' : 'text-slate-500'" :variant="openEdit ? 'default' : 'secondary'"
            @click="openEdit = !openEdit">
            <FilePenLineIcon class="w-5 h-5 stroke-1.5 mr-2" /> <span>Edit</span>
          </UiButton>
          <UiButton class="text-slate-500" variant="secondary">
            <CopyIcon class="w-5 h-5 stroke-1.5 mr-2" /> <span>Copy Details</span>
          </UiButton>
        </div>
      </header>
      <form class="mt-9 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-9" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="companyName">
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Company Name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="registrationNumber">
          <FormItem>
            <FormLabel>Company Registration Number</FormLabel>
            <FormControl>
              <Input type="text" placeholder="ABC123456" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="taxId">
          <FormItem>
            <FormLabel>Tax ID</FormLabel>
            <FormControl>
              <Input type="text" placeholder="ABC123456" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="vatNumber">
          <FormItem>
            <FormLabel>V.A.T Number</FormLabel>
            <FormControl>
              <Input type="text" placeholder="ABC123456" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="country">
          <FormItem class="flex flex-col">
            <FormControl>
              <FormSelect
                v-model="country"
                :disabled="openEdit"
                :options="countries"
                :show-disabled-styles="false"
                label="Country"
                placeholder="United States"
                search
                size="lg"
                class="relative z-20"
            />
            </FormControl>
            <!-- <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
variant="outline" role="combobox"
                    :class="cn('w-[200px] justify-between', !values.country && 'text-muted-foreground')">
                    {{ values.country ? countries.find(
                      (country) => country.value === values.country,
                    )?.label : 'Select country...' }}
                    <ChevronUp class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search country..." />
                  <CommandEmpty>Nothing found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
v-for="country in countries" :key="country.value" :value="country.label" @select="() => {
                        setFieldValue('country', country.value)
                      }">
                        {{ country.label }}
                        <CheckIcon
                          :class="cn('ml-auto h-4 w-4', country.value === values.country ? 'opacity-100' : 'opacity-0')" />
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover> -->
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="county">
          <FormItem>
            <FormLabel>County/Region</FormLabel>
            <FormControl>
              <Input type="text" placeholder="County" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="city">
          <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input type="text" placeholder="City" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="addressLine1">
          <FormItem>
            <FormLabel>Address Line 1</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Address Line 1" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="addressLine2">
          <FormItem>
            <FormLabel>Address Line 2</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Address Line 2" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="postcode">
          <FormItem>
            <FormLabel>Postcode</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Postcode" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="phoneNumber">
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input type="tel" placeholder="+1 (555) 867-5309" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="mobileNumber">
          <FormItem>
            <FormLabel>Mobile Number</FormLabel>
            <FormControl>
              <Input type="tel" placeholder="+1 (555) 867-5309" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="bankName">
          <FormItem>
            <FormLabel>Bank Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Bank Name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="iban">
          <FormItem>
            <FormLabel>IBAN</FormLabel>
            <FormControl>
              <Input type="text" placeholder="ABCD 1234 5678 9012 3456 78" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="companyEmail">
          <FormItem>
            <FormLabel>Company Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="youremail@company.com" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div v-if="openEdit" class="flex flex-col md:flex-row justify-end gap-4 md:col-span-2">
          <Button variant="secondary" type="reset" @click="openEdit = !openEdit">
            Cancel
          </Button>
          <Button type="submit" class="md:w-60">
            Save
          </Button>
        </div>

      </form>
    </section>
  </div>
</template>

<style scoped lang="postcss">
label {
  @apply text-slate-500
}
</style>
