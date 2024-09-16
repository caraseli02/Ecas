// useCategories.ts
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';
import type { ICreatePayload, TaxonomyInterface } from '~/types/dashboard/categories';

const selectedCategories = ref<string[]>([]);
const showDeleteAlert = ref(false);
const categories = ref<TaxonomyInterface[]>([]);
const taxonomyId = ref('');
const isLoading = ref(false);

// Search, filter and sort
const searchQuery = ref('');
const sortBy = ref('name');
const sortOrder = ref('asc');

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
      
    } catch (error) {
      console.error('Error toggling category status:', error);
    }
  };

  const mergeCategories = async (sourceIds: string[], targetID: string) => {
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
        body: {
          "parentId": targetId
      }
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
  
  // Filter logic
  const filteredData = computed(() => {
    const query = searchQuery.value.toLowerCase();
    
    function filterItems(items: TaxonomyInterface[]): TaxonomyInterface[] {
      return items.filter(item => {
        const matchesQuery = item.name.toLowerCase().includes(query);
        if (item.subcategory && item.subcategory.length > 0) {
          return matchesQuery || filterItems(item.subcategory).length > 0;
        }
        return matchesQuery;
      });
    }
    
    return filterItems(categories.value);
  });
  
  const sortedData = computed(() => {
    const key = sortBy.value as keyof TaxonomyInterface;
    const order = sortOrder.value === 'asc' ? 1 : -1;
    
    return [...filteredData.value].sort((a, b) => {
      if (key === 'name') {
        return a.name.localeCompare(b.name) * order;
      }
      if (key === 'averageWeight' && a.averageWeight !== undefined && b.averageWeight !== undefined) {
        return (a.averageWeight - b.averageWeight) * order;
      }
      if (key === 'productCount' && a.productCount !== undefined && b.productCount !== undefined) {
        return (a.productCount - b.productCount) * order;
      }
      return 0;
    });
  });
  
  const filteredAndSortedData = computed(() => sortedData.value);
  return {
    selectedCategories,
    mergedCategoryName,
    selectCategory,
    mergeCategories,
    moveCategories,
    duplicateCategory,
    showDeleteAlert,
    getCategories,
    taxonomyId,
    createCategory,
    deleteCategories,
    updateCategory,
    toggleCategoryStatus,
    isLoading,
    filteredAndSortedData,
    searchQuery,
    sortOrder,
    categories
  };
};
