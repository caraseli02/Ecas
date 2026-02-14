const mockCart = [
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
    const headers = getHeaders(event);
    const token = headers.authorization?.replace('Bearer ', '');

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }

    return {
        status: 'success',
        data: {
            items: mockCart,
            subtotal: 1999.98,
            tax: 199.99,
            total: 2199.97,
        },
    };
});
