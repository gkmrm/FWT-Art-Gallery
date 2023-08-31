import {
  IAuthRequest,
  IAuthResponse,
  IRefreshTokenRequest,
} from '@models/AuthModel';

import { URLS_AUTH } from './URLS';
import { apiGallery } from '../api';

export const authApi = apiGallery.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation<IAuthResponse, IAuthRequest>({
      query: (data) => ({ method: 'POST', url: URLS_AUTH.register, data }),
    }),
    login: build.mutation<IAuthResponse, IAuthRequest>({
      query: (data) => ({ method: 'POST', url: URLS_AUTH.login, data }),
    }),
    refresh: build.mutation<IAuthResponse, IRefreshTokenRequest>({
      query: (data) => ({ method: 'POST', url: URLS_AUTH.refresh, data }),
    }),
  }),
});
