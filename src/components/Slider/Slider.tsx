import React from 'react';

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import cn from 'classnames/bind';
import { RemoveScrollBar } from 'react-remove-scroll-bar';

import { ReactComponent as ChangePic } from '@assets/icons/change-pic_icon.svg';
import { ReactComponent as Close } from '@assets/icons/close_icon.svg';
import { ReactComponent as Edit } from '@assets/icons/edit_icon.svg';
import { ReactComponent as ArrowIcon } from '@assets/icons/right_arrow_icon_large.svg';
import { ReactComponent as Delete } from '@assets/icons/trash_icon.svg';
import { ThemeType } from '@context/ThemeConext';
import { IPaintModel } from '@store/models/PaintModel';
import { Button } from '@ui-components/Button';
import { Picture } from '@ui-components/Picture';

import styles from './Slider.module.scss';
import '@splidejs/react-splide/css/core';

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
  <div className={cx('slider', { slider__visible: isOpen })}>
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
          <SplideSlide className={cx('slider__slide')} key={painting.id}>
            <Picture
              original={painting.paint.original}
              alt={`${painting.title}`}
              className={cx('slider__slide_img')}
            />
            <div className={cx('slider__pagination')}>{`${index + 1}/${
              paintings.length
            }`}</div>
            <Button className={cx('action__close')} onClick={onClose}>
              <Close />
            </Button>
            <Button
              className={cx('action__cover')}
              variant='text'
              theme={theme}
              onClick={() => {}}
            >
              <ChangePic />
              make the cover
            </Button>
            <div className={cx('infoBlock', `infoBlock_${theme}`)}>
              <div className={cx('infoBlock__container')}>
                <div
                  className={cx('infoBlock__text', `infoBlock__text_${theme}`)}
                >
                  <div
                    className={cx(
                      'infoBlock__text_subtitle',
                      `infoBlock__text_subtitle_${theme}`
                    )}
                  >
                    {painting.subtitle}
                  </div>
                  <div
                    className={cx(
                      'infoBlock__text_title',
                      `infoBlock__text_title_${theme}`
                    )}
                  >
                    {painting.title}
                  </div>
                </div>
              </div>
              <div
                className={cx('infoBlock__icons', `infoBlock__icons_${theme}`)}
              >
                <Button
                  theme={theme}
                  variant='icon'
                  className={cx('infoBlock__button')}
                  onClick={() => {}}
                >
                  <Edit />
                </Button>
                <Button
                  theme={theme}
                  variant='icon'
                  className={cx('infoBlock__button')}
                  onClick={() => {}}
                >
                  <Delete />
                </Button>
              </div>
            </div>
          </SplideSlide>
        ))}
      </SplideTrack>
      <div className='splide__arrows'>
        <div className={cx('slider__navigation')}>
          <button
            type='button'
            className={cx('slider__prev', 'splide__arrow splide__arrow--prev')}
          >
            <ArrowIcon />
          </button>
          <button
            type='button'
            className={cx('slider__next', 'splide__arrow splide__arrow--next')}
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </Splide>
  </div>
);

export default Slider;
