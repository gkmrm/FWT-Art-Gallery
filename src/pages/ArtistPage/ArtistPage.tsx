import React, { useState } from 'react';

import cn from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import { uid } from 'uid';

import { ReactComponent as ArrowCardIcon } from '@assets/icons/arrowIcon.svg';
import { ArtistInfo } from '@components/ArtistInfo';
import { Container } from '@components/Container';
import { Slider } from '@components/Slider';
import { useThemeContext } from '@context/ThemeConext';
import { artistsStaticApi } from '@store/services/ArtistsStaticService';
import { Button } from '@ui-components/Button';
import { Card } from '@ui-components/Card';
import { Grid } from '@ui-components/Grid';
import { Loader } from '@ui-components/Loader';
import { Skeleton } from '@ui-components/Skeleton';

import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

const ArtistPage: React.FC = () => {
  const { theme } = useThemeContext();
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const [isOpenSlider, setIsOpenSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onClickCard = (index: number) => () => {
    setCurrentIndex(index);
    setIsOpenSlider(true);
  };

  const { data: artist, isLoading } =
    artistsStaticApi.useFetchArtistStaticByIdQuery(id);

  return (
    <div className={cx('artistPage', `artistPage_${theme}`)}>
      <div className={cx('link')}>
        <Button
          variant='text'
          theme={theme}
          onClick={() => navigate(-1)}
          className={cx('link__content')}
        >
          <ArrowCardIcon className={cx('link__arrow')} />
        </Button>
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
                {Array.from({ length: 6 }).map(() => (
                  <Skeleton key={uid()} theme={theme} />
                ))}
              </Grid>
            ) : (
              <Grid className={cx('artistPage__grid')}>
                {artist?.paintings.map((item, index) => (
                  <Card
                    key={item.id}
                    image={item.paint}
                    onClick={onClickCard(index)}
                    {...item}
                    id={item.id}
                    theme={theme}
                  />
                ))}
              </Grid>
            )}
          </Container>
          {isOpenSlider && (
            <Slider
              theme={theme}
              paintings={artist.paintings}
              isOpen={isOpenSlider}
              onClose={() => setIsOpenSlider(false)}
              currentIndex={currentIndex}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ArtistPage;
