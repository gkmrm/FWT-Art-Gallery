import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as CloseIcon } from '@assets/icons/close_icon.svg';
import { ThemeType } from '@context/ThemeConext';
import { Button } from '@ui-components/Button';
import { Modal } from '@ui-components/Modal';

import styles from './ModalWrapper.module.scss';

const cx = cn.bind(styles);

type TModalWrapperProps = {
  className: string;
  classNameIcon?: string;
  isShow: boolean;
  onClose: () => void;
  theme: ThemeType;
} & React.HTMLAttributes<HTMLDivElement>;

const ModalWrapper: React.FC<TModalWrapperProps> = ({
  className,
  classNameIcon = '',
  isShow,
  onClose,
  theme,
  children = null,
  ...other
}) => (
  <Modal
    isShow={isShow}
    onHide={onClose}
    theme={theme}
    className={cx(className, 'modal', `modal_${theme}`)}
    {...other}
  >
    <Button
      onClick={onClose}
      className={cx(classNameIcon, 'modal__icon', `modal__icon_${theme}`)}
    >
      <CloseIcon />
    </Button>
    {children}
  </Modal>
);

export default ModalWrapper;
