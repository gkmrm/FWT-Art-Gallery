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

export const normalizeIArtistsStatic = (
  item: IArtistsStatic
): IArtistsStaticModel => ({
  // eslint-disable-next-line no-underscore-dangle
  id: item._id,
  title: item.name,
  subtitle: item.yearsOfLife,
  paint: item.mainPainting.image,
});

export default IArtistsStatic;
