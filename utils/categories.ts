import { TaxonomyInterface } from '~/types/dashboard/categories';
import { useToast } from '@/components/ui/toast/use-toast'

type IMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export function extractIds(data: TaxonomyInterface) {
  console.log(data);
  
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


export function extractIdAndName(dataArray: TaxonomyInterface[], excludeIds: string[]) {
  const result: { id: string, name: string }[] = [];

  function recurse(item: TaxonomyInterface) {
    // If the current item or any of its children are excluded, skip the recursion
    if (excludeIds.includes(item.id)) {
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

export const filterByQuery = <T extends { name: string }>(items: T[], query: string): T[] => {
  const lowerCaseQuery = query.toLowerCase();
  return items.filter(item => item.name.toLowerCase().includes(lowerCaseQuery));
};


export const sortByField = <T>(items: T[], field: keyof T, order: 'asc' | 'desc') => {
  const multiplier = order === 'asc' ? 1 : -1;
  return items.sort((a, b) => {
    if (typeof a[field] === 'string') {
      return (a[field] as string).localeCompare(b[field] as string) * multiplier;
    }
    if (typeof a[field] === 'number' && typeof b[field] === 'number') {
      return (a[field] as number - b[field] as number) * multiplier;
    }
    return 0;
  });
};

export const apiRequest = async (url: string, method: IMethod, token: string, body?: any) => {
  const { toast } = useToast()
  const config = useRuntimeConfig();
  try {
    const response = await $fetch<{ status: string, description: string }>(`${config.public.BASE_URL_API}${url}`, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body,
    });
    toast({
      title: response.status,
      description: response.description,
    });
    return response;
  } catch (error) {
    toast({
      title: 'Error',
      description: error.description || 'An error occurred during the request.',
      variant: 'destructive',
    });
    console.error(`Error during API request: ${method} ${url}`, error);
    throw error;
  }
};
