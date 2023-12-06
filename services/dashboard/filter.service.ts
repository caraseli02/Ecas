import { FilterInterface, SortInterface } from '~/model/dashboard/table/filters';

export const handleFilterChange = (activeFilters: FilterInterface[], emits, filter: string, event: any, raw: boolean, hidden = false) => {
    const value = raw ? event : event.target?.value;

    const existingFilterIndex = activeFilters.findIndex((item) => item.filter === filter);

    if (existingFilterIndex < 0) {
        value !== '' && typeof value !== 'undefined' && activeFilters.push({ filter: filter, value: value, hidden: hidden });
    } else {
        if (value === '' || typeof value === 'undefined') {
            activeFilters.splice(existingFilterIndex, 1);
        } else {
            activeFilters[existingFilterIndex].value = value;
        }
    }

    emits('active-filters', [...activeFilters]);
};

export const handleSortChange = (emits, sortBy: string, sortOrder: number) => {
    emits('active-sort', { sortBy: sortBy, sortOrder: sortOrder === 0 ? 'desc' : 'asc' } as unknown as SortInterface);
};

export const formattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB');
};
