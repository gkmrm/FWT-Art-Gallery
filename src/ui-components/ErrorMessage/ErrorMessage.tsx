import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as ErrorIcon } from '@assets/icons/error_icon.svg';

import styles from './ErrorMessage.module.scss';

const cx = cn.bind(styles);

type TErrorMessageProps = {
  errorMessage: string;
  className?: string;
} & React.HTMLAttributes<HTMLParagraphElement>;

const ErrorMessage: React.FC<TErrorMessageProps> = ({
  errorMessage,
  className = '',
  ...other
}) => (
  <p className={cx('error', className)} {...other}>
    <ErrorIcon className={cx('error__icon')} />
    {errorMessage}
  </p>
);

export default ErrorMessage;
