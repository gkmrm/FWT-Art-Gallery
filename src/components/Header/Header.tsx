import React, { useCallback, useRef, useState } from 'react';

import cn from 'classnames/bind';
import _ from 'lodash';

import { ReactComponent as BurgerIcon } from '@assets/icons/buger_icon.svg';
import { ReactComponent as Logo } from '@assets/icons/logo.svg';
import { ReactComponent as LoupeIcon } from '@assets/icons/search_icon.svg';
import { Container } from '@components/Container';
import { Menu } from '@components/Menu';
import { useThemeContext } from '@context/ThemeContext';
import useOutsideClick from '@hooks/useOutsideClick';
import { Link } from '@ui-components/Link';
import { Search } from '@ui-components/Search';
import { Sidebar } from '@ui-components/Sidebar';

import styles from './Header.module.scss';

const cx = cn.bind(styles);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { theme } = useThemeContext();
  const ref = useRef<null | HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const onOpen = () => setSearchOpen(true);

  const onChange = React.useCallback((str: string) => {
    console.log(str);
  }, []);

  const handleToggle = useCallback(() => {
    setSearchOpen(false);
  }, [setSearchOpen]);

  const debounceSearchQuery = _.debounce(onChange, 650);

  useOutsideClick(ref, handleToggle);

  return (
    <header className={cx('header', `header_${theme}`)}>
      <Container className={cx('header__container')}>
        <div className={cx('header__wrapper')}>
          <div
            className={cx('header__logo', { header__logo_hide: isSearchOpen })}
          >
            <Link className={cx()} theme={theme} to='/'>
              <Logo className={cx('header__logo_icon')} />
            </Link>
          </div>
          <div className={cx('header__menu')}>
            <Menu theme={theme} />
          </div>
          <div
            className={cx('header__controls', {
              header__controls_width: isSearchOpen,
            })}
          >
            <div
              className={cx('header__searchbar', {
                header__searchbar_width: isSearchOpen,
              })}
              ref={ref}
            >
              <LoupeIcon
                onClick={onOpen}
                className={cx('header__loupe', {
                  header__loupe_disabled: isSearchOpen,
                })}
              />
              <Search
                className={cx('header__search', {
                  header__search_open: isSearchOpen,
                })}
                theme={theme}
                errorMessage=''
                onChange={debounceSearchQuery}
                classNameInput={cx('header__search_input')}
              />
            </div>
            <BurgerIcon onClick={toggleOpen} className={cx('header__burger')} />
          </div>
        </div>
      </Container>
      <Sidebar theme={theme} isShow={isOpen} onClose={toggleOpen}>
        <Menu theme={theme} />
      </Sidebar>
    </header>
  );
};

export default Header;
