import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import IArtistsStatic, {
  IArtistStaticModel,
  normalizeIArtistStatic,
} from '@models/ArtistStaticModels';
import BASE_URL from '@utils/BASE_URL';

export const artistsStaticApi = createApi({
  reducerPath: 'artistsStaticApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    fetchArtistsStatic: build.query<IArtistStaticModel[], ''>({
      query: () => ({
        url: '/artists/static',
      }),
      transformResponse: (response: IArtistsStatic[]): IArtistStaticModel[] =>
        response.map(normalizeIArtistStatic),
    }),
  }),
});
