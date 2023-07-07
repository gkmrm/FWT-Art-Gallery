import React from 'react';

import cn from 'classnames/bind';

// import { ReactComponent as Tnak } from '@assets/icons/buger_icon.svg';
import { ToggleTheme } from '@components/ToggleTheme';
import { ThemeTypes } from '@hooks/ThemeConext';
import { Link } from '@ui-components/Link';

import styles from './Navigation.module.scss';

const cx = cn.bind(styles);

type TNavigation = {
  theme: ThemeTypes;
};

const Navigation: React.FC<TNavigation> = ({ theme }) => {
  // TODO Сделать обработчик клика вне Navigation
  const onOutsideCLick = () => {};

  return (
    <div className={cx('wrapper')}>
      <input className={cx('menu__button')} type='checkbox' id='menu-btn' />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={cx('menu__icon')} htmlFor='menu-btn'>
        <span className={cx('navicon', `navicon_${theme}`)} />
      </label>
      <nav className={cx('menu', `menu_${theme}`)}>
        <Link href='/' theme={theme} className={cx('login')}>
          LOG IN
        </Link>
        <Link href='/' theme={theme} className={cx('signup')}>
          SIGN UP
        </Link>
        <ToggleTheme className={cx('toggle')} />
      </nav>
      <div
        className={cx('blur')}
        role='presentation'
        onClick={onOutsideCLick}
      />
    </div>
  );
};

export default Navigation;
