import React, { useEffect } from 'react';

import cn from 'classnames/bind';

import { ReactComponent as CloseIcon } from '@assets/icons/close_icon.svg';
import { ReactComponent as ErrorIcon } from '@assets/icons/error_icon.svg';
import { ThemeType } from '@context/ThemeContext';
import { Button } from '@ui-components/Button';

import styles from './Toast.module.scss';

const cx = cn.bind(styles);

type TToastProps = {
  errorMessage: string;
  theme: ThemeType;
  onClose: () => void;
  duration?: number;
};

const Toast: React.FC<TToastProps> = ({
  errorMessage,
  theme,
  onClose,
  duration,
}) => {
  useEffect(() => {
    setTimeout(() => onClose(), duration);
  }, [duration, onClose]);

  return (
    <div className={cx('toast', `toast_${theme}`)}>
      <div className={cx('toast__wrapper')}>
        <div className={cx('toast__iconWrapper')}>
          <ErrorIcon className={cx('toast__iconWrapper_icon')} />
        </div>
        <div className={cx('toast__message', `toast__message_${theme}`)}>
          <p className={cx('toast__message_title')}>Error!</p>
          <p className={cx('toast__message_text')}>{errorMessage}</p>
        </div>
        <Button
          theme={theme}
          variant='text'
          onClick={onClose}
          className={cx('toast__button', `toast__button_${theme}`)}
        >
          <CloseIcon className={cx('toast__button_icon')} />
        </Button>
      </div>
    </div>
  );
};

export default Toast;
