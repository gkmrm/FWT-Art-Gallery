import React, { forwardRef } from 'react';

import cn from 'classnames/bind';

import { ThemeType } from '@context/ThemeConext';
import { ErrorMessage } from '@ui-components/ErrorMessage';

import styles from './TextArea.module.scss';

const cx = cn.bind(styles);

type TTextAreaProps = {
  labelName: string;
  errorMessage: string;
  placeholder?: string;
  theme: ThemeType;
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea: React.FC<TTextAreaProps> = forwardRef<
  HTMLTextAreaElement,
  TTextAreaProps
>(
  (
    { labelName, errorMessage, placeholder, theme, className, ...others },
    ref
  ) => (
    <label
      htmlFor={labelName}
      className={cx(className, 'textarea__label', `textarea__label_${theme}`)}
    >
      <p className={cx('textarea__label_text')}>{labelName}</p>
      <textarea
        ref={ref}
        id={labelName}
        className={cx('textarea__field', `textarea__field_${theme}`, {
          textarea__field_error: errorMessage,
        })}
        {...others}
      />

      {errorMessage && (
        <ErrorMessage
          className={cx('textarea__error')}
          errorMessage={errorMessage}
        />
      )}
    </label>
  )
);

export default TextArea;
