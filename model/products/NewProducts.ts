import { ProductImage } from './response/ProductResponse';

export interface NewProducts {
    _id: string;
    additionalInfo: {
        searchedCount: number;
    };
    adminSettings: {
        featured: boolean;
    };
    alias: string;
    class: string;
    description: string;
    details: {
        ProductImage: ProductImage;
    };
    manufacturer: string;
    manufacturerCode: string;
    priceEur: number;
    priceRon: number;
    sold: number;
    stock: number;
    varian: string | null;
}
