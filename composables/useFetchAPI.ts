import { useFetch } from "#app";

type useFetchType = typeof useFetch;

// wrap useFetch with configuration needed to talk to our API
export const useFetchAPI: useFetchType = (path, options: any) => {
    const config = useRuntimeConfig();

    let headers = {
        accept: 'application/json',
        ...options?.headers,
    }

    if (process.server) {
        headers = {
            ...headers,
            ...useRequestHeaders(['cookie']),
            referer: config.public.baseURL
        }
    }

    return useFetch(path, {
        baseURL: config.public.BASE_URL_API,
        headers,
        ...options,
    });
};
