export default defineEventHandler(async (event) => {
    const query = getQuery(event) as { page?: string; perPage?: string };

    const mockOrders = [
        {
            _id: 'ord-1',
            orderNumber: 'ORD-54321',
            status: 'delivered',
            total: 2199.97,
            createdAt: '2024-01-15T10:00:00Z',
            items: [
                {
                    _id: 'item-1',
                    productId: 'prod-1',
                    productName: 'SmartPhone Pro Max',
                    quantity: 2,
                    price: 999.99,
                },
            ],
        },
        {
            _id: 'ord-2',
            orderNumber: 'ORD-54320',
            status: 'shipped',
            total: 149.99,
            createdAt: '2024-01-10T14:30:00Z',
            items: [
                {
                    _id: 'item-2',
                    productId: 'prod-3',
                    productName: 'Mechanical Keyboard RGB',
                    quantity: 1,
                    price: 149.99,
                },
            ],
        },
    ];

    const page = parseInt(query.page || '1');
    const perPage = parseInt(query.perPage || '10');

    return {
        status: 'success',
        data: {
            orders: mockOrders,
            page,
            perPage,
            total: mockOrders.length,
        },
    };
});
