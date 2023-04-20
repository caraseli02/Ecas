import { useFetch } from "#app";

type useFetchType = typeof useFetch;

// wrap useFetch with configuration needed to talk to our API
export const useFetchAPI: useFetchType = (path, options: any) => {
    const config = useRuntimeConfig();

    options.baseURL = config.BASE_URL_API;

    return useFetch(path, {
        ...options,
        onRequest({ request, options }) {

        },
        onResponse({ request, response, options }) {

        },
        onResponseError({ request, response, options }) {

        }
    });
};
