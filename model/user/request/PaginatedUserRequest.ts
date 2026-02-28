export interface PaginatedUserRequest {
  page: number;
  perPage: 10;
  firstName?: string;
  lastName?: string;
  email?: string;
}
