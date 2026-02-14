<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { MessageCircleQuestion } from 'lucide-vue-next';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = toTypedSchema(
    z.object({
        email: z.string().email('Invalid email address'),
        details: z.string().optional(),
    })
);

const { handleSubmit } = useForm({
    validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
    console.log('Form submitted!', values);
});

const isOpen = ref(false);
</script>

<template>
    <UiDialog v-model:open="isOpen">
        <UiDialogTrigger as-child>
            <UiButton variant="link" class="text-slate-300 gap-1">
                <MessageCircleQuestion class="w-[22px] h-[22px]" />
                <span class="text-xs leading-tight hidden sm:inline">Ask about the product</span>
            </UiButton>
        </UiDialogTrigger>
        <UiDialogContent class="border-none shadow-s max-w-[358px] md:max-w-md rounded-xl">
            <p>Ask about the product</p>
            <form @submit="onSubmit" class="flex flex-col gap-4 w-full bg-white shadow-sm">
                <h4 id="price-enquiry-title" class="text-xl text-slate-500 leading-7 mb-4">
                    Part No: <span class="font-medium text-neutral-700">XOEIJLSCDA</span>
                </h4>

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
                        <FormLabel>Additional Details (Optional)</FormLabel>
                        <FormControl>
                            <UiTextarea class="min-h-[140px] bg-light-100" placeholder="Type your note here..." v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <!-- Submit Button -->
                <UiButton type="submit" class="mt-6 w-full"> Submit </UiButton>
            </form>
        </UiDialogContent>
    </UiDialog>
</template>
