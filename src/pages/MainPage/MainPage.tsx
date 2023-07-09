import React from 'react';

import cn from 'classnames/bind';

import { Container } from '@components/Container';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { useThemeContext } from '@hooks/ThemeConext';
import { Card } from '@ui-components/Card';
import { Grid } from '@ui-components/Grid';
import testData from '@ui-components/Grid/testDataforCardGrid';

import styles from './MainPage.module.scss';

const cx = cn.bind(styles);

export type TMainPageProps = {
  /**
   * Additional classNames for MainPage
   */
  className?: string;
};

const MainPage: React.FC<TMainPageProps> = ({ className }) => {
  const { theme } = useThemeContext();

  return (
    <div className={cx(className, 'mainPage', `mainPage_${theme}`)}>
      <Header theme={theme} />
      <Container className={cx('mainPage__wrapperPaint')}>
        <Grid className={cx('mainPage__grid')}>
          {testData.map((item) => (
            <Card {...item} id={item.id} theme={theme} />
          ))}
        </Grid>
      </Container>
      <Footer theme={theme} />
    </div>
  );
};

export default MainPage;
