import React from 'react';

import cn from 'classnames/bind';
import { Navigation, Pagination, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ReactComponent as ChangePic } from '@assets/icons/change-pic_icon.svg';
import { ReactComponent as Close } from '@assets/icons/close_icon.svg';
import { ReactComponent as Edit } from '@assets/icons/edit_icon.svg';
import { ReactComponent as Delete } from '@assets/icons/trash_icon.svg';
import { ThemeType } from '@context/ThemeConext';
import { IPaintModel } from '@store/models/PaintModel';
import { Button } from '@ui-components/Button';
import { Picture } from '@ui-components/Picture';
// import BASE_URL from '@utils/BASE_URL';

import style from './Slider.module.scss';
import 'swiper/scss';
import './navigation.scss';
import 'swiper/scss/pagination';

const cx = cn.bind(style);

export type TSliderProps = {
  theme: ThemeType;
  paintings: IPaintModel[];
  // mainPainting: IPaintModel;
  isOpen: boolean;
  // setIsOpen: (arg: boolean) => void;
  // setPaintingId: (value: string) => void;
  onClose: () => void;
  currentIndex: number;
};

const Slider2: React.FC<TSliderProps> = ({
  theme,
  paintings,
  isOpen,
  // mainPainting,
  // setPaintingId,
  // setIsOpen,
  onClose,
  currentIndex,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const artworks = 0;
  // const [isLoad, setIsLoad] = useState(true);

  // useEffect(() => {
  //   return () => {
  //     setPaintingId('');
  //   };
  // }, []);

  // const keyPressHandler = React.useCallback(
  //   (event: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (event.code === 'Esc') {
  //       onClose();
  //     }
  //   },
  //   []
  // );
  /* eslint-disable-next-line no-console */

  return (
    <div className={cx('swiper', { swiper_visible: isOpen })}>
      <Swiper
        slidesPerView={1}
        modules={[Pagination, Navigation, Keyboard]}
        pagination={{
          type: 'fraction',
          horizontalClass: cx('swiper__pagination'),
          currentClass: cx('swiper__pagination_current'),
          totalClass: cx('swiper__pagination_total'),
        }}
        navigation
        onSwiper={(swiper) => {
          swiper.slideTo(currentIndex);
        }}
        loop
        keyboard={{
          enabled: true,
        }}
        className={cx('swiper')}
        cssMode
      >
        {isOpen &&
          paintings?.map((painting) => (
            <SwiperSlide key={painting.id} className={cx('swiper-slide')}>
              <Picture
                original={painting.paint.original}
                alt={`${painting.title}`}
                className={cx('swiper-slide_img')}
              />

              <Button className={cx('action__close')} onClick={() => onClose()}>
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
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider2;
