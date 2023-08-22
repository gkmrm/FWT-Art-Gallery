import {
  IId,
  IIdModel,
  normalizeIdRequest,
  normalizeIdResponse,
} from './IdModel';

export interface IGenre {
  _id: IId;
  name: string;
}

export interface IGenreModel {
  id: IIdModel;
  name: string;
}

export const normalizeGenres = (item: IGenre): IGenreModel => ({
  // eslint-disable-next-line no-underscore-dangle
  id: normalizeIdResponse(item._id),
  name: item.name,
});

export const normalizeGenresRequest = (item: IGenreModel): IGenre => ({
  _id: normalizeIdRequest(item.id),
  name: item.name,
});
