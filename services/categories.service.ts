import HttpFactory from '@/composables/HttpFactory';
import { useAuthStore } from '~/store/authStore';
import type { ICreatePayload } from '~/types/dashboard/categories';

class CategoriesService extends HttpFactory {
    private RESOURCE = '/taxonomy';

    async create(taxonomyId: string, payload: ICreatePayload) {
        const token = this.authStore.getToken();
        return await this.call('POST', `${this.RESOURCE}/${taxonomyId}/category`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async delete(taxonomyId: string, categoryIds: string[]) {
        const token = this.authStore.getToken();
        return await this.call(
            'DELETE',
            `${this.RESOURCE}/${taxonomyId}/category`,
            { categoryIds },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    }

    async update(taxonomyId: string, categoryId: string, payload: ICreatePayload) {
        const token = this.authStore.getToken();
        return await this.call('PATCH', `${this.RESOURCE}/${taxonomyId}/category/${categoryId}`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async toggleStatus(taxonomyId: string, categoryId: string) {
        const token = this.authStore.getToken();
        return await this.call('PATCH', `${this.RESOURCE}/${taxonomyId}/category/${categoryId}/toggle-status`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async merge(taxonomyId: string, sourceIds: string[], targetID: string) {
        const token = this.authStore.getToken();
        return await this.call(
            'POST',
            `${this.RESOURCE}/${taxonomyId}/category/merge/${targetID}`,
            { sourceIds },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    }

    async move(taxonomyId: string, categoryIds: string[], parentId: string) {
        const token = this.authStore.getToken();
        return await this.call(
            'POST',
            `${this.RESOURCE}/${taxonomyId}/category/move/${parentId}`,
            { categoryIds },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    }
}

export default CategoriesService;
