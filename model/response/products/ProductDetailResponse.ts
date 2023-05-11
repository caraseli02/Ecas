import { ProductImage, ProductParametricDataInterface, ProductSummaryDataInterface } from "./ProductResponse"

export interface ProductDetailResponse {
    status: string
    data: ProductDetail
}

export interface ProductDetail {
    _id: string
    class: string
    alias: string
    description: string
    varian: string | null
    manufacturer: string
    manufacturerCode: string
    stock: number
    priceRon: number
    priceEur: number
    sold: number
    adminSettings: {
        featured: Boolean
        stockClearance: Boolean
    }
    additionalInfo: {
        searchedCount: number
    }
    details: ProductDetails
}

export interface ProductDetails {
    SummaryData: ProductSummaryDataInterface
    ParametricData: ProductParametricDataInterface
    ProductImage: ProductImage
}