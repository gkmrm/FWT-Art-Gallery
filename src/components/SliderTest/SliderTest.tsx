import React, { FC, useLayoutEffect, useRef, useState } from 'react';

import cn from 'classnames/bind';

import { ReactComponent as PicIcon } from '@assets/icons/change-pic_icon.svg';
import { ReactComponent as CloseIcon } from '@assets/icons/close_icon.svg';
import { ReactComponent as PaintingEditButton } from '@assets/icons/edit_icon.svg';
import { ReactComponent as ArrowIcon } from '@assets/icons/right_arrow_icon_large.svg';
import { ReactComponent as PaintingDeleteButton } from '@assets/icons/trash_icon.svg';
import { IPaintModel } from '@store/models/PaintModel';
import { Button } from '@ui-components/Button';
import { Picture } from '@ui-components/Picture';

import style from './SliderTest.module.scss';

const cx = cn.bind(style);

interface SliderProps {
  paintings: IPaintModel[];
  currentIndex?: number;
  theme: string;
  isOpen: boolean;
  onCloseSlider: () => void;
}

export const SliderTest: FC<SliderProps> = ({
  paintings,
  currentIndex = 0,
  theme,
  isOpen,
  onCloseSlider,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(currentIndex);
  const sliderLength = paintings.length;

  useLayoutEffect(() => {
    const slides = sliderRef.current;
    const slideWidth = slides?.children[0].clientWidth;

    if (slideWidth) {
      slides?.scrollTo(slideWidth * currentIndex, 0);
      setCurrentSlide(currentIndex);
    }
  }, [isOpen]);

  const handleScrollSlide = (offset: 1 | -1) => {
    const slides = sliderRef.current;
    const slideWidth = slides?.children[0].clientWidth;

    if (slideWidth) {
      slides?.scrollTo(slides.scrollLeft + slideWidth * offset, 0);
      setCurrentSlide(Math.round(slides.scrollLeft / slideWidth + offset));
    }
  };

  return (
    <div className={cx('slider', `slider_${theme}`)}>
      <div className={cx('slider__content')}>
        <div ref={sliderRef} className={cx('slider__slides')}>
          {paintings &&
            paintings.map((item, index) => (
              <div className={cx('slider__slide')} key={item.id}>
                <Picture
                  className={cx('slider__img')}
                  src={item.paint.original}
                  alt={item.title}
                />

                <div className={cx('slider__container')}>
                  <Button
                    theme='dark'
                    variant='text'
                    className={cx('slider__cover-btn')}
                    onClick={() => {}}
                  >
                    <PicIcon />
                    <span>Make the cover</span>
                  </Button>

                  <div className={cx('slider__img-info')}>
                    <div className={cx('slider__img-subtitle')}>
                      {item.subtitle}
                    </div>
                    <div className={cx('slider__img-title')}>{item.title}</div>

                    <div className={cx('slider__img-control')}>
                      <PaintingEditButton />
                      <PaintingDeleteButton />
                    </div>
                  </div>

                  <div className={cx('slider__counter')}>{`${
                    index + 1
                  }/${sliderLength}`}</div>
                </div>
              </div>
            ))}
        </div>

        <div className={cx('slider__control')}>
          <button
            type='button'
            className={cx('slider__prev-btn')}
            onClick={() => handleScrollSlide(-1)}
            disabled={currentSlide === 0}
          >
            <ArrowIcon />
          </button>
          <button
            type='button'
            className={cx('slider__next-btn')}
            onClick={() => handleScrollSlide(1)}
            disabled={currentSlide === sliderLength - 1}
          >
            <ArrowIcon />
          </button>
        </div>
      </div>

      <div className={cx('slider__close-btn-wrapper')}>
        <button
          type='button'
          className={cx('slider__close-btn')}
          onClick={onCloseSlider}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default SliderTest;
