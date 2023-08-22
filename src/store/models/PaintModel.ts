export interface IPaint {
  _id: string;
  name: string;
  yearOfCreation: string;
  image: IImage;
  artist: string;
}

export interface IImage {
  _id?: string;
  src: string;
  webp?: string;
  src2x?: string;
  webp2x?: string;
  original?: string;
}

export interface IPaintModel {
  id?: string;
  title: string;
  subtitle: string;
  paint: IImage;
}

export const normalizeIPaint = (item: IPaint): IPaintModel => ({
  // eslint-disable-next-line no-underscore-dangle
  id: item._id,
  title: item.name,
  subtitle: item.yearOfCreation,
  paint: item.image,
});
