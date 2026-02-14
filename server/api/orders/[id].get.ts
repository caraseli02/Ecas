export default defineEventHandler(async (event) => {
    const orderId = getRouterParam(event, 'id');

    const mockOrders = [
        {
            _id: 'ord-1',
            orderNumber: 'ORD-54321',
            status: 'delivered',
            total: 2199.97,
            subtotal: 1999.98,
            tax: 199.99,
            shipping: 9.99,
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-01-18T15:30:00Z',
            items: [
                {
                    _id: 'item-1',
                    productId: 'prod-1',
                    productName: 'SmartPhone Pro Max',
                    productCode: 'SPM-001',
                    quantity: 2,
                    price: 999.99,
                    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
                },
            ],
            shippingAddress: {
                firstName: 'Portfolio',
                lastName: 'Demo User',
                address: '123 Demo Street',
                city: 'San Francisco',
                region: 'California',
                postcode: '94105',
                country: 'US',
            },
            billingAddress: {
                firstName: 'Portfolio',
                lastName: 'Demo User',
                address: '123 Demo Street',
                city: 'San Francisco',
                region: 'California',
                postcode: '94105',
                country: 'US',
            },
            trackingNumber: 'TRK-123456789',
            carrier: 'Demo Express',
        },
        {
            _id: 'ord-2',
            orderNumber: 'ORD-54320',
            status: 'shipped',
            total: 159.98,
            subtotal: 149.99,
            tax: 0,
            shipping: 9.99,
            createdAt: '2024-01-10T14:30:00Z',
            updatedAt: '2024-01-12T09:00:00Z',
            items: [
                {
                    _id: 'item-2',
                    productId: 'prod-3',
                    productName: 'Mechanical Keyboard RGB',
                    productCode: 'KEY-003',
                    quantity: 1,
                    price: 149.99,
                    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
                },
            ],
            shippingAddress: {
                firstName: 'Portfolio',
                lastName: 'Demo User',
                address: '123 Demo Street',
                city: 'San Francisco',
                region: 'California',
                postcode: '94105',
                country: 'US',
            },
            billingAddress: {
                firstName: 'Portfolio',
                lastName: 'Demo User',
                address: '123 Demo Street',
                city: 'San Francisco',
                region: 'California',
                postcode: '94105',
                country: 'US',
            },
            trackingNumber: 'TRK-987654321',
            carrier: 'Demo Express',
        },
    ];

    const order = mockOrders.find((o) => o._id === orderId || o.orderNumber === orderId);

    if (!order) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Order not found',
        });
    }

    return {
        status: 'success',
        data: order,
    };
});
