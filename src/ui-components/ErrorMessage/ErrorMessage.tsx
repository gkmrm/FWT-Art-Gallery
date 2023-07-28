import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as ErrorIcon } from '@assets/icons/error_icon.svg';

import styles from './ErrorMessage.module.scss';

const cx = cn.bind(styles);

type TErrorMessageProps = {
  errorMessage: string;
} & React.HTMLAttributes<HTMLParagraphElement>;

const ErrorMessage: React.FC<TErrorMessageProps> = ({
  errorMessage,
  ...other
}) => (
  <p className={cx('error')} {...other}>
    <ErrorIcon />
    {errorMessage}
  </p>
);

export default ErrorMessage;
