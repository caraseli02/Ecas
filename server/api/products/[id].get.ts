export default defineEventHandler(async (event) => {
    const productId = getRouterParam(event, 'id');

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
            favourite: false,
            priceHistory: [
                { price: 999.99, active: true, createdAt: '2024-01-01T00:00:00.000Z' },
                { price: 949.99, active: false, createdAt: '2024-02-01T00:00:00.000Z' },
            ],
            priceConfiguration: {
                smartLinkId: 'smart-price-1',
                configuration: [
                    { price: 999.99, quantity: 1, createdAt: '2024-01-15T00:00:00.000Z' },
                    { price: 979.99, quantity: 5, createdAt: '2024-01-15T00:00:00.000Z' },
                    { price: 959.99, quantity: 10, createdAt: '2024-01-15T00:00:00.000Z' },
                ],
            },
            measure: 'Unit',
            details: {
                SummaryData: {
                    Datasheet: 'datasheet-spm-001.pdf',
                    TaxonomyPath: 'Electronics > Smartphones > Flagship',
                    TaxonomyPathIDs: 'cat-001,cat-012,cat-045',
                    SmallImageURL: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200',
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
                    ProductImageSmall: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200',
                    ProductImageLarge: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
                    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'],
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
            favourite: true,
            priceHistory: [
                { price: 1499.99, active: true, createdAt: '2024-01-01T00:00:00.000Z' },
                { price: 1449.99, active: false, createdAt: '2024-02-01T00:00:00.000Z' },
            ],
            priceConfiguration: {
                smartLinkId: 'smart-price-2',
                configuration: [
                    { price: 1499.99, quantity: 1, createdAt: '2024-01-15T00:00:00.000Z' },
                    { price: 1474.99, quantity: 5, createdAt: '2024-01-15T00:00:00.000Z' },
                    { price: 1449.99, quantity: 10, createdAt: '2024-01-15T00:00:00.000Z' },
                ],
            },
            measure: 'Unit',
            details: {
                SummaryData: {
                    Datasheet: 'datasheet-lap-002.pdf',
                    TaxonomyPath: 'Electronics > Laptops > Business',
                    TaxonomyPathIDs: 'cat-001,cat-020,cat-055',
                    SmallImageURL: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200',
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
                    ProductImageSmall: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200',
                    ProductImageLarge: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
                    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'],
                },
            },
        },
        {
            _id: 'prod-3',
            erpItemId: 'ERP-003',
            path: 'components/keyboard',
            category: 'Components',
            active: true,
            class: 'Standard',
            name: 'Mechanical Keyboard RGB',
            alias: 'keyboard-mech-rgb',
            description: 'Premium mechanical keyboard with customizable RGB backlighting.',
            code: 'KEY-003',
            manufacturer: 'InputDevices Corp',
            manufacturerCode: 'IDC',
            stock: 500,
            sold: 2340,
            favourite: false,
            priceHistory: [
                { price: 149.99, active: true, createdAt: '2024-01-01T00:00:00.000Z' },
                { price: 139.99, active: false, createdAt: '2024-02-01T00:00:00.000Z' },
            ],
            priceConfiguration: {
                smartLinkId: 'smart-price-3',
                configuration: [
                    { price: 149.99, quantity: 1, createdAt: '2024-01-15T00:00:00.000Z' },
                    { price: 144.99, quantity: 5, createdAt: '2024-01-15T00:00:00.000Z' },
                    { price: 139.99, quantity: 10, createdAt: '2024-01-15T00:00:00.000Z' },
                ],
            },
            measure: 'Unit',
            details: {
                SummaryData: {
                    Datasheet: 'datasheet-key-003.pdf',
                    TaxonomyPath: 'Components > Keyboards > Mechanical',
                    TaxonomyPathIDs: 'cat-003,cat-030,cat-060',
                    SmallImageURL: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200',
                    PartDescription: 'Cherry MX switches, RGB lighting, Full-size',
                    Manufacturer: 'InputDevices Corp',
                },
                ParametricData: {
                    Features: [
                        { FeatureName: 'Switch Type', FeatureValue: 'Cherry MX Blue', FeatureUnit: '', FeatureID: 'feat-020' },
                        { FeatureName: 'Backlight', FeatureValue: 'RGB', FeatureUnit: '', FeatureID: 'feat-021' },
                        { FeatureName: 'Layout', FeatureValue: 'Full-size', FeatureUnit: '', FeatureID: 'feat-022' },
                    ],
                },
                ProductImage: {
                    ProductImageSmall: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200',
                    ProductImageLarge: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800',
                    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'],
                },
            },
        },
        {
            _id: 'prod-4',
            erpItemId: 'ERP-004',
            path: 'audio/headphones',
            category: 'Audio',
            active: true,
            class: 'Premium',
            name: 'Wireless Noise-Canceling Headphones',
            alias: 'headphones-nc-wireless',
            description: 'High-quality wireless headphones with active noise cancellation.',
            code: 'AUD-004',
            manufacturer: 'SoundMaster Inc',
            manufacturerCode: 'SMI',
            stock: 200,
            sold: 1560,
            favourite: false,
            priceHistory: [
                { price: 299.99, active: true, createdAt: '2024-01-01T00:00:00.000Z' },
                { price: 279.99, active: false, createdAt: '2024-02-01T00:00:00.000Z' },
            ],
            priceConfiguration: {
                smartLinkId: 'smart-price-4',
                configuration: [
                    { price: 299.99, quantity: 1, createdAt: '2024-01-15T00:00:00.000Z' },
                    { price: 289.99, quantity: 5, createdAt: '2024-01-15T00:00:00.000Z' },
                    { price: 279.99, quantity: 10, createdAt: '2024-01-15T00:00:00.000Z' },
                ],
            },
            measure: 'Unit',
            details: {
                SummaryData: {
                    Datasheet: 'datasheet-aud-004.pdf',
                    TaxonomyPath: 'Audio > Headphones > Wireless',
                    TaxonomyPathIDs: 'cat-004,cat-040,cat-070',
                    SmallImageURL: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
                    PartDescription: 'Active noise cancellation, 30hr battery, Bluetooth 5.0',
                    Manufacturer: 'SoundMaster Inc',
                },
                ParametricData: {
                    Features: [
                        { FeatureName: 'Driver Size', FeatureValue: '40mm', FeatureUnit: 'mm', FeatureID: 'feat-030' },
                        { FeatureName: 'Battery Life', FeatureValue: '30', FeatureUnit: 'hours', FeatureID: 'feat-031' },
                        { FeatureName: 'Bluetooth', FeatureValue: '5.0', FeatureUnit: '', FeatureID: 'feat-032' },
                    ],
                },
                ProductImage: {
                    ProductImageSmall: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
                    ProductImageLarge: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
                    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
                },
            },
        },
        {
            _id: 'prod-5',
            erpItemId: 'ERP-005',
            path: 'audio/speaker',
            category: 'Audio',
            active: true,
            class: 'Standard',
            name: 'Bluetooth Speaker Portable',
            alias: 'speaker-bluetooth-portable',
            description: 'Portable Bluetooth speaker with powerful sound and long battery life.',
            code: 'SPK-005',
            manufacturer: 'AudioTech Ltd',
            manufacturerCode: 'ATL',
            stock: 350,
            sold: 1800,
            favourite: true,
            priceHistory: [
                { price: 79.99, active: true, createdAt: '2024-01-01T00:00:00.000Z' },
                { price: 69.99, active: false, createdAt: '2024-02-01T00:00:00.000Z' },
            ],
            priceConfiguration: {
                smartLinkId: 'smart-price-5',
                configuration: [
                    { price: 79.99, quantity: 1, createdAt: '2024-01-15T00:00:00.000Z' },
                    { price: 74.99, quantity: 5, createdAt: '2024-01-15T00:00:00.000Z' },
                    { price: 69.99, quantity: 10, createdAt: '2024-01-15T00:00:00.000Z' },
                ],
            },
            measure: 'Unit',
            details: {
                SummaryData: {
                    Datasheet: 'datasheet-spk-005.pdf',
                    TaxonomyPath: 'Audio > Speakers > Bluetooth',
                    TaxonomyPathIDs: 'cat-004,cat-041,cat-071',
                    SmallImageURL: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200',
                    PartDescription: '20W output, IPX5 water resistant, 12hr battery',
                    Manufacturer: 'AudioTech Ltd',
                },
                ParametricData: {
                    Features: [
                        { FeatureName: 'Power Output', FeatureValue: '20', FeatureUnit: 'W', FeatureID: 'feat-040' },
                        { FeatureName: 'Battery Life', FeatureValue: '12', FeatureUnit: 'hours', FeatureID: 'feat-041' },
                        { FeatureName: 'Water Resistant', FeatureValue: 'IPX5', FeatureUnit: '', FeatureID: 'feat-042' },
                    ],
                },
                ProductImage: {
                    ProductImageSmall: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200',
                    ProductImageLarge: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
                    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'],
                },
            },
        },
        {
            _id: 'prod-6',
            erpItemId: 'ERP-006',
            path: 'electronics/tablet',
            category: 'Electronics',
            active: true,
            class: 'Premium',
            name: 'Premium Tablet Pro',
            alias: 'tablet-premium-pro',
            description: 'High-end tablet with stunning display and powerful performance.',
            code: 'TAB-006',
            manufacturer: 'TechBrand Inc.',
            manufacturerCode: 'TBI',
            stock: 120,
            sold: 950,
            favourite: false,
            priceHistory: [
                { price: 799.99, active: true, createdAt: '2024-01-01T00:00:00.000Z' },
                { price: 749.99, active: false, createdAt: '2024-02-01T00:00:00.000Z' },
            ],
            priceConfiguration: {
                smartLinkId: 'smart-price-6',
                configuration: [
                    { price: 799.99, quantity: 1, createdAt: '2024-01-15T00:00:00.000Z' },
                    { price: 779.99, quantity: 5, createdAt: '2024-01-15T00:00:00.000Z' },
                    { price: 759.99, quantity: 10, createdAt: '2024-01-15T00:00:00.000Z' },
                ],
            },
            measure: 'Unit',
            details: {
                SummaryData: {
                    Datasheet: 'datasheet-tab-006.pdf',
                    TaxonomyPath: 'Electronics > Tablets > Premium',
                    TaxonomyPathIDs: 'cat-001,cat-013,cat-046',
                    SmallImageURL: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200',
                    PartDescription: '11" OLED display, 256GB storage, Apple Pencil support',
                    Manufacturer: 'TechBrand Inc.',
                },
                ParametricData: {
                    Features: [
                        { FeatureName: 'Display Size', FeatureValue: '11"', FeatureUnit: 'inches', FeatureID: 'feat-050' },
                        { FeatureName: 'Storage', FeatureValue: '256GB', FeatureUnit: 'GB', FeatureID: 'feat-051' },
                        { FeatureName: 'RAM', FeatureValue: '8GB', FeatureUnit: 'GB', FeatureID: 'feat-052' },
                    ],
                },
                ProductImage: {
                    ProductImageSmall: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200',
                    ProductImageLarge: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
                    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'],
                },
            },
        },
    ];

    const product = mockProducts.find((p: any) => p._id === productId);

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
