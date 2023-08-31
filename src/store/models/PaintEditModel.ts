export interface IPaintEditModel {
  title: string;
  subtitle: string;
  paint: string;
}

export interface IPaintEditRequest {
  name: string;
  yearOfCreation: number;
  image: string;
}

export const normalizeIPaintRequsest = (
  item: IPaintEditModel
): IPaintEditRequest => ({
  name: item.title,
  yearOfCreation: parseInt(item.subtitle, 10),
  image: item.paint,
});
