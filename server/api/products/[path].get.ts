export default defineEventHandler(async (event) => {
    const path = getRouterParam(event, 'path');

    const mockProducts = [
        {
            _id: 'prod-1',
            erpItemId: 'ERP-001',
            path: 'electronics/smartphone',
            category: 'Electronics',
            active: true,
            class: 'Premium',
            name: 'SmartPhone Pro Max',
            alias: 'smartphone-pro-max',
            description: 'Latest flagship smartphone with cutting-edge features and premium build quality.',
            code: 'SPM-001',
            manufacturer: 'TechBrand Inc.',
            manufacturerCode: 'TBI',
            stock: 150,
            sold: 1250,
            priceHistory: [
                { price: 899.99, active: true, createdAt: '2024-01-01T00:00:00.000Z' },
                { price: 849.99, active: false, createdAt: '2024-02-01T00:00:00.000Z' },
            ],
            priceConfiguration: {
                smartLinkId: 'smart-price-1',
                configuration: [
                    { price: 899.99, quantity: 1, createdAt: '2024-01-15T00:00:00.000Z' },
                    { price: 879.99, quantity: 5, createdAt: '2024-01-15T00:00:00.000Z' },
                    { price: 859.99, quantity: 10, createdAt: '2024-01-15T00:00:00.000Z' },
                ],
            },
            measure: 'Unit',
            details: {
                SummaryData: {
                    Datasheet: 'datasheet-spm-001.pdf',
                    TaxonomyPath: 'Electronics > Smartphones > Flagship',
                    TaxonomyPathIDs: 'cat-001,cat-012,cat-045',
                    SmallImageURL: 'https://example.com/images/smartphone-pro-small.jpg',
                    PartDescription: '5G LTE, 128GB storage, 6.7" display',
                    Manufacturer: 'TechBrand Inc.',
                },
                ParametricData: {
                    Features: [
                        { FeatureName: 'Display Size', FeatureValue: '6.7"', FeatureUnit: 'inches', FeatureID: 'feat-001' },
                        { FeatureName: 'Storage', FeatureValue: '128GB', FeatureUnit: 'GB', FeatureID: 'feat-002' },
                        { FeatureName: 'RAM', FeatureValue: '8GB', FeatureUnit: 'GB', FeatureID: 'feat-003' },
                        { FeatureName: 'Camera', FeatureValue: '108MP', FeatureUnit: 'MP', FeatureID: 'feat-004' },
                        { FeatureName: 'Battery', FeatureValue: '4500mAh', FeatureUnit: 'mAh', FeatureID: 'feat-005' },
                    ],
                },
                ProductImage: {
                    ProductImageSmall: 'https://example.com/images/smartphone-pro-small.jpg',
                    ProductImageLarge: 'https://example.com/images/smartphone-pro-large.jpg',
                },
            },
        },
        {
            _id: 'prod-2',
            erpItemId: 'ERP-002',
            path: 'electronics/laptop',
            category: 'Electronics',
            active: true,
            class: 'Business',
            name: 'Professional Laptop Ultra',
            alias: 'laptop-ultra-pro',
            description: 'High-performance laptop designed for professionals and creative work.',
            code: 'LAP-002',
            manufacturer: 'TechSystems LLC',
            manufacturerCode: 'TSL',
            stock: 75,
            sold: 890,
            priceHistory: [
                { price: 1299.99, active: true, createdAt: '2024-01-01T00:00:00.000Z' },
                { price: 1249.99, active: false, createdAt: '2024-02-01T00:00:00.000Z' },
            ],
            priceConfiguration: {
                smartLinkId: 'smart-price-2',
                configuration: [
                    { price: 1299.99, quantity: 1, createdAt: '2024-01-15T00:00:00.000Z' },
                    { price: 1274.99, quantity: 5, createdAt: '2024-01-15T00:00:00.000Z' },
                    { price: 1249.99, quantity: 10, createdAt: '2024-01-15T00:00:00.000Z' },
                ],
            },
            measure: 'Unit',
            details: {
                SummaryData: {
                    Datasheet: 'datasheet-lap-002.pdf',
                    TaxonomyPath: 'Electronics > Laptops > Business',
                    TaxonomyPathIDs: 'cat-001,cat-020,cat-055',
                    SmallImageURL: 'https://example.com/images/laptop-ultra-small.jpg',
                    PartDescription: 'Intel i7, 16GB RAM, 512GB SSD, 15.6" display',
                    Manufacturer: 'TechSystems LLC',
                },
                ParametricData: {
                    Features: [
                        { FeatureName: 'Processor', FeatureValue: 'Intel i7-12700H', FeatureUnit: 'CPU', FeatureID: 'feat-010' },
                        { FeatureName: 'RAM', FeatureValue: '16GB', FeatureUnit: 'GB', FeatureID: 'feat-011' },
                        { FeatureName: 'Storage', FeatureValue: '512GB', FeatureUnit: 'GB', FeatureID: 'feat-012' },
                        { FeatureName: 'Display', FeatureValue: '15.6"', FeatureUnit: 'inches', FeatureID: 'feat-013' },
                        { FeatureName: 'Graphics', FeatureValue: 'RTX 3060', FeatureUnit: '', FeatureID: 'feat-014' },
                    ],
                },
                ProductImage: {
                    ProductImageSmall: 'https://example.com/images/laptop-ultra-small.jpg',
                    ProductImageLarge: 'https://example.com/images/laptop-ultra-large.jpg',
                },
            },
        },
    ];

    const product = mockProducts.find((p: any) => p.path === path);

    if (!product) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Product not found',
        });
    }

    return {
        status: 'success',
        data: product,
    };
});
