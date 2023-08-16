import { IGenre, IGenreModel, normalizeGenres } from './GenreModel';
import { IImage, IPaint, IPaintModel, normalizeIPaint } from './PaintModel';

export interface IArtistsById {
  paintings: IPaint[];
  genres: IGenre[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  avatar: IImage;
  mainPainting: IPaint;
}

export interface IArtistsByIdModel {
  paintings: IPaintModel[];
  genres: IGenreModel[];
  id: string;
  name: string;
  description: string;
  years: string;
  avatar: IImage;
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
  avatar: item.avatar,
});
