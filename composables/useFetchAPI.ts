import { useFetch } from "#app";

type useFetchType = typeof useFetch;

// wrap useFetch with configuration needed to talk to our API
export const useFetchAPI: useFetchType = (path, options = {}) => {
    const config = useRuntimeConfig();

    // modify options as needed
    options.baseURL = config.public.BASE_URL_API;
    options.headers = {
        "Content-Type": "application/json",
    };

    return useFetch(path, options);
};
