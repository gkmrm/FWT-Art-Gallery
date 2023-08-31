/* eslint-disable no-nested-ternary */
import { normalizeGenresRequestArray } from './GenreModel';
import { IOption } from './OptionModel';

export interface IArtistsParams {
  sortBy?: string;
  orderBy: 'asc' | 'desc' | null;
  name?: string;
  genres?: string[];
  perPage?: string;
  pageNumber?: string;
}

export interface IArtistsParamsModel {
  sortBy: IOption[];
  orderBy: IOption[];
  search?: string;
  genres: IOption[];
  perPage: number;
  pageNumber?: string;
}

export type Filters = { genres?: string } & Omit<IArtistsParams, 'genres'> &
  Record<string, string | string[]>;

export const normalizeIArtistParamsRequest = (
  item: IArtistsParamsModel
): IArtistsParams => ({
  sortBy: item.sortBy.map((elem) => elem.id).toString(),
  orderBy: item.orderBy.map((elem) => elem.id).toString() as
    | 'asc'
    | 'desc'
    | null,
  name: item.search,
  genres: normalizeGenresRequestArray(item.genres),
  perPage: item.perPage.toString(),
  pageNumber: item.pageNumber,
});

export function normalizeParams(
  paramsModel: IArtistsParamsModel
): IArtistsParams {
  const normalizedParams: IArtistsParams = {
    orderBy: 'desc',
  };

  if (paramsModel.sortBy && paramsModel.sortBy.length > 0) {
    normalizedParams.sortBy = paramsModel.sortBy[0].id;
  }

  if (paramsModel.orderBy && paramsModel.orderBy.length > 0) {
    normalizedParams.orderBy = paramsModel.orderBy[0].id as 'asc' | 'desc';
  }

  if (paramsModel.search) {
    normalizedParams.name = paramsModel.search;
  }

  if (paramsModel.genres && paramsModel.genres.length > 0) {
    normalizedParams.genres = paramsModel.genres.map((genre) => genre.id);
  }

  if (paramsModel.perPage) {
    normalizedParams.perPage = paramsModel.perPage.toString();
  }

  if (paramsModel.pageNumber) {
    normalizedParams.pageNumber = paramsModel.pageNumber;
  }

  return normalizedParams;
}

export function convertToURLSearchParams(
  params: IArtistsParams
): URLSearchParams {
  const urlSearchParams = new URLSearchParams();

  if (params.sortBy) {
    urlSearchParams.append('sortBy', params.sortBy);
  }

  if (params.orderBy) {
    urlSearchParams.append('orderBy', params.orderBy);
  }

  if (params.name) {
    urlSearchParams.append('search', params.name);
  }

  if (params.genres && params.genres.length > 0) {
    params.genres.forEach((genre) => {
      urlSearchParams.append('genres', genre);
    });
  }

  if (params.perPage) {
    urlSearchParams.append('perPage', params.perPage);
  }

  if (params.pageNumber) {
    urlSearchParams.append('pageNumber', params.pageNumber);
  }

  return urlSearchParams;
}

export function convertFromURLSearchParams(
  urlSearchParams: URLSearchParams
): IArtistsParams {
  const convertedParams: IArtistsParams = {
    orderBy: null,
  };

  const sortByValue = urlSearchParams.get('sortBy');
  if (sortByValue) {
    convertedParams.sortBy = sortByValue;
  }

  const orderByValue = urlSearchParams.get('orderBy');
  if (orderByValue === 'asc' || orderByValue === 'desc') {
    convertedParams.orderBy = orderByValue;
  }

  const nameValue = urlSearchParams.get('search');
  if (nameValue) {
    convertedParams.name = nameValue;
  }

  const genresValues = urlSearchParams.getAll('genres');
  if (genresValues.length > 0) {
    convertedParams.genres = genresValues;
  }

  const perPageValue = urlSearchParams.get('perPage');
  if (perPageValue) {
    convertedParams.perPage = perPageValue;
  }

  const pageNumberValue = urlSearchParams.get('pageNumber');
  if (pageNumberValue) {
    convertedParams.pageNumber = pageNumberValue;
  }

  return convertedParams;
}

enum SortOption {
  name = 'name',
  genres = 'genres',
  randomly = 'randomly',
}

enum OrderOption {
  asc = 'asc',
  desc = 'desc',
  null = 'null',
}

export function convertToParamsModel(
  params: IArtistsParams
): IArtistsParamsModel {
  const paramsModel: IArtistsParamsModel = {
    sortBy: params.sortBy
      ? params.sortBy === SortOption.name
        ? [{ id: SortOption.name, name: params.sortBy }]
        : params.sortBy === SortOption.genres
        ? [{ id: SortOption.genres, name: params.sortBy }]
        : [{ id: 'null', name: SortOption.randomly }]
      : [],
    orderBy: [
      {
        id:
          params.orderBy === OrderOption.asc
            ? OrderOption.asc
            : params.orderBy === OrderOption.desc
            ? OrderOption.desc
            : OrderOption.null,
        name:
          params.orderBy === OrderOption.asc
            ? params.orderBy
            : params.orderBy === OrderOption.desc
            ? params.orderBy
            : OrderOption.null,
      },
    ],
    search: params.name,
    genres: params.genres
      ? params.genres.map((genre) => ({ id: genre, name: genre }))
      : [],
    perPage: Number(params.perPage),
    pageNumber: params.pageNumber,
  };

  return paramsModel;
}
