import { IImage, IPaint, IPaintModel, normalizeIPaint } from './PaintModel';

export interface IArtistsStaticById {
  paintings: IPaint[];
  genres: IGenre[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  avatar: IImage;
  mainPainting: IPaint;
}

export interface IGenre {
  _id: string;
  name: string;
}

export interface IGenreModel {
  id: string;
  name: string;
}

export const normalizeGenres = (item: IGenre): IGenreModel => ({
  // eslint-disable-next-line no-underscore-dangle
  id: item._id,
  name: item.name,
});

export interface IArtistsStaticByIdModel {
  paintings: IPaintModel[];
  genres: IGenreModel[];
  id: string;
  name: string;
  description: string;
  years: string;
  avatar: IImage;
}

export const normalizeIArtistStaticById = (
  item: IArtistsStaticById
): IArtistsStaticByIdModel => ({
  paintings: item.paintings.map(normalizeIPaint),
  genres: item.genres.map(normalizeGenres),
  // eslint-disable-next-line no-underscore-dangle
  id: item._id,
  name: item.name,
  description: item.description,
  years: item.yearsOfLife,
  avatar: item.avatar,
});
