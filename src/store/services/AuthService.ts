import {
  AuthRequest,
  AuthResponse,
  RefreshTokenRequest,
} from '@models/AuthModel';

import { URLS_AUTH } from './URLS';
import { apiGallery } from '../api';

export const authApi = apiGallery.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({ method: 'POST', url: URLS_AUTH.register, data }),
    }),
    login: build.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({ method: 'POST', url: URLS_AUTH.login, data }),
    }),
    refresh: build.mutation<AuthResponse, RefreshTokenRequest>({
      query: (data) => ({ method: 'POST', url: URLS_AUTH.refresh, data }),
    }),
  }),
});
