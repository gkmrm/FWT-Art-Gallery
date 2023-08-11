import React, { useState } from 'react';

import { SplideSlide } from '@splidejs/react-splide';
import cn from 'classnames/bind';

import { ReactComponent as ChangePic } from '@assets/icons/change-pic_icon.svg';
import { ReactComponent as Close } from '@assets/icons/close_icon.svg';
import { ReactComponent as Edit } from '@assets/icons/edit_icon.svg';
import { ReactComponent as Delete } from '@assets/icons/trash_icon.svg';
import { DeletePopUp } from '@components/DeletePopUp';
import { PaintEditPopUp } from '@components/PaintEditPopUp';
import { ThemeType } from '@context/ThemeContext';
import { IPaintModel } from '@store/models/PaintModel';
import { Button } from '@ui-components/Button';
import { Picture } from '@ui-components/Picture';

import styles from './SliderSlide.module.scss';

const cx = cn.bind(styles);

type TSliderSlideProps = {
  painting: IPaintModel;
  length: number;
  index: number;
  theme: ThemeType;
  onClose: () => void;
};

const SliderSlide: React.FC<TSliderSlideProps> = ({
  painting,
  length,
  index,
  theme,
  onClose,
}) => {
  const [isShowDelete, setShowDelete] = useState(false);
  const [isShowEdit, setShowEdit] = useState(false);

  const onCloseDeletePopUp = () => {
    setShowDelete(!isShowDelete);
  };
  const onCloseEditPopUp = () => {
    setShowEdit(!isShowEdit);
  };

  return (
    <SplideSlide key={painting.id}>
      <Picture original={painting.paint.original} alt={`${painting.title}`} />
      <div className={cx('slider__pagination')}>{`${index + 1}/${length}`}</div>
      <Button className={cx('slider__close')} onClick={onClose}>
        <Close />
      </Button>
      <Button
        className={cx('slider__cover')}
        variant='text'
        theme={theme}
        onClick={() => {}}
      >
        <ChangePic />
        make the cover
      </Button>
      <div className={cx('infoBlock', `infoBlock_${theme}`)}>
        <div className={cx('infoBlock__container')}>
          <div className={cx('infoBlock__text', `infoBlock__text_${theme}`)}>
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
        <div className={cx('infoBlock__icons', `infoBlock__icons_${theme}`)}>
          <Button
            theme={theme}
            variant='icon'
            className={cx('infoBlock__button')}
            onClick={() => setShowEdit(true)}
          >
            <Edit />
          </Button>
          <Button
            theme={theme}
            variant='icon'
            className={cx('infoBlock__button')}
            onClick={() => setShowDelete(true)}
          >
            <Delete />
          </Button>
        </div>
      </div>
      <PaintEditPopUp
        isShow={isShowEdit}
        onClose={onCloseEditPopUp}
        theme={theme}
        paint={{
          name: painting.title,
          years: painting.subtitle,
          paint: painting.paint,
        }}
      />
      <DeletePopUp
        variant='paint'
        isShow={isShowDelete}
        onClose={onCloseDeletePopUp}
        theme={theme}
      />
    </SplideSlide>
  );
};

export default SliderSlide;
