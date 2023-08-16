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
