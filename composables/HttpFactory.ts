// No need to import $fetch, it's globally available in Nuxt 3 context

class HttpFactory {
    private readonly $fetch;

    constructor(fetcher) {
        this.$fetch = fetcher;
    }

    /**
     * method - GET, POST, PUT
     * URL
     **/
    async call<T>(method: string, url: string, data?: object | null, extras = {}): Promise<T> {
        try {
            const options = { method, ...extras };
            if (data) {
                options.body = data;
            }
            return await this.$fetch(url, options);
        } catch (err) {
            console.error(err);
            return err as T;
        }
    }
}

export default HttpFactory;
