import { ProductImage, ProductParametricDataFeaturesInterface, ProductSummaryDataInterface } from './ProductResponse';

export interface ProductSearchResponse {
    status: string;
    data: SearchData;
}

export interface SearchData {
    filtersCount: number;
    items: SearchDataItems;
    filters: ProductFilters;
}

export interface ProductFilters {
    [key: string]: SearchFiltersCategories[];
}

export interface SearchFiltersCategories {
    FeatureName: string;
    FeatureValue: string;
    FeatureUnit: string;
    FeatureID: string;
    FeatureValueDetails: {
        Value: string;
        Multiplier: string;
        MultiplierValue: string;
        Unit: string;
        Sign: string;
    };
    count: number;
}

export interface SearchDataItems {
    total_items: number;
    page_count: number;
    page: number;
    items: [ProductSearchItems];
}

export interface ProductSearchItems {
    _id: string;
    class: string;
    alias: string;
    description: string;
    variant: string | null;
    manufacturer: string;
    manufacturerCode: string;
    stock: number;
    priceRon: number;
    priceEur: number;
    sold: number;
    adminSettings: {
        featured: boolean;
        stockClearance: boolean;
    };
    additionalInfo: {
        searchedCount: number;
    };
    details: {
        SummaryData: ProductSummaryDataInterface;
        ParametricData: ProductParametricDataFeaturesInterface;
        ProductImage: ProductImage;
    };
}
