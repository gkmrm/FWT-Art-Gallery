import React, { createContext, useCallback, useMemo, useState } from 'react';

import { IOption } from '@store/models/testIOptionModel';

export type FilterType = {
  genres: IOption[];
  sortBy: IOption[];
  search?: string;
};

export type FilterProps = {
  filters: FilterType;
  setFilters: (filters: FilterType) => void;
  onClearFilter: () => void;
};

const defaultFilter = {
  genres: [],
  sortBy: [],
  search: '',
};

export const filterDefaultValue: FilterProps = {
  filters: defaultFilter,
  setFilters: () => defaultFilter,
  onClearFilter: () => defaultFilter,
};

type TFiltersProvider = React.HTMLAttributes<HTMLDivElement>;

export const FilterContext = createContext<FilterProps>({} as FilterProps);

// Данный компонент пока выполняет функцию плейсхолдера,
// и будет доработан с добавлением запросов и авторизации

const FilterProvider: React.FC<TFiltersProvider> = ({ children }) => {
  const [params, setParams] = useState<FilterType>({
    genres: [],
    sortBy: [],
    search: '',
  });

  const filters = params;

  const setFilters = useCallback(
    (filter: FilterType) => {
      setParams(filter);
    },
    [setParams]
  );

  const onClearFilter = useCallback(() => {
    setFilters(filterDefaultValue.filters);
  }, [setFilters]);

  const filterValue = useMemo(
    () => ({
      filters,
      setFilters,
      onClearFilter,
    }),
    [filters, setFilters, onClearFilter]
  );

  return (
    <FilterContext.Provider value={filterValue}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
