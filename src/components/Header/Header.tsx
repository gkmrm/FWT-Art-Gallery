import React, { useState } from 'react';

import cn from 'classnames/bind';

import { ReactComponent as BurgerIcon } from '@assets/icons/buger_icon.svg';
import { ReactComponent as Logo } from '@assets/icons/logo.svg';
import { Container } from '@components/Container';
import { Menu } from '@components/Menu';
import { useThemeContext } from '@context/ThemeConext';
import { Link } from '@ui-components/Link';
import { Sidebar } from '@ui-components/Sidebar';

import styles from './Header.module.scss';

const cx = cn.bind(styles);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useThemeContext();

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <header className={cx('header', `header_${theme}`)}>
      <Container className={cx('header__container')}>
        <div className={cx('header__wrapper')}>
          <div className={cx('header__logo')}>
            <Link theme={theme} to='/'>
              <Logo className={cx('header__logo_icon')} />
            </Link>
          </div>
          <div className={cx('header__menu')}>
            <Menu theme={theme} />
          </div>
          <BurgerIcon onClick={toggleOpen} className={cx('header__burger')} />
        </div>
      </Container>
      <Sidebar theme={theme} isShow={isOpen} onClose={toggleOpen}>
        <Menu theme={theme} />
      </Sidebar>
    </header>
  );
};

export default Header;
