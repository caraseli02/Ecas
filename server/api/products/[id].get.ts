import { mockProducts } from '~/server/utils/mockProducts';

export default defineEventHandler(async (event) => {
    const productId = getRouterParam(event, 'id');

    const product = mockProducts.find((p: any) => p._id === productId);

    if (!product) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Product not found',
        });
    }

    return {
        status: 'success',
        data: product,
    };
});
