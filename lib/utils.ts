import type { Updater } from '@tanstack/vue-table'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { camelize, getCurrentInstance, toHandlerKey } from 'vue'

interface Filter {
  id: string;
  value: unknown; // Value can be single or multiple
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value
    = typeof updaterOrValue === 'function'
      ? updaterOrValue(ref.value)
      : updaterOrValue
}

export function transformSortingKeys(sortingResponse: { id: string, desc: boolean} ) {
  if (!sortingResponse) {
    return {}; // Return empty object for no sorting information
  }

  const sortBy = sortingResponse.id;
  const sortOrder = sortingResponse.desc ? 'desc' : 'asc';

  return {
    sortBy,
    sortOrder,
  };
}

function transformFilters(filters: Filter[]): { filter: string; value: unknown }[] {
  const transformed_filters: { filter: string; value: unknown }[] = [];

  for (const filter_obj of filters) {
    const filter_id = filter_obj.id;
    const filter_value = filter_obj.value;

    // Handle single value filters
    if (!Array.isArray(filter_value)) {
      transformed_filters.push({ filter: filter_id, value: filter_value });
    }

    // Handle multiple value filters
    else {
      for (const value of filter_value) {
        transformed_filters.push({ filter: filter_id, value });
      }
    }
  }

  return transformed_filters;
}

export function transformFiltersToObject(filters: Filter[]): Record<string, unknown> {
  const transformedFilters: Record<string, unknown> = {};

  for (const filter of filters) {
    if (Array.isArray(filter.value)) {
      transformedFilters[filter.id] = filter.value.join(', ');
    } else {
      transformedFilters[filter.id] = filter.value;
    }
  }

  return transformedFilters;
}
