import React from 'react';

import { Splide, SplideTrack } from '@splidejs/react-splide';
import cn from 'classnames/bind';
import { RemoveScrollBar } from 'react-remove-scroll-bar';

import { ReactComponent as ArrowIcon } from '@assets/icons/right_arrow_icon_large.svg';
import { ThemeType } from '@context/ThemeContext';
import { IPaintModel } from '@models/PaintModel';

import styles from './Slider.module.scss';
import '@splidejs/react-splide/css/core';
import SliderSlide from './SliderSlide';

const cx = cn.bind(styles);

export type TSliderProps = {
  theme: ThemeType;
  paintings: IPaintModel[];
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
};

const Slider: React.FC<TSliderProps> = ({
  theme,
  paintings,
  isOpen,
  onClose,
  currentIndex,
}) => (
  <div className={cx('slider', `slider_${theme}`, { slider__visible: isOpen })}>
    <RemoveScrollBar />
    <Splide
      options={{
        pagination: false,
        fixedWidth: '100vw',
        fixedHeight: '100vh',
        lazyLoad: true,
        omitEnd: true,
        type: 'fade',
        start: currentIndex,
      }}
      hasTrack={false}
    >
      <SplideTrack>
        {paintings?.map((painting, index) => (
          <SliderSlide
            painting={painting}
            length={paintings.length}
            index={index}
            theme={theme}
            onClose={onClose}
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

export default Slider;
