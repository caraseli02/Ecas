<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/toast'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
  description: z
    .string()
    .min(10, {
      message: 'description must be at least 10 characters.',
    })
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})
</script>

<template>
  <UiDialog>
    <UiDialogTrigger>
      <UiButton variant="link" class=" text-slate-300 md:ml-[5px]">
        <AlertTriangle class="w-[22px] h-[22px]" />
        <span class="hidden sm:inline">Report an error</span>
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="border-none shadow-s max-w-[358px] md:max-w-md rounded-xl">
      <DialogHeader>
        <DialogTitle class="text-lg font-semibold leading-7 text-gray-800 mb-10">Report an error </DialogTitle>
        <DialogDescription class="sr-only">
          Report an error
        </DialogDescription>
      </DialogHeader>
      <form class="w-full space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Error description</FormLabel>
            <FormControl>
              <Textarea placeholder="Tell us a little bit about yourself" class="resize-none min-h-[140px] bg-light-100"
                v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <UiButton class="w-full mt-10" type="submit">
          Submit
        </UiButton>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
