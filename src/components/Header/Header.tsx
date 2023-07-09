import React, { useState } from 'react';

import cn from 'classnames/bind';

import { BurgerIcon, CloseIcon, Logo } from '@assets/icons';
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

  const menuClassNames = isNavigationActive
    ? cx('header__menu', 'header__menu_active', `header__menu_${theme}`)
    : cx('header__menu', `header__menu_${theme}`);

  return (
    <header className={cx('header', `header_${theme}`)}>
      <Container className={cx('header__container')}>
        <div className={cx('header__wrapper')}>
          <div className={cx('header__logo')}>
            <Link theme={theme} href='/'>
              <Logo />
            </Link>
          </div>
          <div className={menuClassNames}>
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
          <div
            onClick={() => setNavigationStatus(!isNavigationActive)}
            onKeyDown={() => setNavigationStatus(!isNavigationActive)}
            className={cx('header__button', {
              [`header__button_active`]: isNavigationActive,
            })}
            role='button'
            tabIndex={0}
          >
            {isNavigationActive ? <CloseIcon /> : <BurgerIcon />}
          </div>
        </div>
        {isNavigationActive ? (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <div
            className={cx('blur', `blur_${theme}`)}
            onClick={onOutsideClick}
            onKeyDown={onOutsideClick}
            role='button'
            tabIndex={0}
          />
        ) : (
          ''
        )}
      </Container>
    </header>
  );
};

export default Header;
