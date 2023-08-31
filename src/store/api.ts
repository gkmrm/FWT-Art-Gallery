import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './axiosBaseQuery';

export const apiGallery = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
