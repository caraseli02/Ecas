export default defineEventHandler(async (event) => {
    const body = (await readBody(event)) as {
        keyword?: string;
        category?: string;
        page?: number;
        perPage?: number;
    };

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
                {
                    price: 999.99,
                    active: true,
                    createdAt: '2024-01-15T10:30:00Z',
                },
            ],
            details: {
                description: 'Latest flagship smartphone with cutting-edge features and premium build quality.',
                images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'],
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
                {
                    price: 1499.99,
                    active: true,
                    createdAt: '2024-01-15T10:30:00Z',
                },
            ],
            details: {
                description: 'High-performance laptop designed for professionals and creative work.',
                images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'],
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
                {
                    price: 149.99,
                    active: true,
                    createdAt: '2024-01-15T10:30:00Z',
                },
            ],
            details: {
                description: 'Premium mechanical keyboard with customizable RGB backlighting.',
                images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'],
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
                {
                    price: 299.99,
                    active: true,
                    createdAt: '2024-01-15T10:30:00Z',
                },
            ],
            details: {
                description: 'High-quality wireless headphones with active noise cancellation.',
                images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
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
                {
                    price: 79.99,
                    active: true,
                    createdAt: '2024-01-15T10:30:00Z',
                },
            ],
            details: {
                description: 'Portable Bluetooth speaker with powerful sound and long battery life.',
                images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'],
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
                {
                    price: 799.99,
                    active: true,
                    createdAt: '2024-01-15T10:30:00Z',
                },
            ],
            details: {
                description: 'High-end tablet with stunning display and powerful performance.',
                images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'],
            },
        },
    ];

    let filteredProducts = mockProducts;

    if (body.keyword) {
        const keyword = body.keyword.toLowerCase();
        filteredProducts = mockProducts.filter(
            (p: any) =>
                p.name.toLowerCase().includes(keyword) ||
                p.description?.toLowerCase().includes(keyword) ||
                p.manufacturer?.toLowerCase().includes(keyword) ||
                p.code?.toLowerCase().includes(keyword)
        );
    }

    if (body.category) {
        filteredProducts = filteredProducts.filter((p: any) => p.category?.toLowerCase() === body.category?.toLowerCase());
    }

    return {
        status: 'success',
        data: {
            products: filteredProducts,
            page: body.page || 1,
            perPage: body.perPage || 10,
            total: filteredProducts.length,
        },
    };
});
