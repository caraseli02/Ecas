export default defineEventHandler(async (event) => {
  await readBody(event);

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
