import React, { useState } from 'react';

import cn from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowIcon } from '@assets/icons/arrowIcon.svg';
import { ReactComponent as Edit } from '@assets/icons/edit_icon.svg';
import { ReactComponent as Gear } from '@assets/icons/gear_icon.svg';
import { ReactComponent as Delete } from '@assets/icons/trash_icon.svg';
import { TArtistEditValues } from '@components/ArtistEditForm/ArtistEditForm';
import { DeletePopUp } from '@components/DeletePopUp';
import { EditArtistPopUp } from '@components/EditArtistPopUp';
import { PaintEditPopUp } from '@components/PaintEditPopUp';
import { ThemeType } from '@context/ThemeConext';
import { Button } from '@ui-components/Button';

import styles from './ControlBar.module.scss';

const cx = cn.bind(styles);

type TControlBarProps = {
  theme: ThemeType;
  artist: TArtistEditValues;
};

const ControlBar: React.FC<TControlBarProps> = ({ theme, artist }) => {
  const navigate = useNavigate();
  const [isShowDelete, setShowDelete] = useState(false);
  const [isShowEdit, setShowEdit] = useState(false);
  // временно для проверки модалки
  const [isShowEditPaint, setShowEditPaint] = useState(false);

  const onCloseDeletePopUp = () => {
    setShowDelete(!isShowDelete);
  };
  const onCloseEditPopUp = () => {
    setShowEdit(!isShowEdit);
  };

  const onClosePaintEditPopUp = () => {
    setShowEditPaint(!isShowEditPaint);
  };

  return (
    <div className={cx('controlbar')}>
      <Button
        variant='text'
        theme={theme}
        onClick={() => navigate(-1)}
        className={cx('controlbar__link_content')}
      >
        <ArrowIcon className={cx('controlbar__link_arrow')} />
      </Button>
      <div className={cx('controlbar__controllers')}>
        <Button variant='icon' onClick={() => setShowEdit(true)} theme={theme}>
          <Edit />
        </Button>
        <Button
          variant='icon'
          onClick={() => setShowDelete(true)}
          theme={theme}
        >
          <Delete />
        </Button>
        <Button
          variant='icon'
          onClick={() => setShowEditPaint(true)}
          theme={theme}
        >
          <Gear />
        </Button>
      </div>
      <DeletePopUp
        isShow={isShowDelete}
        onClose={onCloseDeletePopUp}
        theme={theme}
      />
      <EditArtistPopUp
        isShow={isShowEdit}
        onClose={onCloseEditPopUp}
        theme={theme}
        artist={artist}
      />
      <PaintEditPopUp
        isShow={isShowEditPaint}
        onClose={onClosePaintEditPopUp}
        theme={theme}
      />
    </div>
  );
};

export default ControlBar;
