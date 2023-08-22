import React, { useCallback, useEffect, useState } from 'react';

import cn from 'classnames/bind';

import { useFilterContext } from '@context/FilterContext';
import { ThemeType } from '@context/ThemeContext';
import { IOption } from '@models/testIOptionModel';
// import { artistApi } from '@store/services/ArtistsService';
import { genreApi } from '@store/services/GenresService';
import { Button } from '@ui-components/Button';
import { DropDown } from '@ui-components/DropDown';
import { Sidebar } from '@ui-components/Sidebar';

import styles from './FilterBar.module.scss';

const cx = cn.bind(styles);

type TFilterBarProps = {
  isShow: boolean;
  onClose: () => void;
  theme: ThemeType;
};

const testDataSort: IOption[] = [
  {
    id: 'dasdasd',
    name: 'Recently added',
  },
  { id: 'dasdasasdad', name: 'A-Z' },
  { id: 'dasdas123d', name: 'Z-A' },
];

// Логика в этом компоненте пока выполняет функцию плейсхолдера,
// и будет доработана с добавлением запросов и авторизации

const FilterBar: React.FC<TFilterBarProps> = ({ isShow, onClose, theme }) => {
  const { filters, setFilters, onClearFilter } = useFilterContext();
  const [filterGenres, setFilterGenres] = useState<IOption[]>(filters.genres);
  const [filterSort, setFilterSort] = useState<IOption[]>(filters.sortBy);
  const [isClear, setClear] = useState(false);

  const { data: genres = [] } = genreApi.useFetchGenresQuery(null);

  const onFilterResults = useCallback(() => {
    setFilters({
      genres: filterGenres,
      sortBy: filterSort,
    });

    onClose();
  }, [filterGenres, filterSort, onClose, setFilters]);

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
            name='Genres'
            values={filters.genres}
            onFilterChange={setFilterGenres}
            options={genres}
            theme={theme}
          />
          <DropDown
            isClear={isClear}
            name='Sort by'
            values={filters.sortBy}
            onFilterChange={setFilterSort}
            options={testDataSort}
            theme={theme}
            gridVariant='oneCol'
          />
        </div>
      </div>
      <div className={cx('filterbar__buttons')}>
        <Button variant='text' theme={theme} onClick={onFilterResults}>
          show the result
        </Button>
        <Button variant='text' theme={theme} onClick={onClear}>
          clear
        </Button>
      </div>
    </Sidebar>
  );
};

export default FilterBar;
