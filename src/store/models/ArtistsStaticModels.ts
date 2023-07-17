import { IImage, IPaint } from './PaintModel';

export interface IArtistsStatic {
  genres: string[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  mainPainting: IPaint;
}

export interface IArtistsStaticModel {
  id: string;
  title: string;
  subtitle: string;
  paint: IImage;
}

export const normalizeDate = (date: string) =>
  date
    .split(' – ')
    .map((item) => new Date(item).getFullYear())
    .join(' - ');

export const normalizeIArtistsStatic = (
  item: IArtistsStatic
): IArtistsStaticModel => ({
  // eslint-disable-next-line no-underscore-dangle
  id: item._id,
  title: item.name,
  subtitle: normalizeDate(item.yearsOfLife),
  paint: item.mainPainting.image,
});

export default IArtistsStatic;
