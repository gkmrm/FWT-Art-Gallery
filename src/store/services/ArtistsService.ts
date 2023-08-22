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
} from '@models/ArtistsModel';
import { apiGallery } from '@store/api';
import {
  IArtistEditModel,
  normalizeIArtistEditRequest,
} from '@store/models/ArtistEditModel';
import { IArtistsParams } from '@store/models/FiltersModel';
import { IIdModel, normalizeIdRequest } from '@store/models/IdModel';
import {
  IPaintEditModel,
  normalizeIPaintRequsest,
} from '@store/models/PaintEditModel';
import { IPaint } from '@store/models/PaintModel';

import { URLS_ARTIST } from './URLS';

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
          url: isAuth ? URLS_ARTIST.artists : URLS_ARTIST.artistsStatic,
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
          url: isAuth
            ? URLS_ARTIST.artistById(id)
            : URLS_ARTIST.artistByIdStatic(id),
        }),
        transformResponse: (response: IArtistsById): IArtistsByIdModel =>
          normalizeIArtistById(response),
      }),
      createArtist: build.mutation<IArtists, { data: IArtistEditModel }>({
        query: ({ data }) => ({
          method: 'POST',
          url: URLS_ARTIST.createArtist,
          data: normalizeIArtistEditRequest(data),
        }),
      }),
      deleteArtist: build.mutation<string, { id: IIdModel }>({
        query: ({ id }) => ({
          method: 'DELETE',
          url: URLS_ARTIST.deleteArtist(id.id),
          data: normalizeIdRequest(id),
        }),
      }),
      editArtist: build.mutation<
        IArtists,
        { id: IIdModel; data: IArtistEditModel }
      >({
        query: ({ id, data }) => ({
          method: 'PUT',
          url: URLS_ARTIST.editArtist(id.id),
          data: normalizeIArtistEditRequest(data),
        }),
      }),
      updateMainPaint: build.mutation<null, { id: IIdModel }>({
        query: ({ id }) => ({
          method: 'PATCH',
          url: URLS_ARTIST.updateMainPainting(id.id),
          data: normalizeIdRequest(id),
        }),
      }),
      addPaint: build.mutation<IPaint, { id: IIdModel; data: IPaintEditModel }>(
        {
          query: ({ id, data }) => ({
            method: 'POST',
            url: URLS_ARTIST.addPaint(id.id),
            data: normalizeIPaintRequsest(data),
          }),
        }
      ),
      editPaint: build.mutation<
        IPaint,
        { id: IIdModel; paintId: string; data: IPaintEditModel }
      >({
        query: ({ id, paintId, data }) => ({
          method: 'PUT',
          url: URLS_ARTIST.editPaint(id.id, paintId),
          data: normalizeIPaintRequsest(data),
        }),
      }),
      deletePaint: build.mutation<string, { id: IIdModel; paintId: string }>({
        query: ({ id, paintId }) => ({
          method: 'DELETE',
          url: URLS_ARTIST.deletePaint(id.id, paintId),
          data: normalizeIdRequest(id),
        }),
      }),
    }),
  });
