import React from 'react';

import cn from 'classnames/bind';

import { DarkIcon, LightIcon } from '@assets/icons';
import { useThemeContext } from '@hooks/ThemeConext';
import { Button } from '@ui-components/Button';

import styles from './ToggleTheme.module.scss';

const cx = cn.bind(styles);

type TToggleThemeProps = {
  /**
   * Additional classNames for ToggleTheme
   */
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ToggleTheme: React.FC<TToggleThemeProps> = ({ className, ...props }) => {
  const themeContext = useThemeContext();
  // TODO Тут функция для смены темы
  const onThemeChange = () =>
    themeContext.setTheme(themeContext.theme === 'light' ? 'dark' : 'light');

  const classNames = cx('toggle', `toggle_${themeContext.theme}`, className);

  return (
    <Button
      onClick={onThemeChange}
      type='button'
      className={classNames}
      {...props}
    >
      <span
        className={cx('toggle__icon', `toggle__icon_${themeContext.theme}`)}
      >
        {themeContext.theme === 'dark' ? <LightIcon /> : <DarkIcon />}
      </span>
      <span className={cx(`toggle__text`)}>
        {themeContext.theme === 'dark' ? 'Dark mode' : 'Light mode'}
      </span>
    </Button>
  );
};

export default ToggleTheme;
