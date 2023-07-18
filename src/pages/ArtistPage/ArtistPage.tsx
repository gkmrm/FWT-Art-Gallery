import React from 'react';

import { ArrowCardIcon } from '@assets/icons';
import { Card } from '@components/ui-components/Card';
import { Grid } from '@components/ui-components/Grid';
import { Link } from '@components/ui-components/Link';
import { useThemeContext } from '@hooks/ThemeConext';
import cn from 'classnames/bind';
import { useParams } from 'react-router-dom';

import { ArtistInfo } from '@components/ArtistInfo';
import { Container } from '@components/Container';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { Loader } from '@components/ui-components/Loader';
import { Skeleton } from '@components/ui-components/Skeleton';
import { artistsStaticApi } from '@store/services/ArtistsStaticService';

import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

const ArtistPage: React.FC = () => {
  const { theme } = useThemeContext();
  const { id = '' } = useParams();

  const { data: artist, isLoading } =
    artistsStaticApi.useFetchArtistStaticByIdQuery(id);

  return (
    <div className={cx('artistPage', `artistPage_${theme}`)}>
      <Header theme={theme} />
      <div className={cx('link')}>
        <Link theme={theme} to='/' className={cx('link__content')}>
          <ArrowCardIcon className={cx('link__arrow')} />
        </Link>
      </div>
      {isLoading ? <Loader theme={theme} /> : ''}
      {artist && (
        <>
          <ArtistInfo
            avatar={artist.avatar}
            theme={theme}
            year={artist.years}
            name={artist.name}
            description={artist.description}
            genres={artist.genres}
          />
          <Container className={cx('artistPage__container')}>
            <h1
              className={cx(
                'artistPage__heading',
                `artistPage__heading_${theme}`
              )}
            >
              Artworks
            </h1>
            {isLoading ? (
              <Grid>
                {Array.from({ length: 9 }).map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Skeleton key={index} theme={theme} />
                ))}
              </Grid>
            ) : (
              <Grid className={cx('artistPage__grid')}>
                {artist?.paintings.map((item) => (
                  <Card pathTo='/' {...item} id={item.id} theme={theme} />
                ))}
              </Grid>
            )}
          </Container>
        </>
      )}
      <Footer theme={theme} />
    </div>
  );
};

export default ArtistPage;
