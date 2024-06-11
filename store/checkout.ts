import { defineStore, } from 'pinia';

export const useCheckoutStore = defineStore('checkout', () => {
  const checkout = ref(false)

  return { checkout }
})
