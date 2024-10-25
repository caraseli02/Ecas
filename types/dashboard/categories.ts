import { type IconName } from '@/types/Icons';

export interface TaxonomyInterface {
  id: string;
  name: string;
  averageWeight?: number;
  productCount?: number;
  subcategory?: TaxonomyInterface[];
  path: string;
  isPublished: boolean
  icon?: string;
}

export interface ICreatePayload  {
  name: string;
  icon: string;
  parentId?: string; 
  averageWeight?: string;
}
