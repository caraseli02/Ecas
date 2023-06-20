import HttpFactory from '@/composables/HttpFactory';
import { FirebaseError } from 'firebase/app';
import { LoginRequest } from '~/model/auth/request/LoginRequest';
import { ProductResponse } from '~/model/products/response/ProductResponse';

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
}

export default AuthService;