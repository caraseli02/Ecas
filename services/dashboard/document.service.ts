import { useAuthStore } from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';

class DocumentService extends HttpFactory {
    private DOCUMENT_RESOURCE = '/document';

    private authStore = useAuthStore();

    async downloadDocument(id: string) {
        const token = this.authStore.getToken();

        return await this.call<any>('GET', `${this.DOCUMENT_RESOURCE}/${id}`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export default DocumentService;
