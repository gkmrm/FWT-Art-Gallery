import React from 'react';

import cn from 'classnames/bind';

import { ArtistForm, TArtistFormValues } from '@components/ArtistForm';
import { useThemeContext } from '@context/ThemeContext';
import { ModalWrapper } from '@ui-components/ModalWrapper';

import styles from './ArtistEditPopUp.module.scss';

const cx = cn.bind(styles);

type TArtistEditPopUpProps = {
  isShow: boolean;
  onClose: () => void;
  artist?: TArtistFormValues;
};

const ArtistEditPopUp: React.FC<TArtistEditPopUpProps> = ({
  isShow,
  onClose,
  artist,
}) => {
  const { theme } = useThemeContext();

  return (
    <ModalWrapper
      className={cx('popup')}
      isShow={isShow}
      onClose={onClose}
      theme={theme}
    >
      <div className={cx('popup__inner', `popup__inner_${theme}`)}>
        <ArtistForm theme={theme} artistValues={artist} onClose={onClose} />
      </div>
    </ModalWrapper>
  );
};

export default ArtistEditPopUp;
