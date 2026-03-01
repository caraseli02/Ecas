import { findDemoOrder } from '~/server/utils/mockDashboardDemo';
import { findRuntimeOrder } from '~/server/utils/mockRuntimeOrders';

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id');
  const runtimeOrder = findRuntimeOrder(id);

  if (runtimeOrder) {
    return {
      status: 'success',
      data: runtimeOrder,
    };
  }

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
