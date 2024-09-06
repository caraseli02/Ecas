<script setup lang="ts">

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
          <UiInput id="title" value="Pedro Duarte" class="col-span-3" />
        </div>
        <div class="flex flex-col items-start gap-4">
          <UiLabel for="icon" class="text-right">
            Upload Icon
          </UiLabel>
          <UiInput id="icon" class="col-span-3" />
        </div>
        <div class="flex items-center justify-between space-x-2">
          <UiLabel for="airplane-mode">Smart Pricing</UiLabel>
          <UiSwitch id="airplane-mode" />
        </div>
      </div>
      <UiDialogFooter>
        <UiButton variant="secondary" type="submit">
          Cancel
        </UiButton>
        <UiButton type="submit">
          Create
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
