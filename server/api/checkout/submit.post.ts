export default defineEventHandler(async (event) => {
  const _body = (await readBody(event)) as {
    cartItems?: unknown[];
    shippingAddress?: unknown;
    billingAddress?: unknown;
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
