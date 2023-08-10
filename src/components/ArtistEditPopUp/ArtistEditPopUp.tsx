import React from 'react';

import cn from 'classnames/bind';

import { ArtistForm, TArtistFormValues } from '@components/ArtistForm';
import { ThemeType } from '@context/ThemeContext';
import { ModalWrapper } from '@ui-components/ModalWrapper';

import styles from './ArtistEditPopUp.module.scss';

const cx = cn.bind(styles);

type TArtistEditPopUpProps = {
  isShow: boolean;
  onClose: () => void;
  theme: ThemeType;
  artist?: TArtistFormValues;
};

const ArtistEditPopUp: React.FC<TArtistEditPopUpProps> = ({
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
      <ArtistForm theme={theme} artistValues={artist} />
    </div>
  </ModalWrapper>
);

export default ArtistEditPopUp;
