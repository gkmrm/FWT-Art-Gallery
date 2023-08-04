import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as CloseIcon } from '@assets/icons/close_icon.svg';
import { PaintAddForm } from '@components/PaintAddForm';
import { ThemeType } from '@context/ThemeConext';
import { Button } from '@ui-components/Button';
import { Modal } from '@ui-components/Modal';

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
      <PaintAddForm theme={theme} />
    </div>
  </Modal>
);

export default PaintEditPopUp;
