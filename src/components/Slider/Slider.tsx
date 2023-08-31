import React, { useCallback } from 'react';

import { Splide, SplideTrack } from '@splidejs/react-splide';
import cn from 'classnames/bind';
import { RemoveScrollBar } from 'react-remove-scroll-bar';

import { ReactComponent as ArrowIcon } from '@assets/icons/right_arrow_icon_large.svg';
import { ThemeType } from '@context/ThemeContext';
import { IPaintModel } from '@models/PaintModel';
import { artistApi } from '@store/services/ArtistsService';
import checkMainPainting from '@utils/functions/checkMainPainting';

import styles from './Slider.module.scss';
import '@splidejs/react-splide/css/core';
import SliderSlide from './SliderSlide';

const cx = cn.bind(styles);

export type TSliderProps = {
  mainPainting?: string;
  authorId: string;
  theme: ThemeType;
  paintings: IPaintModel[];
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
};

const options = {
  pagination: false,
  fixedWidth: '100vw',
  fixedHeight: '100vh',
  lazyLoad: true,
  omitEnd: true,
  type: 'fade',
};

const Slider: React.FC<TSliderProps> = ({
  mainPainting = '',
  authorId,
  theme,
  paintings,
  isOpen,
  onClose,
  currentIndex,
}) => {
  const [updateMainPaint] = artistApi.useUpdateMainPaintMutation();

  const handleChange = useCallback(
    (paintId: string) => {
      updateMainPaint({ authorId, paintId });
    },
    [authorId, updateMainPaint]
  );

  return (
    <div
      className={cx('slider', `slider_${theme}`, { slider__visible: isOpen })}
    >
      <RemoveScrollBar />
      <Splide
        options={{
          ...options,
          start: currentIndex,
        }}
        hasTrack={false}
      >
        <SplideTrack>
          {paintings?.map((painting, index) => (
            <SliderSlide
              isMainPainting={checkMainPainting(painting.id, mainPainting)}
              key={painting.id}
              authorId={authorId}
              painting={painting}
              length={paintings.length}
              index={index}
              theme={theme}
              onClose={onClose}
              onChangeCover={handleChange}
            />
          ))}
        </SplideTrack>
        <div className='splide__arrows'>
          <div className={cx('slider__navigation')}>
            <button
              type='button'
              className={cx(
                'slider__navigation_prev',
                'splide__arrow splide__arrow--prev'
              )}
            >
              <ArrowIcon />
            </button>
            <button
              type='button'
              className={cx(
                'slider__navigation_next',
                'splide__arrow splide__arrow--next'
              )}
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
      </Splide>
    </div>
  );
};

export default Slider;
