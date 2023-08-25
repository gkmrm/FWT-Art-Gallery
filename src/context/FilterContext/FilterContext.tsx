import React, { createContext, useCallback, useMemo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import {
  IArtistsParamsModel,
  convertFromURLSearchParams,
  convertToParamsModel,
  convertToURLSearchParams,
  normalizeParams,
} from '@store/models/FiltersModel';

export interface FilterType extends IArtistsParamsModel {}

export type FilterProps = {
  filters: FilterType;
  setAllFilters: (filters: FilterType) => void;
  onClearFilter: () => void;
};

const defaultPagination = {
  perPage: '6',
  pageNumber: '1',
};

const defaultFilter: FilterType = {
  sortBy: [],
  orderBy: [],
  search: '',
  genres: [],
  perPage: 6,
};

export const filterDefaultValue: FilterProps = {
  filters: defaultFilter,
  setAllFilters: () => defaultFilter,
  onClearFilter: () => defaultFilter,
};

type TFiltersProvider = React.HTMLAttributes<HTMLDivElement>;

export const FilterContext = createContext<FilterProps>({} as FilterProps);

const FilterProvider: React.FC<TFiltersProvider> = ({ children }) => {
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterType>(
    convertToParamsModel({
      ...convertFromURLSearchParams(params),
      ...defaultPagination,
    })
  );

  const setAllFilters = useCallback(
    (filtersism: FilterType) => {
      setFilters(filtersism);
      setParams(convertToURLSearchParams(normalizeParams(filtersism)));
    },
    [setParams]
  );

  const onClearFilter = useCallback(() => {
    setFilters(filterDefaultValue.filters);
  }, [setFilters]);

  const filterValue = useMemo(
    () => ({
      filters,
      setAllFilters,
      onClearFilter,
    }),
    [filters, setAllFilters, onClearFilter]
  );

  return (
    <FilterContext.Provider value={filterValue}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
