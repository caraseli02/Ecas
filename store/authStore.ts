import { defineStore } from 'pinia';
import { StripeCardInterface, UserInfoJWT } from '~~/types';
import { UserInterface } from '~/types/auth/user-interface';
import Emitter from 'tiny-emitter/instance.js';
import useFirebaseAuth from '~/composables/useFirebaseAuth';
import moment from 'moment';
import { GeneralSettingsInterface } from '~/types/general-settings/general-settings';
import { useNuxtApp } from '#app';
import { useRouter } from '#app/composables/router';

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
            console.log('setting user details', user);
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

            console.log('Signing out');
            this.loggedInUser = null;
            this.userDetails = null;
            this.token = { value: '', createdAt: '' };
            this.generalSettings = null;
        },
        getToken() {
            const router = useRouter();

            console.log(`${moment().diff(this.token?.createdAt, 'minutes')} minutes passed`);
            if (moment().diff(this.token?.createdAt, 'minutes') > 59) {
                this.signOut();
                router.push('/');
                Emitter.emit('open-account-modal');
                return;
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
        storage: persistedState.localStorage,
    },
});
