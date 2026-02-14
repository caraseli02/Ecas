export default defineEventHandler(async (event) => {
    const body = (await readBody(event)) as {
        cartItems?: any[];
        shippingAddress?: any;
        billingAddress?: any;
        paymentMethod?: string;
    };

    return {
        status: 'success',
        data: {
            orderId: 'ord-' + Date.now(),
            orderNumber: 'ORD-' + Math.floor(Math.random() * 100000),
            status: 'pending',
            message: 'Order submitted successfully',
            redirectUrl: '/checkout/session/' + Date.now(),
        },
    };
});
