import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as DarkIcon } from '@assets/icons/dark_icon.svg';
import { ReactComponent as LightIcon } from '@assets/icons/light_icon.svg';
import { Button } from '@ui-components/Button';

import styles from './ToggleTheme.module.scss';

const cx = cn.bind(styles);

type TToggleThemeProps = {
  theme?: 'light' | 'dark';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ToggleTheme: React.FC<TToggleThemeProps> = ({
  theme = 'light',
  ...props
}) => {
  // TODO Тут функция для смены темы
  const onThemeChange = () => {};

  const classNames = cx('Toggle', `Toggle_${theme}`);

  return (
    <Button
      onClick={onThemeChange}
      type='button'
      className={classNames}
      {...props}
    >
      {theme === 'dark' ? <LightIcon /> : <DarkIcon />}
    </Button>
  );
};

export default ToggleTheme;
