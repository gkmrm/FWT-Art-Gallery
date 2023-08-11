// import React, {
//   createContext,
//   FC,
//   ReactNode,
//   useCallback,
//   useMemo,
//   useState,
// } from 'react';

// // import { useSearchParams } from 'react-router-dom';

// export const removeEmpty = (obj: object) =>
//   Object.fromEntries(Object.entries(obj).filter(([, val]) => val));

// export interface IArtistParams {
//   sortBy?: string;
//   name?: string;
//   orderBy?: 'asc' | 'desc';
//   genres?: string[];
// }

// // export type Filters = { genres?: string } & Omit<IArtistParams, 'genres'> &
// //   Record<string, string | string[]>;

// export type Filters = {
//   sortBy?: string;
//   name?: string;
//   orderBy?: 'asc' | 'desc';
//   genres?: string[];
// };

// export const defaultFilters = {
//   name: '',
//   sortBy: '',
//   orederBy: '',
//   genres: '',
// };

// interface IFilterContext {
//   filters: Filters;
//   changeFilters: (newFilters: Filters) => void;
//   clearFilters: () => void;
//   clearSearch: () => void;
// }

// export const FilterContext = createContext({} as IFilterContext);

// interface IFilterProvider {
//   children: ReactNode;
// }

// const FilterProvider: FC<IFilterProvider> = ({ children }) => {
//   const [params, setParams] = useState<Filters>({});
//   const filters = useMemo(() => Object.fromEntries(params), [params]);

//   // useLayoutEffect(() => {
//   //   if (!params.toString() && window.location.pathname === '/') {
//   //     setParams(defaultFilters);
//   //   }
//   // });

//   const changeFilters = useCallback(
//     (newFilters: Filters) => setParams(removeEmpty(newFilters)),
//     [setParams]
//   );

//   const clearFilters = useCallback(
//     () => setParams(defaultFilters),
//     [setParams]
//   );

//   const clearSearch = useCallback(() => {
//     params.delete('name');
//     setParams(params);
//   }, [setParams]);

//   const contextValue = useMemo(
//     () =>
//       ({
//         filters,
//         changeFilters,
//         clearFilters,
//         clearSearch,
//       } as IFilterContext),
//     [filters, changeFilters, clearFilters, clearSearch]
//   );

//   return (
//     <FilterContext.Provider value={contextValue}>
//       {children}
//     </FilterContext.Provider>
//   );
// };

// export default FilterProvider;
import React, { createContext, useCallback, useMemo, useState } from 'react';

interface IOption {
  id: string;
  name: string;
}

export type FilterType = {
  genres: IOption[] | null;
  sortBy: IOption[] | null;
  search?: string;
};

export interface FilterProps {
  filters: FilterType;
  setFilters: (filters: FilterType) => void;
  onClearFilter: () => void;
}

const defaultFilter = {
  genres: [{ id: '', name: '' }],
  sortBy: [{ id: '', name: '' }],
  search: '',
};

export const filterDefaultValue: FilterProps = {
  filters: defaultFilter,
  setFilters: () => defaultFilter,
  onClearFilter: () => defaultFilter,
};

type TFiltersProvider = React.HTMLAttributes<HTMLDivElement>;

export const FilterContext = createContext<FilterProps>({} as FilterProps);

const FilterProvider: React.FC<TFiltersProvider> = ({ children }) => {
  const [params, setParams] = useState<FilterType>({
    genres: null,
    sortBy: null,
    search: '',
  });

  // const [filters, setFilters] = useState<FilterType>({
  //   genres: null,
  //   sortBy: null,
  //   search: '',
  // });

  const filters = params;

  const setFilters = useCallback(
    (filter: FilterType) => {
      console.log(filter);
      setParams(filter);
    },
    [setParams]
  );

  const onClearFilter = useCallback(() => {
    setFilters(filterDefaultValue.filters);
  }, [setFilters]);

  // const onChangeSort = useCallback(
  //   (obj: IOption) => {
  //     setFilters(obj);
  //   },
  //   [setFilters]
  // );

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
