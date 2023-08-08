import React from 'react';

import cn from 'classnames/bind';

import { PaintAddForm } from '@components/PaintAddForm';
import { ThemeType } from '@context/ThemeConext';
import { ModalWrapper } from '@ui-components/ModalWrapper';

import styles from './PaintEditPopUp.modules.scss';

const cx = cn.bind(styles);

type TPaintEditPopUpProps = {
  isShow: boolean;
  onClose: () => void;
  theme: ThemeType;
};

const PaintEditPopUp: React.FC<TPaintEditPopUpProps> = ({
  theme,
  onClose,
  isShow,
}) => (
  <ModalWrapper
    className={cx('popup')}
    isShow={isShow}
    onClose={onClose}
    theme={theme}
  >
    <div className={cx('popup__inner', `popup__inner_${theme}`)}>
      <PaintAddForm theme={theme} />
    </div>
  </ModalWrapper>
);

export default PaintEditPopUp;
