import { TaxonomyInterface } from '~/types/dashboard/categories';

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


