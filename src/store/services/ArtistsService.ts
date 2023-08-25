import {
  IArtistsById,
  IArtistsByIdModel,
  normalizeIArtistById,
} from '@models/ArtistByIdModel';
import {
  IArtistsAuth,
  IArtists,
  normalizeIArtists,
  normalizeIdRequest,
  IArtistsResponse,
} from '@models/ArtistsModel';
import { apiGallery } from '@store/api';
import {
  IArtistsParamsModel,
  normalizeParams,
} from '@store/models/FiltersModel';
import { IPaint } from '@store/models/PaintModel';
import { normalizeMainPaintingRequest } from '@store/models/RequestsModels';

import { URLS_ARTIST } from './URLS';

// const isArtistsType = (
//   response: IArtists[] | IArtistsAuth
// ): response is IArtists[] => Array.isArray(response);

export const artistApi = apiGallery
  .enhanceEndpoints({
    addTagTypes: ['Artists', 'ArtistById'],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchArtists: build.query<
        IArtistsResponse,
        { isAuth: boolean; params: IArtistsParamsModel }
      >({
        query: ({ isAuth, params }) => ({
          method: 'GET',
          url: isAuth ? URLS_ARTIST.artists : URLS_ARTIST.artistsStatic,
          params: normalizeParams(params),
        }),
        transformResponse: (
          response: IArtists[] | IArtistsAuth
        ): IArtistsResponse =>
          'data' in response
            ? {
                data: response.data.map(normalizeIArtists),
                meta: response.meta,
              }
            : { data: response.map(normalizeIArtists), meta: null },

        // isArtistsType(response)
        //   ? response.map(normalizeIArtists)
        //   : {
        //       data: response.data.map(normalizeIArtists),
        //       meta: response.meta,
        //     },
        providesTags: ['Artists'],
      }),
      fetchArtistStaticById: build.query<
        IArtistsByIdModel,
        { id: string; isAuth: boolean }
      >({
        query: ({ id, isAuth }) => ({
          method: 'GET',
          url: isAuth
            ? URLS_ARTIST.artistById(id)
            : URLS_ARTIST.artistByIdStatic(id),
        }),
        transformResponse: (response: IArtistsById): IArtistsByIdModel =>
          normalizeIArtistById(response),
        providesTags: ['ArtistById'],
      }),
      createArtist: build.mutation<IArtists, { data: FormData }>({
        query: ({ data }) => ({
          method: 'POST',
          url: URLS_ARTIST.createArtist,
          data,
        }),
        invalidatesTags: ['Artists'],
      }),
      deleteArtist: build.mutation<string, { authorId: string }>({
        query: ({ authorId }) => ({
          method: 'DELETE',
          url: URLS_ARTIST.deleteArtist(authorId),
          data: normalizeIdRequest(authorId),
        }),
        invalidatesTags: ['Artists'],
      }),
      editArtist: build.mutation<IArtists, { id: string; data: FormData }>({
        query: ({ id, data }) => ({
          method: 'PUT',
          url: URLS_ARTIST.editArtist(id),
          data,
        }),
        invalidatesTags: ['Artists', 'ArtistById'],
      }),
      updateMainPaint: build.mutation<
        null,
        { authorId: string; paintId: string }
      >({
        query: ({ authorId, paintId }) => ({
          method: 'PATCH',
          url: URLS_ARTIST.updateMainPainting(authorId),
          data: normalizeMainPaintingRequest(paintId),
        }),
        invalidatesTags: ['Artists', 'ArtistById'],
      }),
      addPaint: build.mutation<IPaint, { authorId: string; data: FormData }>({
        query: ({ authorId, data }) => ({
          method: 'POST',
          url: URLS_ARTIST.addPaint(authorId),
          data,
        }),
        invalidatesTags: ['Artists', 'ArtistById'],
      }),
      editPaint: build.mutation<
        IPaint,
        { authorId: string; paintId: string; data: FormData }
      >({
        query: ({ authorId, paintId, data }) => ({
          method: 'PUT',
          url: URLS_ARTIST.editPaint(authorId, paintId),
          data,
        }),
        invalidatesTags: ['ArtistById'],
      }),
      deletePaint: build.mutation<
        string,
        { authorId: string; paintId: string }
      >({
        query: ({ authorId, paintId }) => ({
          method: 'DELETE',
          url: URLS_ARTIST.deletePaint(authorId, paintId),
          data: normalizeIdRequest(paintId),
        }),
        invalidatesTags: ['ArtistById'],
      }),
    }),
  });
