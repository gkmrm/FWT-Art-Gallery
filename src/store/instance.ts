import axios from 'axios';

import BASE_URL from '@utils/BASE_URL';

// eslint-disable-next-line import/no-cycle
import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from './Interceptors';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
