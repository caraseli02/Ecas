export interface ProductResponse {
    data: [ProductInterface];
    status: string;
}

export interface ProductInterface {
    _id: string;
    class: string;
    alias: string;
    description: string;
    variant: string;
    manufacturer: string;
    manufacturerCode: string;
    stock: number;
    priceRon: number;
    priceEur: number;
    measure: string;
    details: ProductDetailsInterface;
    sold: number;
    adminSettings?: AdminSettings;
    additionalInfo?: AdditionalInfoInterface;
    favourite?: boolean;
}

export interface ProductDetailsInterface {
    SummaryData: ProductSummaryDataInterface;
    ParametricData: ProductParametricDataInterface;
    ProductImage: ProductImageInterface;
}

export interface ProductImageInterface {
    ProductImageSmall: string;
    ProductImageLarge: string;
}

export interface ProductSummaryDataInterface {
    Datasheet: string;
    TaxonomyPath: string;
    TaxonomyPathIDs: string;
    SmallImageURL: string;
    PartDescription: string;
    Manufacturer: string;
}

export interface ProductParametricDataInterface {
    Features: ProductParametricDataFeaturesInterface[];
}

export interface ProductParametricDataFeaturesInterface extends CountInterface {
    FeatureName: string;
    FeatureValue: string;
    FeatureUnit: string;
    FeatureID?: string;
    FeatureValueDetails?: string;
}

export interface CountInterface {
    count?: number;
    checked?: boolean;
}

export interface DiscountInterface {
    value: number;
    startDate: string;
    endDate: string;
}

export interface AdditionalInfoInterface {
    searchedCount: number;
}

export interface AdminSettings {
    discount?: DiscountInterface;
    featured?: boolean;
}
