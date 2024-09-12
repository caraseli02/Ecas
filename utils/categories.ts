import { TaxonomyInterface } from "~/types/dashboard/categories";

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
