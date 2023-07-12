import React from 'react';

import cn from 'classnames/bind';

import { Container } from '@components/Container';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { useThemeContext } from '@context/ThemeConext';
import { Card } from '@ui-components/Card';
import { Grid } from '@ui-components/Grid';
import testData from '@ui-components/Grid/testDataforCardGrid';

import styles from './MainPage.module.scss';

const cx = cn.bind(styles);

const MainPage: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <div className={cx('mainPage', `mainPage_${theme}`)}>
      <Header />
      <Container className={cx('mainPage__wrapperPaint')}>
        <Grid className={cx('mainPage__grid')}>
          {testData.map((item) => (
            <Card {...item} id={item.id} theme={theme} />
          ))}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default MainPage;
