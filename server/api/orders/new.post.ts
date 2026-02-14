export default defineEventHandler(async (event) => {
    const body = (await readBody(event)) as {
        items?: any[];
        shippingAddress?: any;
        billingAddress?: any;
        shippingMethod?: string;
        paymentMethod?: string;
    };

    const orderId = 'ord-' + Date.now();
    const orderNumber = 'ORD-' + Math.floor(Math.random() * 100000);

    return {
        status: 'success',
        data: {
            _id: orderId,
            orderNumber,
            status: 'pending',
            message: 'Order created successfully',
            total: 2199.97,
            redirectUrl: `/order-summary/${orderId}`,
        },
    };
});
