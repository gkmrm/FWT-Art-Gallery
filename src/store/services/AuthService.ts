import {
  AuthRequest,
  AuthResponse,
  RefreshTokenRequest,
} from '@models/AuthModel';

import { apiGallery } from '../api';

export const authApi = apiGallery.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({ method: 'POST', url: '/auth/register', data }),
    }),
    login: build.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({ method: 'POST', url: '/auth/login', data }),
    }),
    refresh: build.mutation<AuthResponse, RefreshTokenRequest>({
      query: (data) => ({ method: 'POST', url: '/auth/refresh', data }),
    }),
  }),
});
