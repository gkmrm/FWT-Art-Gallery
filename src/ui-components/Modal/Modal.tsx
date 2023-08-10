import React, { useRef } from 'react';

import cn from 'classnames/bind';
import ReactDOM from 'react-dom';
import { RemoveScrollBar } from 'react-remove-scroll-bar';

import { ThemeType } from '@context/ThemeContext';
import { Transition } from '@ui-components/Transition';

import styles from './Modal.module.scss';

const cx = cn.bind(styles);

type TModalProps = {
  isShow: boolean;
  onHide: () => void;
  theme: ThemeType;
  isTransition?: boolean;
  variant?: 'modal' | 'sidebar';
  className: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Modal: React.FC<TModalProps> = ({
  isShow,
  onHide,
  theme,
  isTransition = true,
  variant = 'modal',
  className,
  ...other
}) => {
  React.useEffect(() => {
    if (theme === 'dark' && isShow) {
      document.body.style.backgroundColor = '#121212';
    }

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [isShow]);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalInnerRef = useRef<HTMLDivElement | null>(null);

  const handleEnter = () => {
    const modal = modalRef.current;
    const modalInner = modal?.firstElementChild as HTMLDivElement;

    if (!modal || !modalInner) return;

    if (variant === 'modal') {
      modal.style.opacity = '1';
    } else {
      modal.style.opacity = '1';
      modalInner.style.transform = 'translateX(0)';
    }
  };

  return isShow
    ? ReactDOM.createPortal(
        <Transition mount={isShow} duration={3000} onEnter={handleEnter}>
          <RemoveScrollBar />

          <div
            className={cx('modal', `modal_${theme}`, {
              modal_transition: isTransition,
            })}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role='dialog'
            onClick={onHide}
            ref={modalRef}
          >
            <div
              className={cx(className, 'modal__inner', {
                modal__inner_transition: isTransition && variant === 'sidebar',
              })}
              onClick={(e) => e.stopPropagation()}
              role='presentation'
              ref={modalInnerRef}
              {...other}
            />
          </div>
        </Transition>,
        document.body
      )
    : null;
};

export default Modal;
