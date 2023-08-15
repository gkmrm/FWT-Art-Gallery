import React, { forwardRef } from 'react';

import cn from 'classnames/bind';

import { ThemeType } from '@context/ThemeContext';
import { ErrorMessage } from '@ui-components/ErrorMessage';

import styles from './Input.module.scss';

const cx = cn.bind(styles);

export type TInputProps = {
  labelName?: string;
  errorMessage: string;
  theme: ThemeType;
  className?: string;
  inner?: React.ReactNode;
  classNameInner?: string;
  onInnerClick?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<TInputProps> = forwardRef<HTMLInputElement, TInputProps>(
  (
    {
      labelName = '',
      errorMessage,
      theme,
      className = '',
      inner = null,
      classNameInner,
      onInnerClick,
      ...other
    },
    ref
  ) => (
    <label
      htmlFor={labelName}
      className={cx('input__label', `input__label_${theme}`)}
    >
      <p className={cx('input__label_text')}>{labelName}</p>
      <div className={cx('input__wrapper')}>
        <input
          ref={ref}
          placeholder={other.placeholder}
          id={labelName}
          className={cx(className, 'input__field', `input__field_${theme}`, {
            input__field_error: errorMessage,
          })}
          {...other}
        />
        <span
          className={cx(classNameInner)}
          role='presentation'
          onClick={onInnerClick}
        >
          {inner}
        </span>
      </div>
      {errorMessage && (
        <ErrorMessage
          className={cx('input__error')}
          errorMessage={errorMessage}
        />
      )}
    </label>
  )
);

export default Input;
