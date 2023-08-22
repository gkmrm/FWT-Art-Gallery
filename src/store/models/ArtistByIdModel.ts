import { IGenre, IGenreModel, normalizeGenres } from './GenreModel';
import { IId, IIdModel, normalizeIdResponse } from './IdModel';
import { IImage, IPaint, IPaintModel, normalizeIPaint } from './PaintModel';

export interface IArtistsById {
  paintings: IPaint[];
  genres: IGenre[];
  _id: IId;
  name: string;
  description: string;
  yearsOfLife: string;
  avatar: IImage;
  mainPainting: IPaint;
}

export interface IArtistsByIdModel {
  paintings: IPaintModel[];
  genres: IGenreModel[];
  id: IIdModel;
  name: string;
  description: string;
  years: string;
  avatar: IImage;
  mainPaint: IPaintModel;
}

export const normalizeIArtistById = (
  item: IArtistsById
): IArtistsByIdModel => ({
  paintings: item.paintings.map(normalizeIPaint),
  genres: item.genres.map(normalizeGenres),
  // eslint-disable-next-line no-underscore-dangle
  id: normalizeIdResponse(item._id),
  name: item.name,
  description: item.description,
  years: item.yearsOfLife,
  avatar: item.avatar,
  mainPaint: normalizeIPaint(item.mainPainting),
});
