import { IOption } from '@store/models/testIOptionModel';

type ToptionsSort = {
  sortBy: IOption[];
  orderBy: IOption[];
};

const optionsSort: ToptionsSort = {
  sortBy: [
    { id: 'null', name: 'Randomly' },
    { id: 'name', name: 'Name' },
    { id: 'genres', name: 'Genres' },
  ],
  orderBy: [
    { id: 'asc', name: 'A-Z' },
    { id: 'desc', name: 'Z-A' },
    { id: 'null', name: 'Randomly' },
  ],
};

export default optionsSort;
