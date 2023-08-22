export interface IId {
  _id: string;
}

export interface IIdModel {
  id: string;
}

export const normalizeIdResponse = (item: IId): IIdModel => ({
  // eslint-disable-next-line no-underscore-dangle
  id: item._id,
});

export const normalizeIdRequest = (item: IIdModel): IId => ({
  _id: item.id,
});
