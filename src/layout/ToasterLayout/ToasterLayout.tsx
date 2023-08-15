import React, { useCallback, useEffect } from 'react';

import cn from 'classnames/bind';
import { toast, Toaster } from 'react-hot-toast';

import { useThemeContext } from '@context/ThemeContext';
import { Toast } from '@ui-components/Toast';

import styles from './Toaster.module.scss';

const cx = cn.bind(styles);

const ToasterLayout = () => {
  const { theme } = useThemeContext();

  const handleClose = useCallback(
    (toastId: string) => () => {
      // eslint-disable-next-line no-console
      console.log(toastId);
    },
    []
  );

  const message = 'Something happend';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleClose, message]);

  return <Toaster containerClassName={cx('toaster')} />;
};

export default ToasterLayout;
