import React, { useState } from 'react';

import cn from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowIcon } from '@assets/icons/arrowIcon.svg';
import { ReactComponent as Edit } from '@assets/icons/edit_icon.svg';
import { ReactComponent as Delete } from '@assets/icons/trash_icon.svg';
import { ArtistEditPopUp } from '@components/ArtistEditPopUp';
import { TArtistFormValues } from '@components/ArtistForm/ArtistForm';
import { DeletePopUp } from '@components/DeletePopUp';
import { useAuthContext } from '@context/AuthContext';
import { ThemeType } from '@context/ThemeContext';
import { Button } from '@ui-components/Button';

import styles from './ControlBar.module.scss';

const cx = cn.bind(styles);

type TControlBarProps = {
  theme: ThemeType;
  artist: TArtistFormValues;
};

const ControlBar: React.FC<TControlBarProps> = ({ theme, artist }) => {
  const navigate = useNavigate();
  const [isShowDelete, setShowDelete] = useState(false);
  const [isShowEdit, setShowEdit] = useState(false);
  const { isAuth } = useAuthContext();

  const onCloseDeletePopUp = () => {
    setShowDelete(!isShowDelete);
  };
  const onCloseEditPopUp = () => {
    setShowEdit(!isShowEdit);
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

      {isAuth && (
        <>
          <div className={cx('controlbar__controllers')}>
            <Button
              variant='icon'
              onClick={() => setShowEdit(true)}
              theme={theme}
            >
              <Edit />
            </Button>
            <Button
              variant='icon'
              onClick={() => setShowDelete(true)}
              theme={theme}
            >
              <Delete />
            </Button>
          </div>
          <DeletePopUp
            authorId={artist.id}
            paintId=''
            variant='artist'
            isShow={isShowDelete}
            onClose={onCloseDeletePopUp}
            theme={theme}
          />
          <ArtistEditPopUp
            isShow={isShowEdit}
            onClose={onCloseEditPopUp}
            theme={theme}
            artist={artist}
          />
        </>
      )}
    </div>
  );
};

export default ControlBar;
