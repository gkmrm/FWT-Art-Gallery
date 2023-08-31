import { IGenre, IGenreModel, normalizeGenresRequest } from './GenreModel';

export interface IArtistEditRequest {
  name: string;
  yearsOfLife: string;
  descrition: string;
  genres: IGenre[];
  avatar: string;
}

export interface IArtistEditModel {
  title: string;
  subtitle: string;
  description: string;
  genres: IGenreModel[];
  avatar: string;
}

export const normalizeIArtistEditRequest = (
  item: IArtistEditModel
): IArtistEditRequest => ({
  name: item.title,
  yearsOfLife: item.subtitle,
  descrition: item.description,
  genres: item.genres.map(normalizeGenresRequest),
  avatar: item.avatar,
});
