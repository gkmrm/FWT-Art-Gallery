import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as DarkIcon } from '@assets/icons/dark_icon.svg';
import { ReactComponent as LightIcon } from '@assets/icons/light_icon.svg';

import styles from './ToggleTheme.module.scss';

const cx = cn.bind(styles);

type TToggleThemeProps = {
  isDarkTheme?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ToggleTheme: React.FC<TToggleThemeProps> = ({
  isDarkTheme = false,
  children,
  ...props
}) => {
  // Тут функция для смены темы
  const onThemeChange = () => {};

  const classNames = cx('Toggle', {
    [`Toggle_dark`]: isDarkTheme,
  });

  return (
    <button
      onClick={onThemeChange}
      type='button'
      className={classNames}
      {...props}
    >
      {isDarkTheme ? <LightIcon /> : <DarkIcon />}
    </button>
  );
};

export default ToggleTheme;
