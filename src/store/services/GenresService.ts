import { IGenre } from '@models/GenreModel';

import { apiGallery } from '../api';

export const genreApi = apiGallery.injectEndpoints({
  endpoints: (build) => ({
    fetchGenres: build.query<IGenre[], null>({
      query: () => ({ method: 'GET', url: '/genres' }),
    }),
  }),
});
