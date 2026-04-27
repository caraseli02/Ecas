export default defineEventHandler(async (event) => {
  await readBody(event);

  return {
    status: 'success',
    data: {
      valid: true,
      message: 'Order validation successful',
      shippingOptions: [
        {
          id: 'shipping-standard',
          name: 'Standard Shipping',
          price: 9.99,
          estimatedDays: 5,
        },
        {
          id: 'shipping-express',
          name: 'Express Shipping',
          price: 19.99,
          estimatedDays: 2,
        },
      ],
    },
  };
});
