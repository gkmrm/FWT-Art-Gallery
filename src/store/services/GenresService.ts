import { IGenre, IGenreModel, normalizeGenres } from '@models/GenreModel';

import { URLS_GENRES } from './URLS';
import { apiGallery } from '../api';

export const genreApi = apiGallery.injectEndpoints({
  endpoints: (build) => ({
    fetchGenres: build.query<IGenre[], null>({
      query: () => ({ method: 'GET', url: URLS_GENRES.genres }),
      transformResponse: (response: IGenre[]): IGenreModel[] =>
        response.map(normalizeGenres),
    }),
  }),
});
