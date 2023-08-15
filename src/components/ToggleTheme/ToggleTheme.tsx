import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as DarkIcon } from '@assets/icons/dark_icon.svg';
import { ReactComponent as LightIcon } from '@assets/icons/light_icon.svg';
import { useThemeContext } from '@context/ThemeContext';
import { Button } from '@ui-components/Button';

import styles from './ToggleTheme.module.scss';

const cx = cn.bind(styles);

type TToggleThemeProps = {
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ToggleTheme: React.FC<TToggleThemeProps> = ({ className, ...props }) => {
  const { theme, setTheme } = useThemeContext();

  const onThemeChange = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const classNames = cx('toggle', `toggle_${theme}`, className);

  return (
    <Button
      onClick={onThemeChange}
      type='button'
      className={classNames}
      {...props}
    >
      <span className={cx('toggle__icon', `toggle__icon_${theme}`)}>
        {theme === 'dark' ? <LightIcon /> : <DarkIcon />}
      </span>
      <span className={cx(`toggle__text`)}>
        {theme === 'dark' ? 'Dark mode' : 'Light mode'}
      </span>
    </Button>
  );
};

export default ToggleTheme;
