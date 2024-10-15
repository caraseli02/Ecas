import { type IconName } from '@/types/Icons';
import { PriceSmartLinkingInterface } from '~/model/prices/price-settings.interface';

export interface TaxonomyInterface {
    id: string;
    name: string;
    averageWeight?: number;
    productCount?: number;
    products?: string[];
    subcategory?: TaxonomyInterface[];
    smartPricingSettings?: PriceSmartLinkingInterface;
    path: string;
    isPublished: boolean;
    icon?: IconName;
}

export interface ICreatePayload {
    name: string;
    icon: string;
    parentId?: string;
    averageWeight?: string;
}
