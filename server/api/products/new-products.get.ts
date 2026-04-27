import { mockProducts } from '~/server/utils/mockProducts';

export default defineEventHandler(async () => {
  const newProducts = mockProducts.filter((p: unknown) => p.class === 'Premium' || p.favourite === true).slice(0, 8);

  return {
    status: 'success',
    data: newProducts,
  };
});
