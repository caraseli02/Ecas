// useCategories.ts
import { ref, computed } from 'vue';
import { useAuthStore } from '@/store/authStore';
import type { ICreatePayload, TaxonomyInterface } from '~/types/dashboard/categories';

const selectedCategories = ref<string[]>([]);
const showDeleteAlert = ref(false);
const categories = ref<TaxonomyInterface[]>([]);
const taxonomyId = ref('');
const isLoading = ref(false);

const searchQuery = ref('');
const sortBy = ref<'name' | 'averageWeight' | 'productCount'>('name');
const sortOrder = ref<'asc' | 'desc'>('asc');

const categoriesOptions = computed(() =>{
  if(categories.value && categories.value.length > 0) {
    return extractIdAndName(categories.value);
  }
  return [];
})

export const useCategories = () => {
  const token = useAuthStore().getToken();

  const getCategories = async () => {
    const config = useRuntimeConfig();
    isLoading.value = true;
    selectedCategories.value = [];
    try {
      const response = await $fetch<{ status: string, data: { _id: string, data: TaxonomyInterface[] } }>(`${config.public.BASE_URL_API}/taxonomy`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      categories.value = response.data.data;
      taxonomyId.value = response.data._id;
      
    } catch (error) {
      console.error('Failed to fetch counts from API:', error);
    } finally {
      isLoading.value = false;
    }
  }

  const createCategory = async (payload: ICreatePayload) => {
    const response = await apiRequest(`/taxonomy/${taxonomyId.value}/category`, 'POST', token, payload);
    if (response.status === 'success') {
      getCategories();
      return response.status;
    }
  };

  const deleteCategories = async (categoryIds: string[]) => {
    const response = await apiRequest(`/taxonomy/${taxonomyId.value}/category`, 'DELETE', token, { categoryIds });
    if (response.status === 'success') getCategories();
  };

  const updateCategory = async (categoryId: string, payload: ICreatePayload) => {
    const response = await apiRequest(`/taxonomy/${taxonomyId.value}/category/${categoryId}`, 'PATCH', token, payload);
    if (response.status === 'success') {
      getCategories();
      return response.status;
    }
  };

  const toggleCategoryStatus = async (categoryId: string) => {
    const response = await apiRequest(`/taxonomy/${taxonomyId.value}/category/${categoryId}/toggle-status`, 'PATCH', token);
    if (response.status === 'success') {
      getCategories();
      return response.status;
    }
  };

  const mergeCategories = async (sourceIds: string[], targetID: string) => {
    const response = await apiRequest(`/taxonomy/${taxonomyId.value}/category/merge/${targetID}`, 'POST', token, { sourceIds });
    if (response.status === 'success') getCategories();
  };

  const moveCategories = async (categoryIds: string[], parentId: string) => {
    const response = await apiRequest(`/taxonomy/${taxonomyId.value}/category/move/${parentId}`, 'POST', token, { categoryIds });
    if (response.status === 'success') getCategories();
  };

  const duplicateCategory = async (sourceId: string, targetId?: string) => {
    const url = targetId ? `/taxonomy/${taxonomyId.value}/category/${sourceId}/copy/${targetId}` : `/taxonomy/${taxonomyId.value}/category/${sourceId}/copy`;
    let payload = {}

    if(targetId) {
      payload = {
        parentId: targetId,
      };
    }
    const response = await apiRequest(url, 'POST', token, payload);
    if (response.status === 'success') getCategories();
  };

  const selectCategory = (categoryId: string) => {
    const selectedIndex = selectedCategories.value.indexOf(categoryId);
    if (selectedIndex !== -1) {
      selectedCategories.value.splice(selectedIndex, 1);
    } else {
      selectedCategories.value.push(categoryId);
    }
  };

  // Filter and sort logic
  const filteredData = computed(() => filterByQuery(categories.value, searchQuery.value));
  const sortedData = computed(() => sortByField(filteredData.value, sortBy.value, sortOrder.value));

  return {
    selectedCategories,
    showDeleteAlert,
    categories,
    taxonomyId,
    searchQuery,
    sortOrder,
    getCategories,
    createCategory,
    deleteCategories,
    updateCategory,
    toggleCategoryStatus,
    mergeCategories,
    moveCategories,
    duplicateCategory,
    selectCategory,
    filteredAndSortedData: sortedData,
    categoriesOptions,
  };
};
