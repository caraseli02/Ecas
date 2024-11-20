import { defineStore } from 'pinia';
import Emitter from 'tiny-emitter/instance.js';
import useFirebaseAuth from '~/composables/useFirebaseAuth';
import moment from 'moment';
import { useNuxtApp } from '#app';
import { useRouter } from '#app/composables/router';
import type { StripeCardInterface, UserInfoJWT } from '~/types';
import type { UserInterface } from '~/types/auth/user-interface';
import type { GeneralSettingsInterface } from '~/types/general-settings/general-settings';

export const useAuthStore = defineStore({
    id: 'auth-store',
    state: () => {
        return {
            token: {} as { value: string; createdAt: any },
            loggedInUser: null as UserInfoJWT | null,
            userDetails: null as UserInterface | null,
            firebaseTempToken: null as string | null,
            userCards: null as StripeCardInterface[] | null,
            generalSettings: null as GeneralSettingsInterface | null,
        };
    },
    actions: {
        addToken(token: string) {
            this.token.value = token;
            this.token.createdAt = moment();
        },
        addUser(user: UserInfoJWT) {
            this.loggedInUser = user;
        },
        addUserDetail(user: UserInterface) {
            this.userDetails = user;
        },
        async addUserCards() {
            const { $api } = useNuxtApp();
            const cardsResponse = await $api.user.userCards();

            if (!cardsResponse) {
                return Promise<null>;
            }

            this.userCards = cardsResponse.data;

            Emitter.emit('update-cart', this.userCards);

            return this.userCards as StripeCardInterface[];
        },
        addFirebaseToken(token: string) {
            this.firebaseTempToken = token;
        },
        addGeneralSettings(generalSettings: GeneralSettingsInterface) {
            this.generalSettings = generalSettings;
        },
        signOut() {
            this.loggedInUser = null;
            this.userDetails = null;
            this.token = { value: '', createdAt: '' };
            this.generalSettings = null;

            Emitter.emit('remove-cart-and-notifications', true);

            if (process.client) {
                localStorage.clear();
            }
        },
        async firebaseSignOut() {
            const firebaseAuth = useFirebaseAuth();
            await firebaseAuth.logout();

            this.loggedInUser = null;
            this.userDetails = null;
            this.token = { value: '', createdAt: '' };
            this.generalSettings = null;
        },
        getToken() {
            // Ensure this code only runs on the client side
            if (process.server) return null;

            const router = useRouter();
            const route = useRoute();

            // Check if the token is loaded from local storage
            if (!this.token || !this.token.createdAt) {
                // Early return to wait for token initialization from pinia-persisted data
                return null;
            }

            const time = moment().diff(this.token.createdAt, 'minutes');

            if (time > 59) {
                this.signOut();

                if (route.path.includes('dashboard') || route.path.includes('order') || route.path.includes('checkout')) {
                    router.push('/');
                    Emitter.emit('open-account-modal');
                }

                return null;
            }

            return this.token?.value as unknown as UserInfoJWT;
        },
    },
    getters: {
        getCurrentUser: (state) => state.loggedInUser,
        getUserDetails: (state) => state.userDetails as UserInterface,
        getGeneralSettings: (state) => state.generalSettings as GeneralSettingsInterface,
    },
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
      },
});
