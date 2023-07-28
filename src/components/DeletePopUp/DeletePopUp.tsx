import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as CloseIcon } from '@assets/icons/close_icon.svg';
import { ReactComponent as TrashIcon } from '@assets/icons/trash_icon_large.svg';
import { ThemeType } from '@context/ThemeConext';
import { Button } from '@ui-components/Button';
import { Modal } from '@ui-components/Modal';

import styles from './DeletePopUp.module.scss';

const cx = cn.bind(styles);

type TDeletePopUpProps = {
  isShow: boolean;
  onClose: () => void;
  theme: ThemeType;
};

const DeletePopUp: React.FC<TDeletePopUpProps> = ({
  isShow,
  onClose,
  theme,
}) => (
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
          Do you want to delete this artist profile?
        </div>
        <div className={cx('popup__text_description')}>
          You will not be able to recover this profile afterwards.
        </div>
      </div>
      <div className={cx('popup__buttons')}>
        <Button variant='default' theme={theme}>
          delete
        </Button>
        <Button variant='text' theme={theme} onClick={onClose}>
          cancel
        </Button>
      </div>
    </div>
  </Modal>
);

export default DeletePopUp;
