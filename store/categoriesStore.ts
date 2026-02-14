import { defineStore } from 'pinia';

export const useCategoriesStore = defineStore({
    id: 'categories-store',
    state: () => {
        return {
            categoriesMap: null as any | null,
        };
    },
    actions: {
        updateCategories(object: any) {
            this.categoriesMap = object;
        },
    },
    getters: {},
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
    },
});
