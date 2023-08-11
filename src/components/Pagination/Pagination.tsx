import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as ArrowLeft } from '@assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from '@assets/icons/arrow-right.svg';
import { ThemeType } from '@context/ThemeContext';
import usePaginationSlice from '@hooks/usePaginationSlice';
import { PaginationItem } from '@ui-components/PaginationItem';

import styles from './Pagination.module.scss';

const cx = cn.bind(styles);

export type TPaginationProps = {
  theme: ThemeType;
  pagesAmount: number;
  currentPage: number;
  className?: string;
  onChange?: (currentPage: number) => void;
};

const Pagination: React.FC<TPaginationProps> = ({
  currentPage,
  pagesAmount,
  className,
  onChange = () => {},
  theme,
}) => {
  const slicedPagesArray = usePaginationSlice({
    current: currentPage,
    amount: pagesAmount,
  });

  return (
    <div className={cx(className, 'pagination')}>
      <PaginationItem theme={theme} onClick={() => onChange(currentPage - 1)}>
        <ArrowLeft
          className={cx('pagination__arrow', `pagination__arrow_${theme}`)}
        />
      </PaginationItem>
      {currentPage >= 3 && (
        <PaginationItem
          theme={theme}
          onClick={() => onChange(currentPage + 1 - currentPage)}
        >
          1
        </PaginationItem>
      )}
      {currentPage >= 4 && (
        <PaginationItem theme={theme} isDisabled>
          ...
        </PaginationItem>
      )}
      {slicedPagesArray.map((el) => (
        <PaginationItem
          theme={theme}
          onClick={() => onChange(el)}
          isActive={currentPage === el}
          key={el}
        >
          {el}
        </PaginationItem>
      ))}
      {currentPage <= pagesAmount - 3 && (
        <PaginationItem theme={theme} isDisabled>
          ...
        </PaginationItem>
      )}
      {currentPage <= pagesAmount - 2 && (
        <PaginationItem theme={theme} onClick={() => onChange(pagesAmount)}>
          {pagesAmount}
        </PaginationItem>
      )}
      <PaginationItem theme={theme} onClick={() => onChange(currentPage + 1)}>
        <ArrowRight
          className={cx('pagination__arrow', `pagination__arrow_${theme}`)}
        />
      </PaginationItem>
    </div>
  );
};

export default Pagination;
