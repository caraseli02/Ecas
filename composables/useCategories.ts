// useCategories.ts
import { ref } from 'vue';
import { categories } from '@/data/categories';

const selectedCategories = ref<string[]>([]);
const showDeleteAlert = ref(false);
const showMergeModal = ref(false);

export const useCategories = () => {
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
      categories.find(cat => cat._id === id)
    ).flat();

    categories.push({
      _id: Date.now().toString(), // Generate a new ID
      name: mergedCategoryName.value || 'Merged Category',
      items: mergedItems,
      status: 'unpublished',
    });

    selectedCategories.value = [];
  };

  const moveCategories = (newParentId: string) => {
    const newParentCategory = categories.find(cat => cat._id === newParentId);
    if (newParentCategory) {
      selectedCategories.value.forEach(id => {
        const category = categories.find(cat => cat._id === id);
        if (category) {
          newParentCategory.items.push(category);
        }
      });
      selectedCategories.value = [];
    }
  };

  const duplicateCategory = (categoryId: string) => {
    const category = categories.find(cat => cat._id === categoryId);
    if (category) {
      const duplicatedCategory = { ...category, _id: Date.now().toString(), name: `${category.name} (Copy)` };
      categories.push(duplicatedCategory);
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
    showMergeModal
  };
};
