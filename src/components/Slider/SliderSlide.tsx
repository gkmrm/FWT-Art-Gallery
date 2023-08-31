import React, { useState } from 'react';

import { SplideSlide } from '@splidejs/react-splide';
import cn from 'classnames/bind';

import { ReactComponent as ChangePic } from '@assets/icons/change-pic_icon.svg';
import { ReactComponent as Close } from '@assets/icons/close_icon.svg';
import { ReactComponent as Edit } from '@assets/icons/edit_icon.svg';
import { ReactComponent as Delete } from '@assets/icons/trash_icon.svg';
import { DeletePopUp } from '@components/DeletePopUp';
import { PaintEditPopUp } from '@components/PaintEditPopUp';
import { useAuthContext } from '@context/AuthContext';
import { ThemeType } from '@context/ThemeContext';
import { IPaintModel } from '@models/PaintModel';
import { Button } from '@ui-components/Button';
import { Picture } from '@ui-components/Picture';

import styles from './SliderSlide.module.scss';

const cx = cn.bind(styles);

type TSliderSlideProps = {
  isMainPainting: boolean;
  authorId: string;
  painting: IPaintModel;
  length: number;
  index: number;
  theme: ThemeType;
  onClose: () => void;
  onChangeCover: (id: string) => void;
};

const SliderSlide: React.FC<TSliderSlideProps> = ({
  isMainPainting,
  onChangeCover,
  authorId,
  painting,
  length,
  index,
  theme,
  onClose,
}) => {
  const { id, subtitle, title, paint } = painting;
  const [isShowDelete, setShowDelete] = useState(false);
  const [isShowEdit, setShowEdit] = useState(false);
  const { isAuth } = useAuthContext();

  return (
    <SplideSlide key={id}>
      <Picture original={paint.original} alt={`${title}`} />
      <div className={cx('slider__pagination')}>{`${index + 1}/${length}`}</div>
      <Button className={cx('slider__close')} onClick={onClose}>
        <Close />
      </Button>
      {isAuth && (
        <Button
          className={cx('slider__cover')}
          variant='text'
          theme={theme}
          onClick={() => onChangeCover(painting.id)}
        >
          <ChangePic />
          {isMainPainting ? 'Remove the cover' : 'Make the cover'}
        </Button>
      )}
      <div className={cx('infoBlock', `infoBlock_${theme}`)}>
        <div className={cx('infoBlock__container')}>
          <div className={cx('infoBlock__text', `infoBlock__text_${theme}`)}>
            <div
              className={cx(
                'infoBlock__text_subtitle',
                `infoBlock__text_subtitle_${theme}`
              )}
            >
              {subtitle}
            </div>
            <div
              className={cx(
                'infoBlock__text_title',
                `infoBlock__text_title_${theme}`
              )}
            >
              {title}
            </div>
          </div>
        </div>
        <div className={cx('infoBlock__icons', `infoBlock__icons_${theme}`)}>
          {isAuth && (
            <>
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
            </>
          )}
        </div>
      </div>
      <PaintEditPopUp
        authorId={authorId}
        paintId={painting.id}
        isShow={isShowEdit}
        onClose={() => setShowEdit(false)}
        paint={{
          name: title,
          years: subtitle,
          paint,
        }}
      />
      <DeletePopUp
        authorId={authorId}
        paintId={painting.id}
        variant='paint'
        isShow={isShowDelete}
        onClose={() => setShowDelete(false)}
      />
    </SplideSlide>
  );
};

export default SliderSlide;
