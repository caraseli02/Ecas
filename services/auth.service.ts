import HttpFactory from '@/composables/HttpFactory';
import { LoginRequest } from '~/model/auth/request/LoginRequest';
import { ProductResponse } from '~/model/products/response/ProductResponse';

class AuthService extends HttpFactory {
  private RESOURCE = '/auth';

  async login(payload: LoginRequest): Promise<ProductResponse> {
    return await this.call<ProductResponse>('POST', `${this.RESOURCE}/login`, payload);
  }
}

export default AuthService;