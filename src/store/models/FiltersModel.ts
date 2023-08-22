export interface IArtistsParams {
  sortBy?: string;
  orderBy?: 'asc' | 'desc';
  name?: string;
  genres?: string[];
  perPage?: string;
  pageNumber?: string;
}
