import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as SelectIcon } from '@assets/icons/success_icon.svg';
import { ThemeType } from '@context/ThemeConext';

import styles from './CheckBox.module.scss';

const cx = cn.bind(styles);

type TCheckBoxProps = {
  isChecked: boolean;
  idFor: string;
  theme: ThemeType;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CheckBox: React.FC<TCheckBoxProps> = ({
  isChecked,
  idFor,
  theme,
  ...others
}) => (
  <label htmlFor={idFor} className={cx('checkbox__wrapper')}>
    <input
      className={cx('checkbox', `checkbox_${theme}`)}
      type='checkbox'
      id={idFor}
      checked={isChecked}
      readOnly
      {...others}
    />
    {isChecked && <SelectIcon className={cx('checkbox__icon')} />}
  </label>
);

export default CheckBox;
