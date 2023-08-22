import { IGenre, IGenreModel, normalizeGenres } from '@models/GenreModel';

import { apiGallery } from '../api';

export const genreApi = apiGallery.injectEndpoints({
  endpoints: (build) => ({
    fetchGenres: build.query<IGenreModel[], null>({
      query: () => ({ method: 'GET', url: '/genres' }),
      transformResponse: (response: IGenre[]): IGenreModel[] =>
        response.map(normalizeGenres),
    }),
  }),
});
