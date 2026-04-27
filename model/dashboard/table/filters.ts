export interface FilterInterface {
  filter: string;
  hidden?: boolean;
  value: unknown;
}

export interface SortInterface {
  sortBy: string;
  sortOrder: number;
}
