import React, { useState } from 'react';

import cn from 'classnames/bind';

// import { ReactComponent as Tnak } from '@assets/icons/buger_icon.svg';
import { ReactComponent as BurgerIcon } from '@assets/icons/buger_icon.svg';
import { ReactComponent as CloseIcon } from '@assets/icons/delete_icon.svg';
import { ReactComponent as Logo } from '@assets/icons/logo.svg';
import { Container } from '@components/Container';
import { ToggleTheme } from '@components/ToggleTheme';
import { ThemeTypes } from '@hooks/ThemeConext';
import { Link } from '@ui-components/Link';

import styles from './Navigation2.module.scss';

const cx = cn.bind(styles);

type TNavigation2 = {
  theme: ThemeTypes;
};

const Navigation2: React.FC<TNavigation2> = ({ theme }) => {
  // TODO Сделать обработчик клика вне Navigation
  // const onOutsideCLick = () => {};
  const [navigation, setNavigation] = useState(false);

  const onOutsideClick = (): void => {
    setNavigation(false);
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
              navigation
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
            onClick={() => setNavigation(!navigation)}
            className={cx('header__button')}
          >
            {navigation ? <CloseIcon /> : <BurgerIcon />}
          </div>
        </div>
        {navigation ? (
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

export default Navigation2;
