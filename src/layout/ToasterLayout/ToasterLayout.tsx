import React, { useCallback, useEffect } from 'react';

import cn from 'classnames/bind';
import { toast, Toaster } from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@context/redux/redux';
import { useThemeContext } from '@context/ThemeContext';
import { notificationActions } from '@store/slices/NotificationSlice';
import { Toast } from '@ui-components/Toast';

import styles from './Toaster.module.scss';

const cx = cn.bind(styles);

const ToasterLayout = () => {
  const { theme } = useThemeContext();

  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.notificationReducer.message);

  const handleClose = useCallback(
    (toastId: string) => () => {
      dispatch(notificationActions.deleteNotification());
      toast.dismiss(toastId);
    },
    [dispatch]
  );

  useEffect(() => {
    if (message) {
      toast.custom(
        (t) => (
          <Toast
            theme={theme}
            errorMessage={message}
            onClose={handleClose(t.id)}
            duration={t.duration}
          />
        ),
        {
          position: 'bottom-right',
          duration: 2000,
        }
      );
    }
  }, [handleClose, message]);

  return <Toaster containerClassName={cx('toaster')} />;
};

export default ToasterLayout;
