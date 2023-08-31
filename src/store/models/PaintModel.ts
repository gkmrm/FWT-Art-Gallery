export interface IPaint {
  _id: string;
  name: string;
  yearOfCreation: string;
  image: IImage;
  artist: string;
}

export interface IPaintModel {
  id: string;
  title: string;
  subtitle: string;
  paint: IImageModel;
}

export interface IImage {
  _id: string;
  src: string;
  webp?: string;
  src2x?: string;
  webp2x?: string;
  original?: string;
}

export interface IImageModel {
  id: string;
  src: string;
  webp?: string;
  src2x?: string;
  webp2x?: string;
  original?: string;
}

export const normalizeIImage = (item: IImage): IImageModel => ({
  // eslint-disable-next-line no-underscore-dangle
  id: item._id,
  src: item.src,
  webp: item.webp,
  src2x: item.src2x,
  webp2x: item.webp2x,
  original: item.original,
});

export const normalizeIPaint = (item: IPaint): IPaintModel => ({
  // eslint-disable-next-line no-underscore-dangle
  id: item._id,
  title: item.name,
  subtitle: item.yearOfCreation,
  paint: normalizeIImage(item.image),
});
