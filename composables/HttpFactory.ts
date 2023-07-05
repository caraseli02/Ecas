import { $Fetch } from 'ohmyfetch';

class HttpFactory {
    private readonly $fetch: $Fetch;

    constructor(fetcher: $Fetch) {
        this.$fetch = fetcher;
    }

    /**
     * method - GET, POST, PUT
     * URL
     **/
    async call<T>(method: string, url: string, data?: object | null, extras = {}): Promise<T> {
        try {
            if (!data) {
                return await this.$fetch(url, { method, ...extras });
            } else {
                return await this.$fetch(url, { method, body: data, ...extras });
            }
        } catch (err) {
            console.log(err);
            return err as T;
        }
    }
}

export default HttpFactory;
