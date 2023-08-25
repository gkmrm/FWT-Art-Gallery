import { IGenre, IGenreModel, normalizeGenres } from './GenreModel';
import {
  IImage,
  IImageModel,
  IPaint,
  IPaintModel,
  normalizeIImage,
  normalizeIPaint,
} from './PaintModel';

export interface IArtistsById {
  paintings: IPaint[];
  genres: IGenre[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  avatar: IImage | null;
  mainPainting: IPaint | null;
}

export interface IArtistsByIdModel {
  paintings: IPaintModel[];
  genres: IGenreModel[];
  id: string;
  name: string;
  description: string;
  years: string;
  avatar: IImageModel | null;
  mainPaint: IPaintModel | null;
}

export const normalizeIArtistById = (
  item: IArtistsById
): IArtistsByIdModel => ({
  paintings: item.paintings.map(normalizeIPaint),
  genres: item.genres.map(normalizeGenres),
  // eslint-disable-next-line no-underscore-dangle
  id: item._id,
  name: item.name,
  description: item.description,
  years: item.yearsOfLife,
  avatar: item.avatar ? normalizeIImage(item.avatar) : null,
  mainPaint: item.mainPainting ? normalizeIPaint(item.mainPainting) : null,
});
