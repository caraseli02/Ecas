import {FilterInterface} from "~/model/dashboard/table/filters";


export const handleFilterChange = (activeFilters: FilterInterface[], emits, filter: string, event: any, raw = false) => {
    const value = raw ? event : event.target?.value;

    let existingFilterIndex = activeFilters.findIndex((item) => item.filter === filter);

    if (existingFilterIndex < 0) {
        value !== '' && typeof value !== 'undefined' && activeFilters.push({filter: filter, value: value});
    } else {
        if (value === '' || typeof value === 'undefined') {
            activeFilters.splice(existingFilterIndex, 1);
        } else {
            activeFilters[existingFilterIndex].value = value;
        }
    }

    emits("active-filters", [...activeFilters]);
};