import HttpFactory from '@/composables/HttpFactory';
import { useAuthStore } from '~/store/authStore';
import type { ICreatePayload } from '~/types/dashboard/categories';

class CategoriesService extends HttpFactory {
    private RESOURCE = '/taxonomy';
    private authStore = useAuthStore();

    private authenticatedCall<T>(method: string, endpoint: string, data?: object | null): Promise<T> {
        const token = this.authStore.getToken();
        const headers = { Authorization: `Bearer ${token}` };
        const extras = data ? { body: data, headers } : { headers };
        return this.call<T>(method, endpoint, data, extras);
    }

    async create(taxonomyId: string, payload: ICreatePayload) {
        return await this.authenticatedCall('POST', `${this.RESOURCE}/${taxonomyId}/category`, payload);
    }

    async get() {
        return await this.authenticatedCall('GET', `${this.RESOURCE}`);
    }

    async delete(taxonomyId: string, categoryIds: string[]) {
        return await this.authenticatedCall('DELETE', `${this.RESOURCE}/${taxonomyId}/category`, { categoryIds });
    }

    async update(taxonomyId: string, categoryId: string, payload: ICreatePayload) {
        return await this.authenticatedCall('PATCH', `${this.RESOURCE}/${taxonomyId}/category/${categoryId}`, payload);
    }

    async toggleStatus(taxonomyId: string, categoryId: string) {
        return await this.authenticatedCall('PATCH', `${this.RESOURCE}/${taxonomyId}/category/${categoryId}/toggle-status`);
    }

    async merge(taxonomyId: string, sourceIds: string[], targetID: string) {
        return await this.authenticatedCall('POST', `${this.RESOURCE}/${taxonomyId}/category/merge/${targetID}`, { sourceIds });
    }

    async move(taxonomyId: string, categoryIds: string[], parentId: string) {
        return await this.authenticatedCall('POST', `${this.RESOURCE}/${taxonomyId}/category/move/${parentId}`, { categoryIds });
    }
}

export default CategoriesService;
