import HttpFactory from '@/composables/HttpFactory';
import { PaginatedUserRequest } from '~/model/user/request/PaginatedUserRequest';
import { useAuthStore } from "~/store/authStore";

class UserService extends HttpFactory {
    private RESOURCE = '/user';

    private token = useAuthStore().getToken ?? null

    async fetchPaginatedUser(params: PaginatedUserRequest) {
        let baseURL = useRuntimeConfig().public.BASE_URL_API
        let { data, error } = await useFetchAPI(`${baseURL}/${this.RESOURCE}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        })

        if (error.value) {
            return error.value
        }

        return data
    }
}

export default UserService