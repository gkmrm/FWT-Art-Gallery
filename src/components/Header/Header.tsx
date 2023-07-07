import React from 'react';

import cn from 'classnames/bind';

import { Container } from '@components/Container';
import { Navigation2 } from '@components/Navigation2';
import { useThemeContext } from '@hooks/ThemeConext';

import styles from './Header.module.scss';

const cx = cn.bind(styles);

export type THeaderProps = {
  className?: string;
};

const Header: React.FC<THeaderProps> = ({ className }) => {
  const { theme } = useThemeContext();

  return (
    <div className={cx(className, 'header', `header_${theme}`)}>
      <Container className={cx('container')}>
        <Navigation2 theme={theme} />
      </Container>
    </div>
  );
};

export default Header;
