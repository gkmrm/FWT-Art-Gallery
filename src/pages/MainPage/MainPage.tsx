import React from 'react';

import cn from 'classnames/bind';

import { Container } from '@components/Container';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { Loader } from '@components/ui-components/Loader';
import { useThemeContext } from '@hooks/ThemeConext';
import { artistsStaticApi } from '@store/services/ArtistsStaticService';
import { Card } from '@ui-components/Card';
import { Grid } from '@ui-components/Grid';

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
  const { data: artistStatic = [], isLoading } =
    artistsStaticApi.useFetchArtistsStaticQuery('');

  return (
    <div className={cx(className, 'mainPage', `mainPage_${theme}`)}>
      <Header theme={theme} />
      <Container className={cx('mainPage__wrapperPaint')}>
        {isLoading ? (
          <Loader />
        ) : (
          <Grid className={cx('mainPage__grid')}>
            {artistStatic.map((item) => (
              <Card {...item} id={item.id} theme={theme} onClick={() => {}} />
            ))}
          </Grid>
        )}
      </Container>
      <Footer theme={theme} />
    </div>
  );
};

export default MainPage;
