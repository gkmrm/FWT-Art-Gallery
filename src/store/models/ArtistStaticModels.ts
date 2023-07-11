export interface IArtistStatic {
  genres: string[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  mainPainting: IMainPaint;
}

export interface IPaint {
  _id?: string;
  src: string;
  webp?: string;
  src2x?: string;
  webp2x?: string;
  original?: string;
}

export interface IMainPaint {
  _id: string;
  name: string;
  yearsOfCreation: string;
  image: IPaint;
  artist: string;
}

export interface IArtistStaticModel {
  id: string;
  title: string;
  subtitle: string;
  paint: IPaint;
}

export const normalizeIArtistStatic = (
  item: IArtistStatic
): IArtistStaticModel => ({
  // eslint-disable-next-line no-underscore-dangle
  id: item._id,
  title: item.name,
  subtitle: item.yearsOfLife,
  paint: item.mainPainting.image,
});

export default IArtistStatic;
