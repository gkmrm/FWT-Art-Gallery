import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as CloseIcon } from '@assets/icons/close_icon.svg';
import ArtistEditForm, {
  TArtistEditValues,
} from '@components/ArtistEditForm/ArtistEditForm';
import { ThemeType } from '@context/ThemeConext';
import { Button } from '@ui-components/Button';
import { Modal } from '@ui-components/Modal';

import styles from './EditArtistPopUp.module.scss';

const cx = cn.bind(styles);

type TEditArtistPopUpProps = {
  isShow: boolean;
  onClose: () => void;
  theme: ThemeType;
  artist: TArtistEditValues;
};

const EditArtistPopUp: React.FC<TEditArtistPopUpProps> = ({
  isShow,
  onClose,
  theme,
  artist,
}) => (
  <Modal
    isShow={isShow}
    onHide={onClose}
    theme={theme}
    className={cx('popup', `popup_${theme}`)}
  >
    <Button
      onClick={onClose}
      className={cx('popup__icon', `popup__icon_${theme}`)}
    >
      <CloseIcon />
    </Button>
    <div className={cx('popup__inner', `popup__inner_${theme}`)}>
      <ArtistEditForm theme={theme} artistValues={artist} />
    </div>
  </Modal>
);

export default EditArtistPopUp;
