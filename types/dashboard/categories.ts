export interface TaxonomyInterface {
  id?: any;
  name: string;
  averageWeight?: number;
  productCount?: number;
  subcategory?: TaxonomyInterface[];
  path: string;
  isPublished: boolean
}

export interface ICreatePayload  {
  name: string;
  icon: string;
  parentId?: string; 
  averageWeight?: string;
}
