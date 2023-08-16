import { IImage, IPaint } from './PaintModel';

export interface IArtists {
  genres: string[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  mainPainting: IPaint;
}

export interface IArtistsModel {
  id: string;
  title: string;
  subtitle: string;
  paint: IImage;
}

export interface IArtistsAuth {
  data: IArtists[];
  meta: {
    count: number;
    pageNumber: number;
    perPage: number;
  };
}

export interface IArtistsParams {
  sortBy?: string;
  name?: string;
  orderBy?: 'asc' | 'desc';
  perPage?: string;
  genres?: string[];
  pageNumber?: string;
}

export const normalizeDate = (date: string) =>
  date
    .split(' – ')
    .map((item) => new Date(item).getFullYear())
    .join(' - ');

export const normalizeIArtists = (item: IArtists): IArtistsModel => ({
  // eslint-disable-next-line no-underscore-dangle
  id: item._id,
  title: item.name,
  subtitle: normalizeDate(item.yearsOfLife),
  paint: item.mainPainting.image,
});

export default IArtists;
