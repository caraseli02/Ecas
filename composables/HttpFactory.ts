// No need to import $fetch, it's globally available in Nuxt 3 context
import { useAuthStore } from '~/store/authStore';

interface FetchInstance {
  (url: string, options?: any): Promise<any>;
}

class HttpFactory {
  private readonly $fetch: FetchInstance;

  constructor(fetcher: FetchInstance) {
    this.$fetch = fetcher;
  }

  /**
     * method - GET, POST, PUT
     * URL
     **/
  async call<T>(method: string, url: string, data?: object | null, extras = {}, options: { handle401?: boolean } = {}): Promise<T> {
    const authStore = useAuthStore();

    try {
      const apiOptions: any = { method, ...extras };
      if (data) {
        apiOptions.body = data;
      }
      return await this.$fetch(url, apiOptions);
    }
    catch (err: any) {
      // Only handle 401 if explicitly requested (default: true for backward compatibility)
      if (options.handle401 !== false && err.response?.status === 401) {
        const router = useRouter();
        authStore.signOut();
        router.push('/?signin=true');
        throw new Error('Session expired. Please log in again.');
      }
      throw err;
    }
  }
}

export default HttpFactory;
