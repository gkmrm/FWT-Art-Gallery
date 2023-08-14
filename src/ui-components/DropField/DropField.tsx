import React, { ChangeEvent, forwardRef } from 'react';

import cn from 'classnames/bind';

import { ReactComponent as AvatarPlaceholder } from '@assets/icons/artistAvatar.svg';
import { ReactComponent as PaintPlaceholder } from '@assets/icons/paintDrop_icon_small.svg';
import { ThemeType } from '@context/ThemeContext';

import styles from './DropField.module.scss';

const cx = cn.bind(styles);

type TDropFieldProps = {
  variant: 'avatar' | 'paint';
  theme: ThemeType;
  isDraggable: boolean;
  idFor: string;
  handleChangeImage: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  labelName: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const DropField: React.FC<TDropFieldProps> = forwardRef<
  HTMLInputElement,
  TDropFieldProps
>(
  (
    {
      isDraggable,
      variant,
      theme,
      idFor,
      handleChangeImage,
      labelName,
      ...other
    },
    ref
  ) => {
    const caption =
      variant === 'avatar' ? (
        <>
          <p
            className={cx('field__text', `field__text_${theme}`, {
              field__text_drag: isDraggable,
            })}
          />
          {isDraggable && (
            <p className={cx('field__text_sub', `field__text_sub_${theme}`)}>
              Upload only .jpg or .png format less than 3 MB
            </p>
          )}
        </>
      ) : (
        <div className={cx('field__text_paint', `field__text_${theme}`)}>
          <p className={cx('field__text_main', `field__text_main_${theme}`)}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              className={cx(`field__label_${theme}`, 'field__label_paint')}
              htmlFor={idFor}
            />
          </p>
          <p className={cx('field__text_sub', `field__text_sub_${theme}`)}>
            Upload only .jpg or .png format less than 3 MB
          </p>
        </div>
      );

    return (
      <label
        htmlFor={idFor}
        className={cx('field', `field_${theme}`, `field_${variant}`, {
          [`field_${variant}_drag`]: isDraggable,
          [`field_${theme}_drag`]: isDraggable,
        })}
      >
        <input
          className={cx('field__input')}
          id={idFor}
          ref={ref}
          type='file'
          {...other}
          onChange={handleChangeImage}
        />
        <div className={cx('field__inner')}>
          {variant === 'avatar' ? (
            <AvatarPlaceholder
              className={cx('field__placeholder', 'field__placeholder_avatar')}
            />
          ) : (
            <PaintPlaceholder
              className={cx('field__placeholder', 'field__placeholder_paint')}
            />
          )}
          {caption}
        </div>

        <p
          className={cx('field__label', `field__label_${theme}`, {
            field__label_drag: isDraggable,
          })}
        >
          {labelName}
        </p>
      </label>
    );
  }
);

export default DropField;
