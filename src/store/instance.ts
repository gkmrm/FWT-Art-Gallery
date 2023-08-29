import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import jwt from 'jwt-decode';

import { authLocalStorage } from '@context/AuthContext/AuthContext';
import BASE_URL from '@utils/BASE_URL';
import { getFingerprint } from '@utils/functions/getFingerprint';

import { AuthResponse } from './models/AuthModel';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const isExpiredToken = (token: string | null): boolean => {
  if (!token) {
    return true;
  }

  const currentDate = new Date();
  const decodedToken: { exp: number } = jwt(token);

  return decodedToken.exp * 1000 < currentDate.getTime();
};

let refreshTokenPromise: Promise<unknown> | null = null;

const redirectToLogin = () => {
  if (
    !window.location.pathname.includes('login') &&
    !window.location.pathname.includes('register')
  ) {
    window.location.pathname = '/login';
  }
};

const onRefreshToken = async () => {
  if (refreshTokenPromise) {
    await refreshTokenPromise;
    refreshTokenPromise = null;

    return Promise.resolve();
  }

  const { refreshToken } = authLocalStorage.get();
  const fingerprint = await getFingerprint();

  if (refreshToken && !isExpiredToken(refreshToken)) {
    refreshTokenPromise = instance('/auth/refresh', {
      method: 'POST',
      data: { refreshToken, fingerprint },
    });

    await refreshTokenPromise;
    refreshTokenPromise = null;

    return Promise.resolve();
  }

  authLocalStorage.remove();
  redirectToLogin();

  return Promise.reject();
};

export const onRequest = async (config: InternalAxiosRequestConfig) => {
  if (config.url?.includes('auth') || config.url?.includes('static')) {
    return config;
  }

  let { accessToken } = authLocalStorage.get();

  if (isExpiredToken(accessToken)) {
    await onRefreshToken();
    accessToken = authLocalStorage.get().accessToken;
  }

  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return config;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error);

export const onResponseError = async (
  error: AxiosError
): Promise<AxiosError> => {
  if (error?.response?.status !== 401) {
    return Promise.reject(error);
  }
  const config = error.config as AxiosRequestConfig;

  if (config.url?.includes('auth') || config.url?.includes('static')) {
    return Promise.reject(error);
  }

  const { refreshToken } = authLocalStorage.get();

  if (refreshToken) {
    await onRefreshToken();
    const { accessToken } = authLocalStorage.get();

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };

      return instance(config);
    }
  }

  return Promise.reject();
};

export const onResponse = (response: AxiosResponse): AxiosResponse => {
  if (response.config.url?.includes('auth')) {
    authLocalStorage.set(response.data as AuthResponse);
  }

  return response;
};

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
