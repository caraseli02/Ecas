import { mockProducts } from '~/server/utils/mockProducts';

export default defineEventHandler(async (event) => {
    const path = getRouterParam(event, 'path');

    const product = mockProducts.find((p: any) => p.path === path);

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
