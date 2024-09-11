// useCategories.ts
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';
import type { ICreatePayload, TaxonomyInterface } from '~/types/dashboard/categories';

const selectedCategories = ref<string[]>([]);
const showDeleteAlert = ref(false);
const showMergeModal = ref(false);
const categories = ref<TaxonomyInterface[]>([]);
const taxonomyId = ref('');
const isLoading = ref(false);

export const useCategories = () => {
  const token = useAuthStore().getToken();
  const config = useRuntimeConfig();

  const getCategories = async () => {
    isLoading.value = true;
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
    try {      
      // Replace the endpoint with your actual API URL
      const response = await $fetch<{status : string}>(`${config.public.BASE_URL_API}/taxonomy/${taxonomyId.value}/category`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: payload
      });

      //reset the modal and refetch the categories after successful POST request
      if(response.status === 'success'){
        getCategories();
        return true;
      }
      // Redirect or do something after successful POST request
      // router.push('/categories');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      // Replace the endpoint with your actual API URL
      const response = await $fetch<{status : string}>(`${config.public.BASE_URL_API}/taxonomy/${taxonomyId.value}/category/${categoryId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if(response.status === 'success'){
        getCategories();
      }
      
      // Redirect or do something after successful DELETE request
      // router.push('/categories');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const mergedCategoryName = ref('');

  const selectCategory = (categoryId: string) => {
    if (selectedCategories.value.includes(categoryId)) {
      selectedCategories.value = selectedCategories.value.filter(id => id !== categoryId);
    } else {
      selectedCategories.value.push(categoryId);
    }
  };

  const mergeCategories = () => {
    if (selectedCategories.value.length < 2) {
      alert('Please select at least two categories to merge.');
      return;
    }

    const mergedItems = selectedCategories.value.map(id =>
      categories.value.find(cat => cat._id === id)
    ).flat();

    categories.value.push({
      _id: Date.now().toString(), // Generate a new ID
      name: mergedCategoryName.value || 'Merged Category',
      items: mergedItems,
      status: 'unpublished',
    });

    selectedCategories.value = [];
  };

  const moveCategories = (newParentId: string) => {
    const newParentCategory = categories.value.find(cat => cat._id === newParentId);
    if (newParentCategory) {
      selectedCategories.value.forEach(id => {
        const category = categories.value.find(cat => cat._id === id);
        if (category) {
          newParentCategory.items.push(category);
        }
      });
      selectedCategories.value = [];
    }
  };

  const duplicateCategory = (categoryId: string) => {
    const category = categories.value.find(cat => cat._id === categoryId);
    if (category) {
      const duplicatedCategory = { ...category, _id: Date.now().toString(), name: `${category.name} (Copy)` };
      categories.value.push(duplicatedCategory);
    }
  };

  const deleteCategories = () => {
    console.log('click');

    showDeleteAlert.value = true;
    // categories = categories.filter(cat => !selectedCategories.value.includes(cat._id));
    // selectedCategories.value = [];
  };

  return {
    selectedCategories,
    mergedCategoryName,
    selectCategory,
    mergeCategories,
    moveCategories,
    duplicateCategory,
    deleteCategories,
    showDeleteAlert,
    showMergeModal,
    categories,
    getCategories,
    taxonomyId,
    createCategory,
    deleteCategory,
    isLoading
  };
};
