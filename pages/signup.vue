<template>
  <div class="min-h-screen md:flex">
    <SignupSteps :currentStep="currentStep" :selectedType="selectedType" />
    <SignupSelectMenu
      v-if="currentStep === 0"
      :selectedType="selectedType"
      @set-type="($event) => (selectedType = $event)"
      @set-business-type="($event) => (selectedBusinessType = $event)"
      @continue="currentStep++"
    />
    <SignupBusinessDetails
      v-if="
        currentStep === 1 &&
        (selectedType === 'business' || selectedType === 'sale-trader')
      "
      :selectedType="selectedType === 'sale-trader' ? '' : selectedBusinessType"
      @back="currentStep--"
      @continue="currentStep++"
    />
    <SignupPersonalDetails
      v-else-if="currentStep === 1 && selectedType === 'personal'"
      @back="currentStep--"
      @continue="currentStep++"
    />
    <SignupContactDetails
      v-if="currentStep === 2"
      :selected-type="selectedType"
      @back="currentStep--"
      @continue="currentStep++"
    />
    <SignupProfileDetails
      v-if="currentStep === 3"
      @back="currentStep--"
      @continue="currentStep++"
    />
    <SignupFinish v-if="currentStep === 4" />
  </div>
</template>

<script setup lang="ts">
const currentStep = ref(0);

const selectedType = ref<"personal" | "sale-trader" | "business">("business");
const selectedBusinessType = ref("");

definePageMeta({
  layout: "empty",
});

useHead({
  title: "Signup",
});
</script>
