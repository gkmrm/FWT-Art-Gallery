import React, { useRef } from 'react';

import cn from 'classnames/bind';

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
  currentIndex = 0,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = React.useState(currentIndex);
  const sliderLength = paintings.length;

  React.useLayoutEffect(() => {
    const slides = sliderRef.current;
    const slideWidth = slides?.children[0].clientWidth;

    if (slideWidth) {
      slides?.scrollTo(slideWidth * currentIndex, 0);
      setCurrentSlide(currentIndex);
    }
  }, [currentIndex, isOpen]);

  const handleScrollSlide = (offset: 1 | -1) => {
    const slides = sliderRef.current;
    const slideWidth = slides?.children[1].clientWidth;

    if (slideWidth) {
      slides?.scrollTo(slides.scrollLeft + slideWidth * offset, 0);
      setCurrentSlide(Math.round(slides.scrollLeft / slideWidth + offset));
    }
  };

  return (
    <div className={cx('slider', { slider_visible: isOpen })}>
      <div ref={sliderRef} className={cx('slider__slides')}>
        <div className={cx('slider__content')}>
          {isOpen &&
            paintings?.map((painting, index) => (
              <div className={cx('slider__slide')}>
                <Picture
                  original={painting.paint.original}
                  alt={`${painting.title}`}
                  className={cx('slider__slide_img')}
                />
                <div className={cx('slider__pagination')}>{`${
                  index + 1
                }/${sliderLength}`}</div>
                <Button
                  className={cx('action__close')}
                  onClick={() => onClose()}
                >
                  <Close />
                </Button>
                <Button
                  // TODO СТИЛИ
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
                      className={cx(
                        'infoBlock__text',
                        `infoBlock__text_${theme}`
                      )}
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
                    className={cx(
                      'infoBlock__icons',
                      `infoBlock__icons_${theme}`
                    )}
                  >
                    <Button
                      theme={theme}
                      variant='icon'
                      className={cx('')}
                      onClick={() => {}}
                    >
                      <Edit />
                    </Button>
                    <Button
                      theme={theme}
                      variant='icon'
                      className={cx('')}
                      onClick={() => {}}
                    >
                      <Delete />
                    </Button>
                  </div>
                </div>
                <div className={cx('slider__navigation')}>
                  <button
                    type='button'
                    className={cx('slider__prev')}
                    onClick={() => handleScrollSlide(-1)}
                    disabled={currentSlide === 0}
                  >
                    <ArrowIcon />
                  </button>
                  <button
                    type='button'
                    className={cx('slider__next')}
                    onClick={() => handleScrollSlide(1)}
                    disabled={currentSlide === sliderLength - 1}
                  >
                    <ArrowIcon />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
