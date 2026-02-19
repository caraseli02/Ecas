import { getMockUserFromAuthHeader } from '~/server/utils/mockUsers';

export default defineEventHandler((event) => {
  const headers = getHeaders(event);
  const user = getMockUserFromAuthHeader(headers.authorization);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const credit = user.adminSettings?.customerCredit;

  return {
    status: 'success',
    data: {
      limit: credit?.limit || 0,
      spent: credit?.spent || 0,
      available: credit?.available || 0,
      dueDate: credit?.dueDate || '',
      tillDue: credit?.tillDue || '',
      term: credit?.term || '',
      freeze: credit?.freeze || false,
      active: credit?.active ?? true,
    },
  };
});
