import React from 'react';

import cn from 'classnames/bind';

import { Container } from '@components/Container';
// import { useThemeContext } from '@hooks/ThemeContext';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';

import styles from './Footer.module.scss';

const cx = cn.bind(styles);

export type TMainPageProps = {
  className: string;
  isDarkTheme: boolean;
};

const MainPage: React.FC<TMainPageProps> = ({ className, isDarkTheme }) => (
  // const { isDarkTheme } = useThemeContext();
  <div
    className={cx(className, 'MainPage', { [`MainPage_dark`]: isDarkTheme })}
  >
    <Container>
      <Header isDarkTheme={false} />
      <div
        className={cx('CardGrid_wrapper', {
          [`CardGrid_wrapper_dark`]: isDarkTheme,
        })}
      >
        {/* <CardGrid /> */}
      </div>
      <Footer isDarkTheme={false} />
    </Container>
  </div>
);

export default MainPage;
