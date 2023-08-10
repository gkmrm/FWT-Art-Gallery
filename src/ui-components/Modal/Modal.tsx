import React from 'react';

import cn from 'classnames/bind';
import ReactDOM from 'react-dom';
import { RemoveScrollBar } from 'react-remove-scroll-bar';

import { ThemeType } from '@context/ThemeContext';

import styles from './Modal.module.scss';

const cx = cn.bind(styles);

type TModalProps = {
  isShow: boolean;
  onHide: () => void;
  theme: ThemeType;
} & React.HTMLAttributes<HTMLDivElement>;

const Modal: React.FC<TModalProps> = ({ isShow, onHide, theme, ...other }) => {
  React.useEffect(() => {
    if (theme === 'dark' && isShow) {
      document.body.style.backgroundColor = '#121212';
    }

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [isShow]);

  return isShow
    ? ReactDOM.createPortal(
        <>
          <RemoveScrollBar />

          <div
            className={cx('modal', `modal_${theme}`)}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role='dialog'
            onClick={onHide}
          >
            <div
              className={cx(other.className, 'modal__inner')}
              onClick={(e) => e.stopPropagation()}
              {...other}
              role='presentation'
            />
          </div>
        </>,
        document.body
      )
    : null;
};

export default Modal;
