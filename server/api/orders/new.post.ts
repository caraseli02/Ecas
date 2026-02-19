import { PaymentTypeEnum, PaymentStatusEnum } from '~/types/order-summary/item';
import { createRuntimeOrder } from '~/server/utils/mockRuntimeOrders';
import { getMockUserFromAuthHeader } from '~/server/utils/mockUsers';

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as Record<string, unknown>;
  const headers = getHeaders(event);
  const user = getMockUserFromAuthHeader(headers.authorization);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { orderId } = createRuntimeOrder(body, user);
  const paymentType = (body.paymentDetails as { type?: PaymentTypeEnum } | undefined)?.type;

  return {
    status: 'success',
    data: {
      orderId,
      status: PaymentStatusEnum.Paid,
      useExistingPaymentMethod: Boolean(body.stripeCardId),
      result:
                paymentType === PaymentTypeEnum.Card
                  ? {
                      status: 'succeeded',
                    }
                  : undefined,
      clientSecret: undefined,
    },
  };
});
