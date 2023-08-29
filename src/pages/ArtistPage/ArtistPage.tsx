import React, { useCallback, useMemo, useState } from 'react';

import cn from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { uid } from 'uid';

import { ReactComponent as PlusIcon } from '@assets/icons/plus_icon_large.svg';
import { ArtistInfo } from '@components/ArtistInfo';
import { Container } from '@components/Container';
import { ControlBar } from '@components/ControlBar';
import { DragGrid } from '@components/DragGrid';
import { Pagination } from '@components/Pagination';
import { PaintEditPopUp } from '@components/PaintEditPopUp';
import { Slider } from '@components/Slider';
import BREAKPOINTS from '@CONSTANTS/BREAKPOINTS';
import { useAuthContext } from '@context/AuthContext';
import { useThemeContext } from '@context/ThemeContext';
import useWindowWidth from '@hooks/useWindowWidth';
import { artistApi } from '@store/services/ArtistsService';
import { Button } from '@ui-components/Button';
import { Grid } from '@ui-components/Grid';
import { Loader } from '@ui-components/Loader';
import { MissPaintCard } from '@ui-components/MissPaintCard';
import { MissPaintMessage } from '@ui-components/MissPaintMessage';
import { Skeleton } from '@ui-components/Skeleton';
import getIsEqualZero from '@utils/functions/getIsEqualZero';

import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

const PAGINATIONSIZE = {
  MOBILE: 4,
  TABLET: 8,
  DESKTOP: 9,
};

const ArtistPage: React.FC = () => {
  const { theme } = useThemeContext();
  const { id = '' } = useParams();
  const { isAuth } = useAuthContext();

  const { data: artist, isLoading } = artistApi.useFetchArtistStaticByIdQuery({
    isAuth,
    id,
  });

  const [isOpenSlider, setOpenSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShowEditPaint, setShowEditPaint] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const width = useWindowWidth();

  const getSlicedSize = useCallback(
    () =>
      // eslint-disable-next-line no-nested-ternary
      width < BREAKPOINTS.MIN.TABLET
        ? PAGINATIONSIZE.MOBILE
        : width < BREAKPOINTS.MIN.DESKTOP
        ? PAGINATIONSIZE.TABLET
        : PAGINATIONSIZE.DESKTOP,
    [width]
  );

  const slicedSize = getSlicedSize();

  const slicedPaintings = useMemo(
    () =>
      // eslint-disable-next-line no-nested-ternary
      artist
        ? isAuth
          ? artist?.paintings.slice(
              (currentPage - 1) * slicedSize,
              (currentPage - 1) * slicedSize + slicedSize
            )
          : artist?.paintings
        : [],
    [artist, currentPage, isAuth, slicedSize]
  );

  const onClickCard = useCallback((index: number) => {
    setCurrentIndex(index);
    setOpenSlider(true);
  }, []);

  const onClosePaintEditPopUp = () => {
    setShowEditPaint(!isShowEditPaint);
  };

  const isPaintZero = getIsEqualZero(artist?.paintings?.length);

  return (
    <div className={cx('artistPage', `artistPage_${theme}`)}>
      {isLoading ? (
        <div className={cx('artistPage__loader')}>
          <Loader theme={theme} />
        </div>
      ) : (
        ''
      )}
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
              {isAuth && (
                <Button
                  theme={theme}
                  variant='text'
                  onClick={() => setShowEditPaint(true)}
                  className={cx('artistPage__addBlock_button')}
                >
                  <PlusIcon />
                  add picture
                </Button>
              )}
            </div>
            {/* eslint-disable-next-line no-nested-ternary */}
            {isLoading ? (
              <Grid>
                {Array.from({ length: 6 }).map(() => (
                  <Skeleton key={uid()} theme={theme} />
                ))}
              </Grid>
            ) : isPaintZero ? (
              <Grid className={cx('artistPage__grid')}>
                <MissPaintCard
                  theme={theme}
                  onClick={() => setShowEditPaint(true)}
                />
              </Grid>
            ) : (
              <DragGrid
                mainPainting={artist.mainPaint?.id}
                onClickCard={onClickCard}
                array={slicedPaintings}
                authorId={artist.id}
                theme={theme}
              />
            )}
            {artist.paintings.length > slicedSize && (
              <Pagination
                theme={theme}
                pagesAmount={Math.ceil(artist.paintings.length / slicedSize)}
                currentPage={currentPage}
                onChange={setCurrentPage}
              />
            )}

            {isPaintZero && <MissPaintMessage theme={theme} />}
          </Container>
          <PaintEditPopUp
            isShow={isShowEditPaint}
            onClose={onClosePaintEditPopUp}
            theme={theme}
            authorId={artist.id}
            paintId=''
          />
          {isOpenSlider && (
            <Slider
              mainPainting={artist.mainPaint?.id}
              authorId={artist.id}
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
