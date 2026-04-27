import type { TaxonomyInterface } from '~/types/dashboard/categories';
import { useToast } from '@/components/ui/toast/use-toast';

type IMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

// Define the structure for a category
interface Category {
  id: string;
  name: string;
  subcategory: Category[];
}

/**
 * Finds the parent ID for a given category ID in a recursive category structure.
 * @param categories - An array of category objects to search through
 * @param targetId - The ID of the category whose parent we want to find
 * @returns The ID of the parent category, or undefined if the target is a top-level category or not found
 */
export function findParentId(categories: Category[], targetId: string): string | undefined {
  /**
     * Recursive helper function to search through the category tree
     * @param items - Current array of categories to search through
     * @returns The parent ID if found, undefined otherwise
     */
  function search(items: Category[]): string | undefined {
    for (const item of items) {
      // Check if the current item has subcategories
      if (item.subcategory.length > 0) {
        // Check each subcategory
        for (const subItem of item.subcategory) {
          if (subItem.id === targetId) {
            // If we found the target ID in subcategories, return current item's ID as parent
            return item.id;
          }
        }
        // Recursively search in subcategories
        const result = search(item.subcategory);
        if (result) return result;
      }
    }
    return undefined;
  }

  return search(categories);
}

export function extractIds(data: TaxonomyInterface) {
  const ids: string[] = [];

  function recurse(item: TaxonomyInterface) {
    ids.push(item.id); // Add the current item's id

    // If the current item has a 'subcategory', recurse through each of them
    if (item.subcategory && item.subcategory.length > 0) {
      item.subcategory.forEach(recurse);
    }
  }

  recurse(data); // Start recursion with the root item
  return ids;
}

export function extractIdAndName(dataArray: TaxonomyInterface[], excludeIds?: string[]) {
  const result: { id: string; name: string }[] = [];

  function recurse(item: TaxonomyInterface) {
    // If the current item or unknown of its children are excluded, skip the recursion
    if (excludeIds && excludeIds.includes(item.id)) {
      return; // Skip this item and all its subcategories
    }

    // Add the current item's id and name to the result if not excluded
    result.push({ id: item.id, name: item.name });

    // Recurse through subcategories if they exist
    if (item.subcategory && item.subcategory.length > 0) {
      item.subcategory.forEach(recurse);
    }
  }

  // Iterate over each object in the array
  dataArray.forEach(recurse);

  return result;
}

export const filterByQuery = (items: TaxonomyInterface[], query: string): TaxonomyInterface[] => {
  const results: TaxonomyInterface[] = [];
  const search = (categories: TaxonomyInterface[], query: string) => {
    for (const category of categories) {
      if (category.name.toLowerCase().includes(query.toLowerCase())) {
        results.push(category);
      }
      else {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        category?.subcategory && search(category.subcategory, query);
      }
    }
  };

  search(items, query);
  return results;
};

export const sortByField = <T>(items: T[], field: keyof T, order: 'asc' | 'desc') => {
  const multiplier = order === 'asc' ? 1 : -1;
  return items.sort((a, b) => {
    if (typeof a[field] === 'string') {
      return (a[field] as string).localeCompare(b[field] as string) * multiplier;
    }
    if (typeof a[field] === 'number' && typeof b[field] === 'number') {
      return (((a[field] as number) - b[field]) as number) * multiplier;
    }
    return 0;
  });
};

export const apiRequest = async (url: string, method: IMethod, token: string, body?: unknown) => {
  const { toast } = useToast();
  const config = useRuntimeConfig();
  try {
    const response = await $fetch<{ status: string; description: string }>(`${config.public.BASE_URL_API}${url}`, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body,
    });
    toast({
      title: response.status,
      description: response.description,
    });
    return response;
  }
  catch (error) {
    toast({
      title: 'Error',
      description: error.description || 'An error occurred during the request.',
      variant: 'destructive',
    });
    console.error(`Error during API request: ${method} ${url}`, error);
    throw error;
  }
};
