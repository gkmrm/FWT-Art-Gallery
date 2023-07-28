import React, { forwardRef } from 'react';

import cn from 'classnames/bind';

import { ThemeType } from '@context/ThemeConext';
import { ErrorMessage } from '@ui-components/ErrorMessage';

import styles from './Input.module.scss';

const cx = cn.bind(styles);

export type TInputProps = {
  labelName: string;
  errorMessage: string;
  placeholder?: string;
  theme: ThemeType;
  className?: string;
  inner?: React.ReactNode;
  onInnerClick?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<TInputProps> = forwardRef<HTMLInputElement, TInputProps>(
  (
    {
      labelName,
      errorMessage,
      placeholder = '',
      theme,
      className = '',
      inner = null,
      onInnerClick,
      ...other
    },
    ref
  ) => (
    <label
      htmlFor={labelName}
      className={cx(className, 'input__label', `input__label_${theme}`)}
    >
      <p className={cx('input__label_text')}>{labelName}</p>
      <div className={cx('input__wrapper')}>
        <input
          ref={ref}
          placeholder={placeholder}
          id={labelName}
          className={cx('input__field', `input__field_${theme}`, {
            input__field_error: errorMessage,
          })}
          {...other}
        />
        <span
          className={cx('input__password')}
          role='presentation'
          onClick={onInnerClick}
        >
          {inner}
        </span>
      </div>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </label>
  )
);

export default Input;
