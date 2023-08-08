import React from 'react';

import cn from 'classnames/bind';

import ArtistEditForm, {
  TArtistEditValues,
} from '@components/ArtistEditForm/ArtistEditForm';
import { ThemeType } from '@context/ThemeConext';
import { ModalWrapper } from '@ui-components/ModalWrapper';

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
  <ModalWrapper
    className={cx('popup')}
    isShow={isShow}
    onClose={onClose}
    theme={theme}
  >
    <div className={cx('popup__inner', `popup__inner_${theme}`)}>
      <ArtistEditForm theme={theme} artistValues={artist} />
    </div>
  </ModalWrapper>
);

export default EditArtistPopUp;
