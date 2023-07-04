import React from 'react';

import cn from 'classnames/bind';

import { Container } from '@components/Container';
// import { useThemeContext } from '@hooks/ThemeContext';

import styles from './Header.module.scss';

const cx = cn.bind(styles);

export type THeaderProps = {
  className?: string;
  isDarkTheme: boolean;
};

const Header: React.FC<THeaderProps> = ({ className, isDarkTheme }) => (
  // const { isDarkTheme } = useThemeContext();
  <div className={cx(className, 'Header', { [`Header_dark`]: isDarkTheme })}>
    <Container>
      {/* <div className={cx(className, 'Inner')}>
        <div className={cx(className, 'Inner__logo')}>LOGO</div>
        <div className={cx(className, 'Inner__menu')}>
          <div className={cx(className, 'Inner__menu_button')}>
            <input
              className={cx(className, 'menu__toggle')}
              id='menu__toggle'
              type='checkbox'
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      {/* <label
              className={cx(className, 'menu__btn')}
              htmlFor='menu__toggle'
            >
              <span>XNJ</span>
            </label>
            <ul className={cx(className, 'menu__box')}>
              <li>
                <button type='button'>КАрт переключить тему</button>
              </li>
              <li>
                <a className={cx(className, 'menu__item')} href='#1'>
                  Login
                </a>
              </li>
              <li>
                <a className={cx(className, 'menu__item')} href='#2'>
                  Logout
                </a>
              </li>
            </ul>
          </div>
          themeChanger
        </div> */}
      {/* </div> */}
      <section className={cx('top-nav')}>
        <div>Logo Here</div>
        <input id='menu-toggle' type='checkbox' />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={cx('menu-button-container')} htmlFor='menu-toggle'>
          <div className={cx('menu-button')} />
        </label>
        <ul className={cx('menu')}>
          <li>One</li>
          <li>Two</li>
          <li>Three</li>
          <li>Four</li>
          <li>Five</li>
        </ul>
      </section>
    </Container>
  </div>
);

export default Header;
