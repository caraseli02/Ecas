// useCategories.ts
import { computed, ref } from 'vue';
import type { ICreatePayload, TaxonomyInterface } from '~/types/dashboard/categories';
import { categories as demoCategories } from '~/data/categories';

const selectedCategories = ref<string[]>([]);
const showDeleteAlert = ref(false);
const categories = ref<TaxonomyInterface[]>([]);
const taxonomyId = ref('');
const isLoading = ref(false);
const isLocked = ref(false);

const searchQuery = ref('');
const sortBy = ref<'name' | 'averageWeight' | 'productCount'>('name');
const sortOrder = ref<'asc' | 'desc'>('asc');

const categoriesOptions = computed(() => {
  if (categories.value && categories.value.length > 0) {
    return extractIdAndName(categories.value);
  }
  return [];
});

type DemoCategoryNode = {
  _id: string;
  name: string;
  status?: string;
  icon?: string;
  items?: DemoCategoryNode[];
};

const mapDemoCategoryNode = (node: DemoCategoryNode, parentPath = ''): TaxonomyInterface => {
  const path = parentPath ? `${parentPath}/${node._id}` : node._id;
  const children = (node.items || []).map(item => mapDemoCategoryNode(item, path));

  return {
    id: node._id,
    name: node.name,
    averageWeight: 0,
    productCount: children.length,
    products: [],
    subcategory: children,
    path,
    isPublished: node.status === 'published',
    icon: node.icon,
  };
};

const setDemoTaxonomy = () => {
  categories.value = (demoCategories as DemoCategoryNode[]).map(category => mapDemoCategoryNode(category));
  taxonomyId.value = 'demo-taxonomy';
  isLocked.value = false;
};

export const useCategories = () => {
  const { $api } = useNuxtApp();
  const config = useRuntimeConfig();

  const getCategories = async () => {
    isLoading.value = true;
    selectedCategories.value = [];
    try {
      if (config.public.MOCK_MODE || typeof $api.categories?.get !== 'function') {
        setDemoTaxonomy();
        return;
      }

      const response = await $api.categories.get();
      categories.value = response.data.data;
      taxonomyId.value = response.data._id;
      isLocked.value = response.data.locked;
    }
    catch (error) {
      if (config.public.MOCK_MODE) {
        setDemoTaxonomy();
        return;
      }
      console.error('Failed to fetch counts from API:', error);
    }
    finally {
      isLoading.value = false;
    }
  };

  const getCategoriesBySearchQuery = async () => {
    // search recursively in all categories and subcategories
    const search = (categories: TaxonomyInterface[], query: string) => {
      return categories.filter((category: TaxonomyInterface) => {
        if (category.name.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
        if (category.subcategory && category.subcategory?.length > 0) {
          return search(category.subcategory, query);
        }
        return false;
      });
    };

    const results = search(categories.value, searchQuery.value);
    return results;
  };

  const createCategory = async (payload: ICreatePayload) => {
    const response = await $api.categories.create(taxonomyId.value, payload);
    if (response.status === 'success') {
      await getCategories();
      return response.status;
    }
  };

  const deleteCategories = async (categoryIds: string[]) => {
    const response = await $api.categories.delete(taxonomyId.value, categoryIds);
    if (response.status === 'success') {
      await getCategories();
    }
  };

  const updateCategory = async (categoryId: string, payload: ICreatePayload) => {
    const response = await $api.categories.update(taxonomyId.value, categoryId, payload);
    if (response.status === 'success') {
      await getCategories();
    }
  };

  const toggleCategoryStatus = async (categoryId: string) => {
    const response = await $api.categories.toggleStatus(taxonomyId.value, categoryId);
    if (response.status === 'success') {
      await getCategories();
      return response.status;
    }
  };

  const mergeCategories = async (sourceIds: string[], targetID: string) => {
    const response = await $api.categories.merge(taxonomyId.value, sourceIds, targetID);
    if (response.status === 'success') {
      await getCategories();
    }
  };

  const moveCategories = async (categoryIds: string[], parentId: string) => {
    const response = await $api.categories.move(taxonomyId.value, categoryIds, parentId);
    if (response.status === 'success') {
      await getCategories();
    }
  };

  const selectCategory = (categoryId: string) => {
    const selectedIndex = selectedCategories.value.indexOf(categoryId);
    if (selectedIndex !== -1) {
      selectedCategories.value.splice(selectedIndex, 1);
    }
    else {
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
    isLocked,
    getCategoriesBySearchQuery,
    getCategories,
    createCategory,
    deleteCategories,
    updateCategory,
    toggleCategoryStatus,
    mergeCategories,
    moveCategories,
    selectCategory,
    filteredAndSortedData: sortedData,
    categoriesOptions,
    isLoading,
  };
};
