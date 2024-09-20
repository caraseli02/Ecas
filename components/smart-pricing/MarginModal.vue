<script setup lang="ts">
import { PlusIcon, Trash2Icon } from 'lucide-vue-next';

const isOpen = ref(false)

const marginList = ref([
  { id: 1, value: '' }
])

function addMargin() {
  marginList.value.push({ id: marginList.value.length + 1, value: ''  });
}

function removeMargin(id: number) {
  marginList.value = marginList.value.filter(q => q.id !== id);
}
</script>

<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogTrigger as-child>
      <UiButton class="justify-start" variant="ghost">Margin</UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="sm:max-w-md gap-10">
      <UiDialogHeader>
        <UiDialogTitle>Create Margin Template</UiDialogTitle>
      </UiDialogHeader>
      <div class="flex flex-col gap-4">
        <section class="flex gap-4" v-for="item in marginList"
        :key="item.id">
          <div
          class="flex overflow-hidden flex-1 shrink gap-2 items-center pr-3 min-h-12 bg-white rounded-lg border border-solid basis-0 border-grey-300"
        >
          <span
            class="overflow-hidden self-stretch px-3 py-2 my-auto min-w-11 h-11 text-xl leading-snug text-center  border-r border-solid bg-stone-50 border-r-grey-300 text-zinc-800"
          >
            %
          </span>
          <label for="minPrice" class="sr-only">Margin Value</label>
          <input
            id="minPrice"
            type="number"
            class="self-stretch my-auto text-sm leading-none text-neutral-400 w-full bg-transparent border-none focus:outline-none"
            placeholder="i.e 100"
            aria-label="Margin Value"
          />
        </div>
          <UiButton type="button" class="min-w-10 h-12 p-0" variant="secondary" @click="removeMargin(item.id)">
            <Trash2Icon  class="w-6 h-6"/>
        </UiButton>
        </section>

      </div>
      <UiDialogFooter class="sm:justify-start">
        <UiButton type="button" class="min-w-10 h-10 p-0" variant="secondary" @click="addMargin()">
          <PlusIcon class="w-6 h-6" />
        </UiButton>
        <UiButton class="w-full" type="button">
          Create
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
