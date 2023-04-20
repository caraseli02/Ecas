import { defineStore } from 'pinia'
import { UserInfoJWT } from '~~/types'
import { UserDetails } from '~~/types/auth/user-details'

export const useAuthStore = defineStore({
    id: 'auth-store',
    state: () => {
        return {
            token: '',
            loggedInUser: null as UserInfoJWT | null,
            userDetails: null as UserDetails | null,
            firebaseTempToken: null as string | null
        }
    },
    actions: {
        addToken(token: string) {
            this.token = token
        },
        addUser(user: UserInfoJWT) {
            this.loggedInUser = user
        },
        addUserDetail(user: UserDetails) {
            this.userDetails = user
        },
        addFirebaseToken(token: string) {
            this.firebaseTempToken = token
        },
        signOut() {
            this.loggedInUser = null
            this.userDetails = null
        },
        firebaseSignOut() {
            const firebaseAuth = useFirebaseAuth()
            firebaseAuth.logout()
        }
    },
    getters: {
        getToken: state => state.token,
        getCurrentUser: state => state.loggedInUser,
        getUserDetails: state => state.userDetails
    },
    persist: true
})