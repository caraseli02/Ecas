import { $fetch, FetchOptions } from 'ohmyfetch';
import { defineNuxtPlugin } from '#app';
import ProductService from '~/services/products.service';
import AuthService from '~/services/auth.service';

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
    product: ProductService
    auth: AuthService
}

export default defineNuxtPlugin((nuxtApp) => {

    const fetchOptions: FetchOptions = {
        baseURL: nuxtApp.$config.public.BASE_URL_API,
    }

    /** create a new instance of $fetcher with custom option */
    const apiFetcher = $fetch.create(fetchOptions);

    /** an object containing all repositories we need to expose */
    const modules: IApiInstance = {
        product: new ProductService(apiFetcher),
        auth: new AuthService(apiFetcher)
    };

    return {
        provide: {
            api: modules,
        },
    };
});