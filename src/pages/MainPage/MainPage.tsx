import React from 'react';

import { useThemeContext } from '@hooks/ThemeConext';
import cn from 'classnames/bind';

import { Container } from '@components/Container';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { Skeleton } from '@components/ui-components/Skeleton';
import { artistsStaticApi } from '@store/services/ArtistsStaticService';
import { Card } from '@ui-components/Card';
import { Grid } from '@ui-components/Grid';

import styles from './MainPage.module.scss';

const cx = cn.bind(styles);

const MainPage: React.FC = () => {
  const { theme } = useThemeContext();
  const { data: artistStatic = [], isLoading } =
    artistsStaticApi.useFetchArtistsStaticQuery('');

  return (
    <div className={cx('mainPage', `mainPage_${theme}`)}>
      <Header />
      <Container className={cx('mainPage__wrapperPaint')}>
        {isLoading ? (
          <Grid>
            {Array.from({ length: 9 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Skeleton key={index} theme={theme} />
            ))}
          </Grid>
        ) : (
          <Grid className={cx('mainPage__grid')}>
            {artistStatic.map((item) => (
              <Card
                {...item}
                id={item.id}
                theme={theme}
                pathTo={`/artists/static/${item.id}`}
              />
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default MainPage;
