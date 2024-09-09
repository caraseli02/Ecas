<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/authStore';

const router = useRouter();
const title = ref('');
const icon = ref('PlugIcon');
const smartPricing = ref(false);

const createCategory = async () => {
  const token = useAuthStore().getToken();
const config = useRuntimeConfig();

  try {
    const payload = {
      title: title.value,
      icon: icon.value,
      // smartPricing: smartPricing.value
    };
    console.log(payload);
    
    // Replace the endpoint with your actual API URL
    const response = await $fetch(`${config.public.BASE_URL_API}/taxonomy`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: payload
    });
    console.log(response);
    
    // Redirect or do something after successful POST request
    // router.push('/categories');
  } catch (error) {
    console.error('Error creating category:', error);
  }
};
</script>

<template>
  <UiDialog>
    <UiDialogTrigger as-child>
      <UiButton>+ Create New</UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="sm:max-w-[640px]">
      <UiDialogHeader>
        <UiDialogTitle>Create Category</UiDialogTitle>
      </UiDialogHeader>
      <div class="grid gap-4 py-4">
        <div class="flex flex-col items-start gap-4">
          <UiLabel for="title" class="text-right">
            Title
          </UiLabel>
          <UiInput id="title" v-model="title" class="col-span-3" />
        </div>
        <div class="flex flex-col items-start gap-4">
          <IconSelect v-model="icon" title="Select Icon" />
        </div>
        <div class="flex items-center justify-between space-x-2">
          <UiLabel for="airplane-mode">Smart Pricing</UiLabel>
          <UiSwitch id="airplane-mode" v-model="smartPricing" />
        </div>
      </div>
      <UiDialogFooter>
        <UiButton variant="secondary" @click="() => router.push('/categories')">
          Cancel
        </UiButton>
        <UiButton @click="createCategory">
          Create
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
