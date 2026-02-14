// No need to import $fetch, it's globally available in Nuxt 3 context

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
    async call<T>(method: string, url: string, data?: object | null, extras = {}): Promise<T> {
        try {
            const options: any = { method, ...extras };
            if (data) {
                options.body = data;
            }
            return await this.$fetch(url, options);
        } catch (err) {
            console.error('API error:', err);
            throw err;
        }
    }
}

export default HttpFactory;
