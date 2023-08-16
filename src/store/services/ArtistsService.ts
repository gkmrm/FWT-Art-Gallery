import {
  IArtistsById,
  IArtistsByIdModel,
  normalizeIArtistById,
} from '@models/ArtistByIdModel';
import {
  IArtistsAuth,
  IArtists,
  IArtistsModel,
  normalizeIArtists,
  IArtistsParams,
} from '@models/ArtistsModels';
import { apiGallery } from '@store/api';

const isArtistsType = (
  response: IArtists[] | IArtistsAuth
): response is IArtists[] => {
  if (Array.isArray(response)) {
    return true;
  }

  return false;
};

export const artistApi = apiGallery
  .enhanceEndpoints({
    addTagTypes: ['Artists', 'ArtistById'],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchArtists: build.query<
        IArtistsModel[],
        { isAuth: boolean; params: IArtistsParams }
      >({
        query: ({ isAuth, params }) => ({
          method: 'GET',
          url: isAuth ? '/artists' : '/artists/static',
          params,
        }),
        transformResponse: (
          response: IArtists[] | IArtistsAuth
        ): IArtistsModel[] =>
          isArtistsType(response)
            ? response.map(normalizeIArtists)
            : response.data.map(normalizeIArtists),
        providesTags: ['Artists'],
      }),
      fetchArtistStaticById: build.query<
        IArtistsByIdModel,
        { id: string; isAuth: boolean }
      >({
        query: ({ id, isAuth }) => ({
          method: 'GET',
          url: isAuth ? `/artists/${id}` : `/artists/static/${id}`,
        }),
        transformResponse: (response: IArtistsById): IArtistsByIdModel =>
          normalizeIArtistById(response),
      }),
    }),
  });
