import { computed } from 'vue';

export const useSignupValidation = (currentStep: Ref<number>, selectedType: Ref<string>) => {
  const isBusinessStep = computed(() => currentStep.value === 1 && selectedType.value !== 'personal');
  const isPersonalStep = computed(() => currentStep.value === 1 && selectedType.value === 'personal');
  const isSubmitDisabled = computed(() => !profileDetails.value.agreeToTerms);

  return { isBusinessStep, isPersonalStep, isSubmitDisabled };
};
