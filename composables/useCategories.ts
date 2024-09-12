// useCategories.ts
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';
import type { ICreatePayload, TaxonomyInterface } from '~/types/dashboard/categories';

const selectedCategories = ref<string[]>([]);
const showDeleteAlert = ref(false);
const categories = ref<TaxonomyInterface[]>([]);
const taxonomyId = ref('');
const isLoading = ref(false);

export const useCategories = () => {
  const token = useAuthStore().getToken();
  const config = useRuntimeConfig();

  const getCategories = async () => {
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

  const deleteCategories = async (categoryIds: string[]) => {
    try {
      // Replace the endpoint with your actual API URL
      const response = await $fetch<{status : string}>(`${config.public.BASE_URL_API}/taxonomy/${taxonomyId.value}/category`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        body: {categoryIds}
      });

      if(response.status === 'success'){
        getCategories();
      }
      
      // Redirect or do something wafter successful DELETE request
      // router.push('/categories');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const updateCategory = async (categoryId: string, payload: ICreatePayload) => {
    try {
      // Replace the endpoint with your actual API URL
      const response = await $fetch<{status : string}>(`${config.public.BASE_URL_API}/taxonomy/${taxonomyId.value}/category/${categoryId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: payload
      });

      if(response.status ==='success'){
        getCategories();
      }
      
      // Redirect or do something after successful PUT request
      // router.push('/categories');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const toggleCategoryStatus = async (categoryId: string) => { 
    try {
      // Replace the endpoint with your actual API URL
      const response = await $fetch<{status : string}>(`${config.public.BASE_URL_API}/taxonomy/${taxonomyId.value}/category/${categoryId}/toggle-status`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });

      if(response.status ==='success'){
        getCategories();
      }
      
      // Redirect or do something after successful PUT request
      // router.push('/categories');
    } catch (error) {
      console.error('Error toggling category status:', error);
    }
  };

  const mergeCategories = async (source: TaxonomyInterface, targetID: string) => {
    const sourceIds = extractIds(source)
    try {
      // Replace the endpoint with your actual API URL
      const response = await $fetch<{status : string}>(`${config.public.BASE_URL_API}/taxonomy/${taxonomyId.value}/category/merge/${targetID}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: { sourceIds }
      });

      if(response.status ==='success'){
        getCategories();
      }
      
      // Redirect or do something after successful PUT request
      // router.push('/categories');
    } catch (error) {
      console.error('Error toggling category status:', error);
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

  const moveCategories = async (categoryIds: string[], parentId: string) => {
    try {
      // Replace the endpoint with your actual API URL
      const response = await $fetch<{status : string}>(`${config.public.BASE_URL_API}/taxonomy/${taxonomyId.value}/category/move/${parentId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: { categoryIds }
      });

      if(response.status ==='success'){
        getCategories();
      }
      
      // Redirect or do something after successful PUT request
      // router.push('/categories');
    } catch (error) {
      console.error('Error moving category:', error);
    }
  }

  const duplicateCategory = async (sourceId: string, targetId: string) => {
    try {
      // Replace the endpoint with your actual API URL
      const response = await $fetch<{status : string}>(`${config.public.BASE_URL_API}/taxonomy/${taxonomyId.value}/category/${sourceId}/copy/${targetId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if(response.status ==='success'){
        getCategories();
      }
      
      // Redirect or do something after successful POST request
      // router.push('/categories');
    } catch (error) {
      console.error('Error duplicating category:', error);
    }
  }

  return {
    selectedCategories,
    mergedCategoryName,
    selectCategory,
    mergeCategories,
    moveCategories,
    duplicateCategory,
    showDeleteAlert,
    categories,
    getCategories,
    taxonomyId,
    createCategory,
    deleteCategories,
    updateCategory,
    toggleCategoryStatus,
    isLoading
  };
};
