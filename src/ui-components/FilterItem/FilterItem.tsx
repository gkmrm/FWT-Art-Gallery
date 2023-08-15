import React from 'react';

import cn from 'classnames/bind';

import { ThemeType } from '@context/ThemeContext';
import { IOption } from '@store/models/testIOptionModel';

import styles from './FilterItem.module.scss';

const cx = cn.bind(styles);

type TFilterItemProps = {
  theme: ThemeType;
  handleChange: (obj: IOption) => void;
  isSelected: boolean;
  data: IOption;
} & React.HTMLAttributes<HTMLDivElement>;

const FilterItem: React.FC<TFilterItemProps> = ({
  theme,
  handleChange,
  isSelected,
  data,
  ...other
}) => (
  <div
    className={cx('filterItem', `filterItem_${theme}`, {
      [`filterItem_${theme}_selected`]: isSelected,
    })}
    role='presentation'
    onClick={() => handleChange(data)}
    {...other}
  >
    {data.name}
  </div>
);

export default FilterItem;
