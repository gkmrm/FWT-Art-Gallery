import { IId, IIdModel, normalizeIdResponse } from './IdModel';
import { IImage, IPaint } from './PaintModel';

export interface IArtists {
  genres: string[];
  _id: IId;
  name: string;
  description: string;
  yearsOfLife: string;
  mainPainting: IPaint;
}

export interface IArtistsModel {
  id: IIdModel;
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

export const normalizeDate = (date: string) =>
  date
    .split(' – ')
    .map((item) => new Date(item).getFullYear())
    .join(' - ');

export const normalizeIArtists = (item: IArtists): IArtistsModel => ({
  // eslint-disable-next-line no-underscore-dangle
  id: normalizeIdResponse(item._id),
  title: item.name,
  subtitle: normalizeDate(item.yearsOfLife),
  paint: item.mainPainting.image,
});

export default IArtists;
