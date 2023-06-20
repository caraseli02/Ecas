import HttpFactory from '@/composables/HttpFactory';
import { FirebaseError } from 'firebase/app';
import { LoginRequest } from '~/model/auth/request/LoginRequest';
import { ProductResponse } from '~/model/products/response/ProductResponse';
import {
  FirebasePersonalAccount as SignupPersonalPayload,
  FirebaseBusinessAccount as SignupBusinessPayload,
} from "~~/types";

class AuthService extends HttpFactory {
  private RESOURCE = '/auth';

  async login(payload: LoginRequest): Promise<ProductResponse | FirebaseError | unknown> {
    try {
      let fetch = await this.call('POST', `${this.RESOURCE}/login`, payload);
      return fetch
    } catch (err) {
      if (err instanceof FirebaseError) {
        return err
      }
      return err
    }
  }

  async registerFirebase(payload: SignupPersonalPayload | SignupBusinessPayload) {
    return await this.call('POST', `${this.RESOURCE}/firebase/register`, payload);
  }

  async registerClassic(payload: SignupPersonalPayload | SignupBusinessPayload) {
    return await this.call('POST', `${this.RESOURCE}/register`, payload);
  }
}

export default AuthService;