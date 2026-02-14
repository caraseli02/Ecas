let mockCart = [
    {
        _id: 'cart-item-1',
        productId: 'prod-1',
        quantity: 2,
        product: {
            _id: 'prod-1',
            name: 'SmartPhone Pro Max',
            code: 'SPM-001',
            priceHistory: [{ price: 999.99, active: true, createdAt: '2024-01-15T10:30:00Z' }],
            details: {
                images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'],
            },
        },
    },
];

export default defineEventHandler(async (event) => {
    const body = (await readBody(event)) as {
        productId: string;
    };
    const headers = getHeaders(event);
    const token = headers.authorization?.replace('Bearer ', '');

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }

    mockCart = mockCart.filter((item) => item.productId !== body.productId);

    return {
        status: 'success',
        data: {
            items: mockCart,
            subtotal: mockCart.reduce((sum, item) => sum + item.quantity * 100, 0),
            tax: mockCart.reduce((sum, item) => sum + item.quantity * 10, 0),
            total: mockCart.reduce((sum, item) => sum + item.quantity * 110, 0),
        },
    };
});
