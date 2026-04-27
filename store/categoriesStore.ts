import { defineStore } from 'pinia';

export const useCategoriesStore = defineStore({
  id: 'categories-store',
  state: () => {
    return {
      categoriesMap: null as unknown | null,
    };
  },
  actions: {
    updateCategories(object: unknown) {
      this.categoriesMap = object;
    },
  },
  getters: {},
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
});
