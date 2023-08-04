import React, { ChangeEvent, DragEvent, useCallback, useRef } from 'react';

import cn from 'classnames/bind';

import { ReactComponent as AvatarPlaceholder } from '@assets/icons/artistAvatar.svg';
import { ReactComponent as PaintPlaceholder } from '@assets/icons/paintDrop_icon_small.svg';
import { ReactComponent as DeleteIcon } from '@assets/icons/trash_icon.svg';
import { ThemeType } from '@context/ThemeConext';
import { Button } from '@ui-components/Button';
import { ErrorMessage } from '@ui-components/ErrorMessage';
import BASE_URL from '@utils/BASE_URL';
import getBase64 from '@utils/functions/getBase64';

import styles from './DropZone.module.scss';

const cx = cn.bind(styles);

type TDropZoneProps = {
  onReset: () => void;
  className?: string;
  theme: ThemeType;
  idFor?: string;
  labelName?: string;
  errorMessage: string;
  variant: 'avatar' | 'paint';
  isDraggable: boolean;
  onDragLeave: React.DragEventHandler<HTMLInputElement>;
  onChange: (file: File | '') => void;
  initialValue?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const DropZone: React.FC<TDropZoneProps> = ({
  onReset,
  className,
  theme,
  labelName = '',
  idFor = '',
  variant,
  isDraggable,
  onDragLeave,
  errorMessage = '',
  onChange,
  initialValue,
  ...other
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [image, setImage] = React.useState(
    initialValue ? `${BASE_URL}${initialValue}` : ''
  );

  const uploadImage = async (file: File | undefined) => {
    if (file) {
      const base64 = await getBase64(file);
      setImage(base64);
      onChange(file);
      console.log(file);
    }
  };

  const handleDeleteImage = () => {
    setImage('');
    onReset();
  };

  const handleChangeImage = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      await uploadImage(file);
    },
    []
  );

  const handleLoadImage = () => inputRef.current?.click();

  const handleDragImage = (event: DragEvent<HTMLElement>) =>
    event.preventDefault();

  const handleDropImage = useCallback(
    async (event: DragEvent<HTMLInputElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files?.[0];
      await uploadImage(file);

      if (onDragLeave) {
        onDragLeave(event);
      }
    },
    []
  );

  return (
    <div
      className={cx('dropzone', `dropzone__${variant}`)}
      role='presentation'
      onDrop={handleDropImage}
      onDragOver={handleDragImage}
      onDragLeave={onDragLeave}
      onClick={handleLoadImage}
    >
      <section
        className={cx(
          className,
          `dropzone__section_${variant}`,
          `dropzone__section_${variant}_${theme}`,
          { [`dropzone__section_${variant}_full`]: isDraggable }
        )}
      >
        {image && !errorMessage && (
          <div
            className={cx(
              'dropzone__imageBlock',
              `dropzone__imageBlock_${variant}`,
              { dropzone__imageBlock_disabled: isDraggable }
            )}
          >
            <img
              className={cx(
                'dropzone__imageBlock_image',
                `dropzone__imageBlock_image_${variant}`
              )}
              src={image}
              alt=''
            />
            <Button
              className={cx('dropzone__imageBlock_icon')}
              variant='icon'
              theme={theme}
              onClick={handleDeleteImage}
            >
              <DeleteIcon />
            </Button>
          </div>
        )}
        <div
          className={cx(
            'dropzone__field',
            `dropzone__field_${theme}`,
            `dropzone__field_${variant}`,
            {
              [`dropzone__field_${variant}_drag`]: isDraggable,
              [`dropzone__field_${theme}_drag`]: isDraggable,
            }
          )}
        >
          <input
            className={cx('dropzone__input')}
            id={idFor}
            ref={inputRef}
            type='file'
            {...other}
            onChange={handleChangeImage}
          />
          <div className={cx('dropzone__inner')}>
            {variant === 'avatar' ? (
              <AvatarPlaceholder
                className={cx(
                  'dropzone__placeholder',
                  'dropzone__placeholder_avatar'
                )}
              />
            ) : (
              <PaintPlaceholder
                className={cx(
                  'dropzone__placeholder',
                  'dropzone__placeholder_paint'
                )}
              />
            )}

            {variant === 'avatar' ? (
              <>
                <p
                  className={cx('dropzone__text', `dropzone__text_${theme}`, {
                    dropzone__text_drag: isDraggable,
                  })}
                />
                {isDraggable && (
                  <p
                    className={cx(
                      'dropzone__text_sub',
                      `dropzone__text_sub_${theme}`
                    )}
                  >
                    Upload only .jpg or .png format less than 3 MB
                  </p>
                )}
              </>
            ) : (
              <div
                className={cx(
                  'dropzone__text_paint',
                  `dropzone__text_${theme}`
                )}
              >
                <p
                  className={cx(
                    'dropzone__text_main',
                    `dropzone__text_main_${theme}`
                  )}
                >
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label
                    className={cx(
                      'dropzone__label_paint',
                      `dropzone__label_paint_${theme}`
                    )}
                    htmlFor={idFor}
                  />
                </p>
                <p
                  className={cx(
                    'dropzone__text_sub',
                    `dropzone__text_sub_${theme}`
                  )}
                >
                  Upload only .jpg or .png format less than 3 MB
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <label
        className={cx('dropzone__label', `dropzone__label_${theme}`)}
        htmlFor={idFor}
      >
        <p>{labelName}</p>
      </label>
      {errorMessage && (
        <ErrorMessage
          className={cx(`dropzone__error_${variant}`)}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

export default DropZone;
