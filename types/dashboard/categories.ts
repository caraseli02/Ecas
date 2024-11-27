import type { PriceSmartLinkingInterface } from '~/model/prices/price-settings.interface';

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
    icon?: string;
}

export interface ICreatePayload {
    name: string;
    icon: string;
    parentId?: string;
    smartPricingSettings?: SmartPricingSettings;
    customProperties?: CustomPropertiesSettings;
}

export interface SmartPricingSettings {
    priceRangeId: string;
    quantityId: string;
    marginId: string;
}

export interface CustomPropertiesSettings {
    avgWeight: number;
    width: number;
    height: number;
    length: number;
}
