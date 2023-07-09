import React, { useState } from 'react';

import cn from 'classnames/bind';

import { ReactComponent as BurgerIcon } from '@assets/icons/buger_icon.svg';
import { ReactComponent as CloseIcon } from '@assets/icons/delete_icon.svg';
import { ReactComponent as Logo } from '@assets/icons/logo.svg';
import { Container } from '@components/Container';
import { ToggleTheme } from '@components/ToggleTheme';
import { ThemeTypes } from '@hooks/ThemeConext';
import { Link } from '@ui-components/Link';

import styles from './Header.module.scss';

const cx = cn.bind(styles);

type THeaderProps = {
  /**
   * Theme from parent component = 'light' | 'dark'
   */
  theme: ThemeTypes;
};

const Header: React.FC<THeaderProps> = ({ theme }) => {
  const [isNavigationActive, setNavigationStatus] = useState(false);

  // TODO Сделать лучше
  const onOutsideClick = (): void => {
    setNavigationStatus(false);
  };

  return (
    <header className={cx('header', `header_${theme}`)}>
      <Container className={cx('header__container')}>
        <div className={cx('header__wrapper')}>
          <div className={cx('header__logo')}>
            <Link theme={theme} href='/'>
              <Logo />
            </Link>
          </div>
          <div
            className={
              isNavigationActive
                ? cx(
                    'header__menu',
                    'header__menu_active',
                    `header__menu_${theme}`
                  )
                : cx('header__menu', `header__menu_${theme}`)
            }
          >
            <ToggleTheme />
            <nav>
              <ul className={cx('header__nav')}>
                <li>
                  <Link
                    href='##'
                    theme={theme}
                    className={cx('header__nav_link')}
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    href='##'
                    theme={theme}
                    className={cx('header__nav_link')}
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            onClick={() => setNavigationStatus(!isNavigationActive)}
            className={cx('header__button')}
          >
            {isNavigationActive ? <CloseIcon /> : <BurgerIcon />}
          </div>
        </div>
        {isNavigationActive ? (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            className={cx('blur', `blur_${theme}`)}
            onClick={onOutsideClick}
          />
        ) : (
          ''
        )}
      </Container>
    </header>
  );
};

export default Header;
