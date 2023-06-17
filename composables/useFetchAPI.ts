type useFetchType = typeof useFetch;

export const useFetchAPI: useFetchType = async (url, params) => {
    const cookie = useCookie("token");
    const runtimeConfig = useRuntimeConfig()

    const opts = {
        key: url,
        baseURL: runtimeConfig.public.BASE_URL_API,

        async onRequest({ options }) {
            options.headers = options.headers || {};

            if (cookie.value) {
                options.headers["x-access-token"] = cookie.value;
            }
        },

        async onRequestError({ error }) {
            console.log(error.message);
        },

        async onResponseError({ response }) {
            console.log(response._data.message);
        },

        ...params,
    };

    const { data, pending, error, execute } = await useFetch(url, opts);

    return {
        data,
        pending,
        error,
        execute,
    };
};
