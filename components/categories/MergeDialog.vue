<script setup lang="ts">
const { showMergeModal } = useCategories();

</script>

<template>
  <UiDialog v-model:open="showMergeModal">
    <UiDialogContent class="sm:max-w-[640px]">
      <UiDialogHeader>
        <UiDialogTitle>Merge Selected</UiDialogTitle>
      </UiDialogHeader>
      <div class="grid gap-4 py-4">
        <div class="flex flex-col items-start gap-4">
          <UiLabel for="destination" class="text-right">
            Destination Category
          </UiLabel>
          <UiSelect>
            <UiSelectTrigger>
              <UiSelectValue placeholder="Select a Category" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectLabel>Category</UiSelectLabel>
                <UiSelectItem value="category1">
                  Category 1
                </UiSelectItem>
                <UiSelectItem value="category2">
                  Category 2
                </UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
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
