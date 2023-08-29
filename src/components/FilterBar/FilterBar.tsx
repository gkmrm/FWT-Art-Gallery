import React, { useCallback, useEffect, useState } from 'react';

import cn from 'classnames/bind';

import { useFilterContext } from '@context/FilterContext';
import { ThemeType } from '@context/ThemeContext';
import { IArtistsModel } from '@models/ArtistsModel';
import { IArtistsParamsModel } from '@models/FiltersModel';
import { IGenreModel } from '@models/GenreModel';
import { IOption } from '@models/OptionModel';
import { artistApi } from '@store/services/ArtistsService';
import { genreApi } from '@store/services/GenresService';
import { Button } from '@ui-components/Button';
import { DropDown } from '@ui-components/DropDown';
import { Sidebar } from '@ui-components/Sidebar';

import styles from './FilterBar.module.scss';
import optionsSort from './optionsSort';

const cx = cn.bind(styles);

type TFilterBarProps = {
  isShow: boolean;
  onClose: () => void;
  theme: ThemeType;
};

const FilterBar: React.FC<TFilterBarProps> = ({ isShow, onClose, theme }) => {
  const { filters, setAllFilters, onClearFilter } = useFilterContext();
  const [filterGenres, setFilterGenres] = useState<IOption[]>(filters.genres);
  const [filterSort, setFilterSort] = useState<IOption[]>(filters.sortBy);
  const [filterOrder, setFilterOrder] = useState<IOption[]>(filters.sortBy);
  const [isClear, setClear] = useState(false);

  const { data: allGenres = [] } = genreApi.useFetchGenresQuery(null);

  const { data: { data: artistsGenres = [] } = {} } =
    artistApi.useFetchArtistsQuery({
      isAuth: true,
      params: {} as IArtistsParamsModel,
    });

  const getCurrentGenres = useCallback(
    (data: IGenreModel[], idGenres: string[]) => {
      const result: IGenreModel[] = [];

      data.map((item) => idGenres.includes(item.id) && result.push(item));

      return result;
    },
    []
  );

  const getExistingGenres = (data: IArtistsModel[]) =>
    data.map((item) => item.genres).flat();

  const currentGenres = getCurrentGenres(
    allGenres,
    getExistingGenres(artistsGenres)
  );

  const onFilterResults = useCallback(() => {
    setAllFilters({
      genres: filterGenres,
      sortBy: filterSort,
      orderBy: filterOrder,
      perPage: 6,
    });

    onClose();
  }, [filterGenres, filterOrder, filterSort, onClose, setAllFilters]);

  const onClear = useCallback(() => {
    setFilterGenres([]);
    setFilterSort([]);
    setClear(true);
    onClearFilter();
  }, [onClearFilter]);

  useEffect(() => setClear(false), [filterGenres, filterSort]);

  return (
    <Sidebar theme={theme} isShow={isShow} onClose={onClose}>
      <div className={cx('filterbar__wrapper')}>
        <div className={cx('filterbar__dropdowns')}>
          <DropDown
            isClear={isClear}
            name='genres'
            values={filters.genres}
            onFilterChange={setFilterGenres}
            options={currentGenres}
            theme={theme}
          />
          <DropDown
            isClear={isClear}
            name='sort by'
            values={filters.sortBy}
            onFilterChange={setFilterSort}
            options={optionsSort.sortBy}
            theme={theme}
            gridVariant='oneCol'
          />
          <DropDown
            isClear={isClear}
            name='order by'
            values={filters.orderBy}
            onFilterChange={setFilterOrder}
            options={optionsSort.orderBy}
            theme={theme}
            gridVariant='oneCol'
          />
        </div>
        <div className={cx('filterbar__buttons')}>
          <Button variant='text' theme={theme} onClick={onFilterResults}>
            show the result
          </Button>
          <Button variant='text' theme={theme} onClick={onClear}>
            clear
          </Button>
        </div>
      </div>
    </Sidebar>
  );
};

export default FilterBar;
