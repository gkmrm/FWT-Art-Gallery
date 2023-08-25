import { IImageModel, IPaint, normalizeIImage } from './PaintModel';

export interface IArtists {
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  mainPainting?: IPaint | null;
  genres: string[];
}

export interface IArtistsModel {
  id: string;
  title: string;
  subtitle: string;
  paint: IImageModel | null;
  genres: string[];
}

export interface IArtistsMeta {
  count: number;
  pageNumber: number;
  perPage: number;
}

export interface IArtistsAuth {
  data: IArtists[];
  meta: IArtistsMeta;
}

export interface IAristsModelAuth {
  data: IArtistsModel[];
  meta: IArtistsMeta;
}

export interface IArtistsResponse {
  data: IArtistsModel[];
  meta: IArtistsMeta | null;
}

export const normalizeDate = (date: string) =>
  date
    .split('–')
    .map((item) => new Date(item).getFullYear())
    .join(' - ');

export const normalizeDateRequset = (date: string) =>
  date
    .split('-')
    .map((item) => new Date(item).getFullYear())
    .join(' – ');

export const normalizeIArtists = (item: IArtists): IArtistsModel => ({
  // eslint-disable-next-line no-underscore-dangle
  id: item._id,
  title: item.name,
  subtitle: normalizeDate(item.yearsOfLife),
  paint: item.mainPainting ? normalizeIImage(item.mainPainting.image) : null,
  genres: item.genres,
});

export default IArtists;

export const normalizeIdRequest = (id: string) => ({
  _id: id,
});
