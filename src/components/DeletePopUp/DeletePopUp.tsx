import React, { useCallback, useEffect } from 'react';

import cn from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as CloseIcon } from '@assets/icons/close_icon.svg';
import { ReactComponent as TrashIcon } from '@assets/icons/trash_icon_large.svg';
import { ThemeType } from '@context/ThemeContext';
import { artistApi } from '@store/services/ArtistsService';
import { Button } from '@ui-components/Button';
import { Modal } from '@ui-components/Modal';

import styles from './DeletePopUp.module.scss';

const cx = cn.bind(styles);

type TDeletePopUpProps = {
  paintId: string;
  authorId: string;
  isShow: boolean;
  onClose: () => void;
  theme: ThemeType;
  variant: 'paint' | 'artist';
};

const DeletePopUp: React.FC<TDeletePopUpProps> = ({
  paintId,
  authorId,
  isShow,
  onClose,
  theme,
  variant,
}) => {
  const [deleteArtist, { isSuccess: isSuccessDeleteArtist }] =
    artistApi.useDeleteArtistMutation();
  const [deletePaint, { isSuccess: isSuccessDeletePaint }] =
    artistApi.useDeletePaintMutation();
  const navigate = useNavigate();

  const handleDeleteArtist = useCallback(() => {
    deleteArtist({ authorId });
  }, [authorId, deleteArtist]);

  const handleDeletePaint = useCallback(() => {
    deletePaint({ authorId, paintId });
  }, [authorId, deletePaint, paintId]);

  const handleDelete =
    variant === 'artist' ? handleDeleteArtist : handleDeletePaint;

  useEffect(() => {
    if (isSuccessDeleteArtist) {
      onClose();
      navigate(-1);
    }

    if (isSuccessDeletePaint) {
      onClose();
    }
  }, [isSuccessDeleteArtist, isSuccessDeletePaint, navigate, onClose]);

  return (
    <Modal
      isShow={isShow}
      onHide={onClose}
      theme={theme}
      className={cx('popup__modal')}
    >
      <div className={cx('popup', `popup_${theme}`)}>
        <Button
          onClick={onClose}
          className={cx(
            'popup__icon',
            `popup__icon_${theme}`,
            'popup__icon_close'
          )}
        >
          <CloseIcon />
        </Button>
        <div className={cx('popup__icon', `popup__icon_${theme}`)}>
          <TrashIcon />
        </div>
        <div className={cx('popup__text', `popup__text_${theme}`)}>
          <div className={cx('popup__text_quest')}>
            Do you want to delete this
            {variant === 'artist' ? ' artist profile' : ' paint'}?
          </div>
          <div className={cx('popup__text_description')}>
            You will not be able to recover this
            {variant === 'artist' ? ' artist' : ' paint'} afterwards.
          </div>
        </div>
        <div className={cx('popup__buttons')}>
          <Button
            variant='default'
            theme={theme}
            // eslint-disable-next-line no-console
            onClick={handleDelete}
          >
            delete
          </Button>
          <Button variant='text' theme={theme} onClick={onClose}>
            cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePopUp;
