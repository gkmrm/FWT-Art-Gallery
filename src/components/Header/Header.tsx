import React, { useState } from 'react';

import cn from 'classnames/bind';

import { ReactComponent as BurgerIcon } from '@assets/icons/buger_icon.svg';
import { ReactComponent as CloseIcon } from '@assets/icons/close_icon.svg';
import { ReactComponent as Logo } from '@assets/icons/logo.svg';
import { Container } from '@components/Container';
import { ToggleTheme } from '@components/ToggleTheme';
import { useThemeContext } from '@context/ThemeConext';
import { Link } from '@ui-components/Link';

import styles from './Header.module.scss';

const cx = cn.bind(styles);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useThemeContext();

  // TODO Сделать лучше
  const onOutsideClick = (): void => {
    setIsOpen(false);
  };

  const toggleOpen = () => setIsOpen(!isOpen);

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
            className={cx('header__menu', `header__menu_${theme}`, {
              header__menu_active: isOpen,
            })}
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
          <div
            onClick={toggleOpen}
            onKeyDown={toggleOpen}
            className={cx('header__button', {
              header__button_active: isOpen,
            })}
            role='presentation'
          >
            {isOpen ? <CloseIcon /> : <BurgerIcon />}
          </div>
        </div>
        {isOpen && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            className={cx('blur', `blur_${theme}`)}
            onClick={onOutsideClick}
            onKeyDown={onOutsideClick}
            type='button'
          />
        )}
      </Container>
    </header>
  );
};

export default Header;
