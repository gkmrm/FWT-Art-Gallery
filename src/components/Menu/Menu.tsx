import React from 'react';

import cn from 'classnames/bind';
import { useLocation } from 'react-router-dom';

import { ToggleTheme } from '@components/ToggleTheme';
import { ThemeType } from '@context/ThemeConext';
import { Link } from '@ui-components/Link';

import styles from './Menu.module.scss';

type TMenuProps = {
  theme: ThemeType;
} & React.HTMLAttributes<HTMLDivElement>;

const cx = cn.bind(styles);

const Menu: React.FC<TMenuProps> = ({ theme, ...other }) => {
  const location = useLocation();

  return (
    <div className={cx('menu', `menu_${theme}`)} {...other}>
      <ToggleTheme />
      <nav>
        <ul className={cx('menu__nav')}>
          <li>
            <Link
              to='/login'
              state={{ background: location }}
              theme={theme}
              className={cx('menu__nav_link')}
            >
              Log in
            </Link>
          </li>
          <li>
            <Link
              to='/signup'
              state={{ background: location }}
              theme={theme}
              className={cx('menu__nav_link')}
            >
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;