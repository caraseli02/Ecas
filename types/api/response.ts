export interface ApiSuccessResponse<T> {
    status: 'success';
    data: T;
}

export interface ApiErrorResponse {
    status: 'error';
    error: { message: string; code: number };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function isSuccessResponse<T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> {
    return response.status === 'success';
}
