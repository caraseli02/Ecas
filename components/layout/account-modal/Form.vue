<template>
    <div class="mx-auto">
        <div class="grid grid-cols-1 gap-4 mb-[15px]">
            <FormInput v-model="email.value" size="lg" label="E-mail" :error="email.error" type="email" placeholder="you@company.com" />
            <FormPassword v-model="password.value" size="lg" label="Password" :error="password.error" placeholder="Your Password" />
        </div>
        <div class="flex items-center justify-between mb-[36px]">
            <label class="flex items-center cursor-pointer">
                <input v-model="rememberMe" type="checkbox" class="sr-only" />
                <div
                    class="flex items-center justify-center w-[18px] h-[18px] rounded border transition-colors duration-300 mr-2"
                    :class="[rememberMe ? 'bg-blue-500 border-blue-500' : 'border-[#CBCDD7]']"
                >
                    <CheckIcon v-if="rememberMe" class="w-4 text-white" />
                </div>
                <span class="text-xs text-slate-500 select-none"> Remember me </span>
            </label>
            <NuxtLink to="/actions?mode=forgotPassword" class="flex text-xs font-medium text-gray-500 hover:text-blue-500">
                Forgot password?
            </NuxtLink>
        </div>
        <button
            class="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-400 rounded-lg py-[10px] text-white mb-4"
            @click="handleSignIn"
        >
            <div v-if="isLoading" aria-label="Loading..." role="status" class="mr-3">
                <svg class="h-6 w-6 animate-spin" viewBox="3 3 18 18">
                    <path
                        class="fill-gray-200"
                        d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                    ></path>
                    <path
                        class="fill-gray-800"
                        d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                    ></path>
                </svg>
            </div>
            <SignINIcon v-else class="w-6 h-6 mr-2" />
            <span class="text-sm font-medium"> Sign In </span>
        </button>
        <div v-if="errorResponse.show" class="bg-rose-600 p-2 my-3 rounded">
            <p class="text-white">{{ errorResponse.description }}</p>
        </div>
        <div class="flex items-center justify-between mx-auto text-sm font-medium text-gray-500 mb-[25px]">
            <span class="mr-2 text-slate-500 font-normal text-sm"> Don’t have an account ? </span>
            <NuxtLink
                to="/signup"
                class="relative text-blue-500 hover:text-blue-400 after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:origin-right after:scale-x-0 after:rounded-full after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
            >
                Sign up now
            </NuxtLink>
        </div>
        <div class="flex items-center mt-12 mb-6">
            <div class="h-px flex-1 bg-gray-100" />
            <span class="text-xs text-gray-400 flex-shrink-0 mx-[18px]"> Or continue with </span>
            <div class="h-px flex-1 bg-gray-100" />
        </div>
        <button
            class="group flex items-center justify-center w-full border border-border py-2 rounded-lg mb-5 transition-colors duration-300 hover:border-blue-500"
            @click="loginWithGoogle"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mr-2 transition-all duration-300">
                <g clip-path="url(#clip0_154_2471)">
                    <path
                        fill="#4285F4"
                        d="M21.788 12.225c0-.659-.058-1.284-.158-1.892h-9.417v3.758h5.392c-.242 1.234-.95 2.275-2 2.984v2.5h3.216c1.884-1.742 2.967-4.309 2.967-7.35Z"
                    />
                    <path
                        fill="#34A853"
                        d="M12.212 22c2.7 0 4.958-.9 6.608-2.425l-3.216-2.5c-.9.6-2.042.966-3.392.966-2.608 0-4.817-1.758-5.608-4.133H3.287v2.575C4.93 19.75 8.304 22 12.212 22Z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M6.605 13.908A5.803 5.803 0 0 1 6.288 12c0-.667.117-1.308.317-1.908V7.517H3.288a9.884 9.884 0 0 0 0 8.966l3.317-2.575Z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12.212 5.958c1.475 0 2.792.509 3.833 1.5l2.85-2.85C17.17 2.992 14.912 2 12.212 2 8.304 2 4.93 4.25 3.287 7.517l3.317 2.575c.791-2.375 3-4.134 5.608-4.134Z"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_154_2471">
                        <path fill="#fff" d="M2 2h20v20H2z" />
                    </clipPath>
                </defs>
            </svg>
            <span class="text-sm font-medium text-slate-500">Google</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import SignINIcon from '@/assets/icons/menu/in.svg';
import CheckIcon from '@/assets/icons/check.svg';
import { SigninResponse, UserDetailsResponse, UserInfoJWT } from '~~/types';
import { useAuthStore } from '~~/store/authStore';
import { UserDetails } from '~~/types/auth/user-details';
import Emitter from 'tiny-emitter/instance.js';
import { useCartStore } from '~/store/cartStore';

const { checkForInputErrors } = useError();
const { $api } = useNuxtApp();
const cartStore = useCartStore();

const email = ref({
    value: '',
    error: '',
    type: 'email',
});
const password = ref({
    value: '',
    error: '',
});

const rememberMe = ref(false);
const isLoading = ref(false);

const errorResponse = reactive({
    show: false,
    status: '',
    description: '',
    code: 0,
});

const authStore = useAuthStore();
const { registerUser, getParsedFirebaseJWTToken, getUserToken } = useFirebaseAuth();

const handleSignIn = async () => {
    const hasError = checkForInputErrors([email.value, password.value]);

    if (!hasError) {
        const payload = {
            email: email.value.value,
            password: password.value.value,
        };

        isLoading.value = true;

        try {
            const response = (await $api.auth.login(payload)) as SigninResponse;

            const parsedTokenResponse = useParser().parseJwt(response.token);

            isLoading.value = false;
            authStore.addUser(parsedTokenResponse);
            authStore.addToken(response.token);

            await fetchUserDetails(parsedTokenResponse, response.token);
        } catch (error) {
            errorResponse.code = 404;
            errorResponse.status = 'Internal server error';
            errorResponse.description = 'Please try again';
            errorResponse.show = true;
            console.error(error);
        }

        isLoading.value = false;
    }
};

const fetchUserDetails = async (parsedToken: UserInfoJWT, token: string) => {
    const { data, error } = await useFetchAPI<UserDetailsResponse>(`user/${parsedToken.user_id}/details`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: 'GET',
    });

    if (error.value) {
        switch (error.value.response?.status) {
            case 404:
                errorResponse.code = error.value.response.status as number;
                errorResponse.description = '404 - Something invalid just happened.';
                errorResponse.show = true;
                break;
            case 500:
                errorResponse.code = error.value.response.status as number;
                errorResponse.description = '500 - Server error';
                errorResponse.show = true;
                break;
            case 401:
                errorResponse.code = error.value.response.status as number;
                errorResponse.description = '401 - Unauthorized';
                errorResponse.show = true;
                break;
            default:
                break;
        }
        return;
    }

    const userDetails = data.value?.data;
    authStore.addUserDetail(userDetails as UserDetails);

    await cartStore.updateAndReturnCart();

    Emitter.emit('notifications', true);
};

const loginWithGoogle = async () => {
    await registerUser();
    const parsedToken = await getParsedFirebaseJWTToken();
    const token = await getUserToken();
    authStore.addUser(parsedToken);

    if (!parsedToken.hasOwnProperty('permissions')) {
        authStore.addFirebaseToken(token);
        return navigateTo('/signup');
    } else {
        await fetchUserDetails(parsedToken, token);
    }
};
</script>