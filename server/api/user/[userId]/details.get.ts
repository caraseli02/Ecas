import { UserPermissionsEnum } from '~/types/auth/permissions';
import { getMockUserById, getMockUserFromAuthHeader } from '~/server/utils/mockUsers';

export default defineEventHandler((event) => {
  const headers = getHeaders(event);
  const requester = getMockUserFromAuthHeader(headers.authorization);
  const userId = getRouterParam(event, 'userId');
  const user = getMockUserById(userId);

  if (!requester) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    });
  }

  const isSelfRequest = requester._id === user._id;
  const isAdmin = requester.permissions.includes(UserPermissionsEnum.AdminDashboardRead);

  if (!isSelfRequest && !isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    });
  }

  return {
    status: 'success',
    data: user,
  };
});
