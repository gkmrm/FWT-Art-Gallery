import React from 'react';

import cn from 'classnames/bind';

import { ThemeType } from '@context/ThemeContext';

import styles from './PaginationItem.module.scss';

const cx = cn.bind(styles);

export type TPaginationItemProps = {
  theme: ThemeType;
  isDisabled?: boolean;
  className?: string;
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PaginationItem: React.FC<TPaginationItemProps> = ({
  theme,
  className = '',
  isDisabled,
  isActive = false,
  ...other
}) => (
  <button
    type='button'
    className={cx(
      'paginationItem',
      `paginationItem_${theme}`,
      {
        paginationItem_disabled: isDisabled,
        [`paginationItem_active_${theme}`]: isActive,
        paginationItem_active: isActive,
      },
      className
    )}
    {...other}
  />
);

export default PaginationItem;
