<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = toTypedSchema(
  z.object({
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    productCode: z.string().min(1, 'Product code is required'),
    email: z.string().email('Invalid email address'),
    details: z.string().optional(),
  })
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})

const isOpen = defineModel<boolean>()
</script>

<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogContent>
      <form @submit="onSubmit" class="w-full max-w-lg p-6 bg-white rounded-xl shadow-sm">
    <h4 id="price-enquiry-title" class="text-lg font-semibold leading-7 text-gray-800 mb-6">
      Price Enquiry
    </h4>

    <!-- Quantity Field -->
    <FormField v-slot="{ componentField }" name="quantity">
      <FormItem>
        <FormLabel>Quantity</FormLabel>
        <FormControl>
          <UiInput type="number" placeholder="Enter quantity" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Product Code Field -->
    <FormField v-slot="{ componentField }" name="productCode">
      <FormItem>
        <FormLabel>Product Code</FormLabel>
        <FormControl>
          <UiInput type="text" placeholder="Enter product code" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Email Field -->
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email Address</FormLabel>
        <FormControl>
          <UiInput type="email" placeholder="Enter email address" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Additional Details Field -->
    <FormField v-slot="{ componentField }" name="details">
      <FormItem>
        <FormLabel>Additional Details</FormLabel>
        <FormControl>
          <UiTextarea placeholder="Type your note here..." v-bind="componentField" />
        </FormControl>
        <FormDescription>
          This field is optional.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Submit Button -->
    <UiButton type="submit" class="mt-6 w-full">
      Submit
    </UiButton>
  </form>
    </UiDialogContent>
  </UiDialog>
</template>
