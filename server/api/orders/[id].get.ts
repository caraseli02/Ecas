import { findDemoOrder } from '~/server/utils/mockDashboardDemo';

export default defineEventHandler((event) => {
    const id = getRouterParam(event, 'id');
    const order = findDemoOrder(id);

    if (!order) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Order not found',
        });
    }

    return {
        status: 'success',
        data: {
            order,
            children: [],
        },
    };
});
