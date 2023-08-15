import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import {
  IArtistsStatic,
  IArtistsStaticModel,
  normalizeIArtistsStatic,
} from '@store/models/ArtistsStaticModels';
import {
  IArtistsStaticById,
  IArtistsStaticByIdModel,
  normalizeIArtistStaticById,
} from '@store/models/ArtistStaticByIdModel';
import BASE_URL from '@utils/BASE_URL';

export const artistsStaticApi = createApi({
  reducerPath: 'artistsStaticApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    fetchArtistsStatic: build.query<IArtistsStaticModel[], ''>({
      query: () => ({
        url: '/artists/static',
      }),
      transformResponse: (response: IArtistsStatic[]): IArtistsStaticModel[] =>
        response.map(normalizeIArtistsStatic),
    }),
    fetchArtistStaticById: build.query<IArtistsStaticByIdModel, string>({
      query: (id) => ({
        url: `/artists/static/${id}`,
      }),
      transformResponse: (
        response: IArtistsStaticById
      ): IArtistsStaticByIdModel => normalizeIArtistStaticById(response),
    }),
  }),
});
