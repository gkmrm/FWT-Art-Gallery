import React, { useCallback, useEffect, useState } from 'react';

import cn from 'classnames/bind';

import { useFilterContext } from '@context/FilterContext';
import { ThemeType } from '@context/ThemeContext';
import { IOption } from '@store/models/testIOptionModel';
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

const testData: IOption[] = [
  {
    id: '64761911c25ef9fb3e0cdad9',
    name: 'Realism',
  },
  {
    id: '64761912c25ef9fb3e0cdaed',
    name: 'Modernism',
  },
  {
    id: '64761912c25ef9fb3e0cdaef',
    name: 'Expressionism',
  },
  {
    id: '64761912c25ef9fb3e0cdaf1',
    name: 'Cubism',
  },
  {
    id: '64761912c25ef9fb3e0cdaf3',
    name: 'Art Deco',
  },
  {
    id: '64761912c25ef9fb3e0cdaf5',
    name: 'Avant-garde',
  },
  {
    id: '64761912c25ef9fb3e0cdaf7',
    name: 'Baroque',
  },
];

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
  const [filterGenres, setFilterGenres] = useState<IOption[]>(
    filters.genres as IOption[]
  );
  const [filterSort, setFilterSort] = useState<IOption[]>(
    filters.sortBy as IOption[]
  );
  const [isClear, setClear] = useState(false);

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
            options={testData}
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
