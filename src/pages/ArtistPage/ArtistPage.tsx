import React, { useState } from 'react';

import cn from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as ArrowCardIcon } from '@assets/icons/arrowIcon.svg';
import { ArtistInfo } from '@components/ArtistInfo';
import { Container } from '@components/Container';
import { SliderSlick } from '@components/SliderSlick';
// import { SliderTest } from '@components/SliderTest';
import { useThemeContext } from '@context/ThemeConext';
import { artistsStaticApi } from '@store/services/ArtistsStaticService';
import { Button } from '@ui-components/Button';
import { Card } from '@ui-components/Card';
import { Grid } from '@ui-components/Grid';
// import { Link } from '@ui-components/Link';
import { Loader } from '@ui-components/Loader';
import { Skeleton } from '@ui-components/Skeleton';

import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

const ArtistPage: React.FC = () => {
  const { theme } = useThemeContext();
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // const handleCloseSlider = useCallback(() => setIsOpen(false), []);
  const handleShowSlider = (index: number) => () => {
    setCurrentIndex(index);
    setIsOpen(true);
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
                {Array.from({ length: 9 }).map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Skeleton key={index} theme={theme} />
                ))}
              </Grid>
            ) : (
              <Grid className={cx('artistPage__grid')}>
                {artist?.paintings.map((item, index) => (
                  <Card
                    image={item.paint}
                    onClick={handleShowSlider(index)}
                    {...item}
                    id={item.id}
                    theme={theme}
                  />
                ))}
              </Grid>
            )}
          </Container>
          {isOpen && (
            // <SliderTest
            //   currentIndex={currentIndex}
            //   paintings={artist.paintings}
            //   theme={theme}
            //   isOpen={isOpen}
            //   onCloseSlider={handleCloseSlider}
            // />
            <SliderSlick
              theme={theme}
              paintings={artist.paintings}
              isOpen={isOpen}
              onCloseClick={() => setIsOpen(false)}
              currentIndex={currentIndex}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ArtistPage;
