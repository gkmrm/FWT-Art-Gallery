import React from 'react';

import cn from 'classnames/bind';
import { uid } from 'uid';

import { Container } from '@components/Container';
import { useThemeContext } from '@context/ThemeConext';
import { artistsStaticApi } from '@store/services/ArtistsStaticService';
import { Card } from '@ui-components/Card';
import { Grid } from '@ui-components/Grid';
import { Skeleton } from '@ui-components/Skeleton';

import styles from './MainPage.module.scss';

const cx = cn.bind(styles);

const MainPage: React.FC = () => {
  const { theme } = useThemeContext();

  const { data: artistStatic = [], isLoading } =
    artistsStaticApi.useFetchArtistsStaticQuery('');

  return (
    <div className={cx('mainPage', `mainPage_${theme}`)}>
      <Container className={cx('mainPage__wrapperPaint')}>
        {isLoading ? (
          <Grid>
            {Array.from({ length: 9 }).map(() => (
              <Skeleton key={uid()} theme={theme} />
            ))}
          </Grid>
        ) : (
          <Grid className={cx('mainPage__grid')}>
            {artistStatic.map((item) => (
              <Card
                key={item.id}
                {...item}
                image={item.paint}
                id={item.id}
                theme={theme}
                pathTo={`/artists/static/${item.id}`}
              />
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default MainPage;
