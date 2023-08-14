import React, { useState } from 'react';

import cn from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { uid } from 'uid';

import { ReactComponent as PlusIcon } from '@assets/icons/plus_icon_large.svg';
import { ArtistInfo } from '@components/ArtistInfo';
import { Container } from '@components/Container';
import { ControlBar } from '@components/ControlBar';
import { DragGrid } from '@components/DragGrid';
import { PaintEditPopUp } from '@components/PaintEditPopUp';
import { Slider } from '@components/Slider';
import { useThemeContext } from '@context/ThemeContext';
import { artistsStaticApi } from '@store/services/ArtistsStaticService';
import { Button } from '@ui-components/Button';
import { Grid } from '@ui-components/Grid';
import { Loader } from '@ui-components/Loader';
import { MissPaintCard } from '@ui-components/MissPaintCard';
import { MissPaintMessage } from '@ui-components/MissPaintMessage';
import { Skeleton } from '@ui-components/Skeleton';
import getIsEqualZero from '@utils/functions/getIsEqualZero';

import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

const ArtistPage: React.FC = () => {
  const { theme } = useThemeContext();
  const { id = '' } = useParams();

  const { data: artist, isLoading } =
    artistsStaticApi.useFetchArtistStaticByIdQuery(id);

  const [isOpenSlider, setOpenSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShowEditPaint, setShowEditPaint] = useState(false);

  const onClickCard = (index: number) => () => {
    setCurrentIndex(index);
    setOpenSlider(true);
  };

  const onClosePaintEditPopUp = () => {
    setShowEditPaint(!isShowEditPaint);
  };

  const isPaintZero = getIsEqualZero(artist?.paintings?.length);

  return (
    <div className={cx('artistPage', `artistPage_${theme}`)}>
      {isLoading ? <Loader theme={theme} /> : ''}
      {artist && (
        <>
          <ControlBar theme={theme} artist={artist} />
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
            <div className={cx('artistPage__addBlock')}>
              <Button
                theme={theme}
                variant='text'
                onClick={() => setShowEditPaint(true)}
                className={cx('artistPage__addBlock_button')}
              >
                <PlusIcon />
                add picture
              </Button>
            </div>
            {/* eslint-disable-next-line no-nested-ternary */}
            {isLoading ? (
              <Grid>
                {Array.from({ length: 6 }).map(() => (
                  <Skeleton key={uid()} theme={theme} />
                ))}
              </Grid>
            ) : isPaintZero ? (
              <Grid>
                <MissPaintCard
                  theme={theme}
                  onClick={() => setShowEditPaint(true)}
                />
              </Grid>
            ) : (
              <DragGrid
                array={artist?.paintings}
                theme={theme}
                variant='paint'
                onClickCard={onClickCard}
              />
            )}

            {isPaintZero && <MissPaintMessage theme={theme} />}
          </Container>
          <PaintEditPopUp
            isShow={isShowEditPaint}
            onClose={onClosePaintEditPopUp}
            theme={theme}
          />
          {isOpenSlider && (
            <Slider
              theme={theme}
              paintings={artist.paintings}
              isOpen={isOpenSlider}
              onClose={() => setOpenSlider(false)}
              currentIndex={currentIndex}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ArtistPage;
