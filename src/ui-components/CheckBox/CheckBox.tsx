import React, { InputHTMLAttributes } from 'react';

import cn from 'classnames/bind';

import { ReactComponent as SelectIcon } from '@assets/icons/success_icon.svg';
import { ThemeType } from '@context/ThemeContext';

import styles from './CheckBox.module.scss';

const cx = cn.bind(styles);

interface TCheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  theme: ThemeType;
}

const CheckBox: React.FC<TCheckBoxProps> = ({ name, theme, ...others }) => (
  <label htmlFor={name} className={cx('checkbox__wrapper')}>
    <input
      className={cx('checkbox', `checkbox_${theme}`)}
      type='checkbox'
      id={name}
      readOnly
      {...others}
    />
    {others.checked && <SelectIcon className={cx('checkbox__icon')} />}
  </label>
);

export default CheckBox;
