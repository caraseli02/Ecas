import { defineStore } from 'pinia';
import { UserInfoJWT } from '~~/types';
import { UserDetails } from '~~/types/auth/user-details';
import Emitter from 'tiny-emitter/instance.js';
import useFirebaseAuth from '~/composables/useFirebaseAuth';
import moment from 'moment';

export const useAuthStore = defineStore({
    id: 'auth-store',
    state: () => {
        return {
            token: {} as { value: string; createdAt: any },
            loggedInUser: null as UserInfoJWT | null,
            userDetails: null as UserDetails | null,
            firebaseTempToken: null as string | null,
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
        addUserDetail(user: UserDetails) {
            this.userDetails = user;
            if (process.client) {
                localStorage.setItem('userDetails', JSON.stringify(user));
            }
        },
        addFirebaseToken(token: string) {
            this.firebaseTempToken = token;
        },
        signOut() {
            this.loggedInUser = null;
            this.userDetails = null;
            this.token = { createdAt: '', value: '' };
            Emitter.emit('remove-cart-and-notifications', true);
            if (process.client) {
                localStorage.clear();
            }
        },
        async firebaseSignOut() {
            const firebaseAuth = useFirebaseAuth();
            await firebaseAuth.logout();
        },
        getToken() {
            console.log(`${moment().diff(this.token.createdAt, 'minutes')} minutes left`);
            if (moment().diff(this.token.createdAt, 'minutes') > 59) {
                this.signOut();
            }

            return this.token.value;
        },
    },
    getters: {
        getCurrentUser: (state) => state.loggedInUser,
        getUserDetails: (state) => {
            if (state.userDetails) {
                return state.userDetails;
            }
            if (process.client) {
                return JSON.parse(<string>localStorage.getItem('userDetails'));
            }
        },
    },
    persist: true,
});
