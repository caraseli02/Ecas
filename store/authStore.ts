import { defineStore } from 'pinia'
import { UserInfo } from '~~/types'

export const useAuthStore = defineStore({
    id: 'auth-store',
    state: () => {
        return {
            token: '',
            loggedInUser: null as UserInfo | null
        }
    },
    actions: {
        addToken(token: string) {
            this.token = token
        },
        addUser(user: UserInfo) {
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