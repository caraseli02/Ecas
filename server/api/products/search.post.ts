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
                p.code?.toLowerCase().includes(keyword),
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
