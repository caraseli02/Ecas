<template>
    <div class="max-w-[340px] mx-auto">
        <FormInput
            v-model="email.value"
            :error="email.error"
            type="email"
            placeholder="you@company.com"
            class="mb-[15px]"
        />
        <FormPassword
            v-model="password.value"
            :error="password.error"
            placeholder="Your Password"
            class="mb-[15px]"
        />
        <div class="flex items-center justify-between mb-[30px]">
            <label class="flex items-center cursor-pointer">
                <input v-model="rememberMe" type="checkbox" class="sr-only" />
                <div
                    class="flex items-center justify-center w-[18px] h-[18px] rounded border transition-colors duration-300 mr-2"
                    :class="[
                        rememberMe ? 'bg-blue border-blue' : 'border-[#CBCDD7]',
                    ]"
                >
                    <CheckIcon v-if="rememberMe" class="w-4 text-white" />
                </div>
                <span class="text-xs text-gray-300 select-none"
                    >Remember me</span
                >
            </label>
            <NuxtLink
                to="/"
                class="flex text-xs font-medium text-gray-100 hover:underline"
            >
                Forgot password?
            </NuxtLink>
        </div>
        <button
            class="flex items-center justify-center w-full bg-blue rounded py-[9px] text-white mb-5"
            @click="handleSignIn"
        >
            <KeyholeIcon class="w-6 h-6 mr-2" />
            <span class="text-sm font-medium"> Sign In </span>
        </button>
        <div
            class="flex items-center justify-center mx-auto text-sm font-medium text-gray-100 mb-[25px]"
        >
            <span class="mr-2"> Don’t have an account yet ? </span>
            <NuxtLink to="/signup" class="text-blue hover:underline">
                Sign up now
            </NuxtLink>
        </div>
        <div class="flex items-center mb-5">
            <div class="h-px flex-1 bg-gray-200" />
            <span class="text-xs text-gray-100 flex-shrink-0 mx-[18px]">
                Or continue with
            </span>
            <div class="h-px flex-1 bg-gray-200" />
        </div>
        <button
            class="group flex items-center justify-center w-full border border-border py-2 rounded mb-5 transition-colors duration-300 hover:border-blue"
            @click="loginWithGoogle"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-6 h-6 mr-2 transition-all duration-300 grayscale group-hover:grayscale-0"
            >
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
            <span class="text-sm font-medium text-gray-300">Google</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import KeyholeIcon from "@/assets/icons/keyhole.svg";
import CheckIcon from "@/assets/icons/check.svg";

const { checkForInputErrors } = useError();

const email = ref({
    value: "",
    error: "",
});
const password = ref({
    value: "",
    error: "",
});
const rememberMe = ref(false);

const handleSignIn = async () => {
    const hasError = checkForInputErrors([email.value, password.value]);

    if (!hasError) {
        // TODO: LOGIN REQUEST
    }
};

const loginWithGoogle = async () => {
    const { registerUser } = useFirebaseAuth();

    const register = await registerUser();
    console.log(register);
};
</script>
