import { defineStore } from 'pinia'
import { UserInfoJWT } from '~~/types'
import { UserDetails } from '~~/types/auth/user-details'

export const useAuthStore = defineStore({
    id: 'auth-store',
    state: () => {
        return {
            token: '',
            loggedInUser: null as UserInfoJWT | null,
            userDetails: null as UserDetails | null
        }
    },
    actions: {
        addToken(token: string) {
            this.token = token
        },
        addUser(user: UserInfoJWT) {
            this.loggedInUser = user
        },
        signOut() {
            this.loggedInUser = null
        }
    },
    getters: {
        getToken: state => state.token,
        getCurrentUser: state => state.loggedInUser
    },
    persist: true
})