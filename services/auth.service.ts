import HttpFactory from '@/composables/HttpFactory';
import {FirebaseError} from 'firebase/app';
import {LoginRequest} from '~/model/auth/request/LoginRequest';
import {ProductResponse} from '~/model/products/response/ProductResponse';
import {
    FirebaseBusinessAccount as SignupBusinessPayload,
    FirebasePersonalAccount as SignupPersonalPayload
} from '~~/types';
import {useAuthStore} from '~/store/authStore';
import useFirebaseAuth from '~/composables/useFirebaseAuth';

class AuthService extends HttpFactory {
    private RESOURCE = '/auth';
    private authStore = useAuthStore();

    async login(payload: LoginRequest): Promise<ProductResponse | FirebaseError | unknown> {
        try {
            return await this.call('POST', `${this.RESOURCE}/login`, payload);
        } catch (err) {
            if (err instanceof FirebaseError) {
                return err;
            }
            return err;
        }
    }

    async registerFirebase(payload: SignupPersonalPayload | SignupBusinessPayload) {
        const token = await useFirebaseAuth().getUserToken();

        return await this.call('POST', `${this.RESOURCE}/firebase/register`, payload,
            token
                ? {
                    headers: { Authorization: `Bearer ${token}` },
                }
                : {});
    }

    async registerClassic(payload: SignupPersonalPayload | SignupBusinessPayload) {
        return await this.call('POST', `${this.RESOURCE}/register`, payload);
    }
}

export default AuthService;
