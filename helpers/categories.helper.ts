import type { TaxonomyInterface } from '~/types/dashboard/categories';
import { useCategoriesStore } from '~/store/categoriesStore';

export const mapLabelsToIds = (array: any, result = {}) => {
    const categoriesStore = useCategoriesStore();

    if (categoriesStore.categoriesMap && Object.keys(categoriesStore.categoriesMap).length) {
        return categoriesStore.categoriesMap;
    }

    const recursiveFn = (array: any, result = {}) => {
        array.forEach((item: any) => {
            // Add the current item to the result object
            result[item.name] = item.id;
            // Check if the item has subcategories and recursively process them
            if (item.subcategory && item.subcategory.length > 0) {
                recursiveFn(item.subcategory, result);
            }
        });

        return result;
    };

    const mappedCategories = recursiveFn(array, result);
    categoriesStore.updateCategories(mappedCategories);

    return mappedCategories;
};

export const mapPathArrayOfNames = (path: string, categoriesMap: any) => {
    const idToNameMap = Object.entries(categoriesMap).reduce((acc, [name, id]) => {
        acc[id] = {
            name: name,
            id: id,
        };
        return acc;
    }, {});

    return path
        .split('/') // Split the path by "/"
        .filter((id) => id) // Remove empty strings
        .map((id) => idToNameMap[id]) // Map each ID to its name using the reverse map
        .filter((name) => name) as { id: string; name: string }[];
};

export const mapNamesToPath = (namesArray: any, categoriesMap: any) => {
    // Map each name in namesArray to its corresponding ID from categoriesMap
    const ids = namesArray.map((name) => categoriesMap[name] || null);

    // Filter out any null values (in case any name is missing from the map) and join with '/'
    return ids.filter(Boolean).join('/');
};

export const findCategory = (id: string, categories: TaxonomyInterface[]): TaxonomyInterface | null => {
    if (!id) {
        return null;
    }

    for (const category of categories) {
        if (category.id === id) {
            return category;
        }
        if (category.subcategory) {
            const foundCategory = findCategory(id, category.subcategory);
            if (foundCategory) {
                return foundCategory;
            }
        }
    }

    return null;
};
