import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as DeleteIcon } from '@assets/icons/trash_icon.svg';
import { ThemeType } from '@context/ThemeContext';
import { Button } from '@ui-components/Button';

import styles from './DropImagePreview.module.scss';

const cx = cn.bind(styles);

type TDropImagePreviewProps = {
  isDraggable: boolean;
  variant: 'avatar' | 'paint';
  theme: ThemeType;
  image: string;
  handleDeleteImage: () => void;
};

const DropImagePreview: React.FC<TDropImagePreviewProps> = ({
  isDraggable,
  variant,
  theme,
  image,
  handleDeleteImage,
}) => (
  <div
    className={cx('imageBlock', `imageBlock_${variant}`, {
      imageBlock_disabled: isDraggable,
    })}
  >
    <img
      className={cx('imageBlock_image', `imageBlock_image_${variant}`)}
      src={image}
      alt={`preview of ${variant}`}
    />
    <Button
      className={cx('imageBlock_icon')}
      variant='icon'
      theme={theme}
      onClick={handleDeleteImage}
    >
      <DeleteIcon />
    </Button>
  </div>
);

export default DropImagePreview;
