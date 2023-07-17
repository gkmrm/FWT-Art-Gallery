import React from 'react';

import cn from 'classnames/bind';
import { useParams } from 'react-router-dom';

import { ArrowCardIcon } from '@assets/icons';
import { ArtistInfo } from '@components/ArtistInfo';
import { Container } from '@components/Container';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { Card } from '@components/ui-components/Card';
import { Grid } from '@components/ui-components/Grid';
import { Link } from '@components/ui-components/Link';
import { Loader } from '@components/ui-components/Loader';
import { useThemeContext } from '@hooks/ThemeConext';
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
        <Link theme={theme} to='/'>
          <ArrowCardIcon className={cx('link__arrow')} />
          BACK
        </Link>
      </div>
      {isLoading ? <Loader /> : ''}
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
            <Grid className={cx('artistPage__grid')}>
              {artist?.paintings.map((item) => (
                <Card pathTo='/' {...item} id={item.id} theme={theme} />
              ))}
            </Grid>
          </Container>
        </>
      )}
      <Footer theme={theme} />
    </div>
  );
};

export default ArtistPage;
