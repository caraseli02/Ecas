import { defineStore } from 'pinia';
import { UserInfoJWT } from '~~/types';
import { UserDetails } from '~~/types/auth/user-details';

export const useAuthStore = defineStore({
    id: 'auth-store',
    state: () => {
        return {
            token: '' as string | null,
            loggedInUser: null as UserInfoJWT | null,
            userDetails: null as UserDetails | null,
            firebaseTempToken: null as string | null,
        };
    },
    actions: {
        addToken(token: string) {
            this.token = token;
        },
        addUser(user: UserInfoJWT) {
            this.loggedInUser = user;
        },
        addUserDetail(user: UserDetails) {
            this.userDetails = user;
            localStorage.setItem('userDetails', JSON.stringify(user));
        },
        addFirebaseToken(token: string) {
            this.firebaseTempToken = token;
        },
        signOut() {
            this.loggedInUser = null;
            this.userDetails = null;
            this.token = null;

            localStorage.clear();
        },
        async firebaseSignOut() {
            const firebaseAuth = useFirebaseAuth();
            await firebaseAuth.logout();
        },
    },
    getters: {
        getToken: (state) => state.token,
        getCurrentUser: (state) => state.loggedInUser,
        getUserDetails: (state) => {
            if (state.userDetails) {
                return state.userDetails;
            }

            return JSON.parse(localStorage.getItem('userDetails'));
        },
    },
    persist: true,
});
