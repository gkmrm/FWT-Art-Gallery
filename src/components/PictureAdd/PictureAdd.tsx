import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as AvatarPlaceholder } from '@assets/icons/artistAvatar.svg';
import { ReactComponent as TrashIcon } from '@assets/icons/trash_icon.svg';
import { ThemeType } from '@context/ThemeConext';
import { Button } from '@ui-components/Button';
import InputAvatar from '@ui-components/InputAvatar/InputAvatar';

import styles from './PictureAdd.module.scss';

const cx = cn.bind(styles);

type TPictureAddProps = {
  theme: ThemeType;
  name: string;
  isDraggable?: boolean;
  currentImage?: string;
  errorMessage: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const PictureAdd: React.FC<TPictureAddProps> = ({
  theme,
  errorMessage,
  ...other
}) => {
  const isAdded = true;

  return (
    <div className={cx('picture')}>
      <div className={cx('picture_wrapper')}>
        <div className={cx('picture_field', `picture_field_${theme}`)}>
          <InputAvatar
            className=''
            // errorMessage={errorMessage}
            theme={theme}
            {...other}
          />
          <AvatarPlaceholder className={cx('picture_placeholder')} />
          <div className={cx('picture_text', `picture_text_${theme}`)}>
            You can drop your image here
          </div>
        </div>
        <Button
          className={cx('picture_field_icon', {
            form__picture_field_icon: isAdded,
          })}
          variant='icon'
          theme={theme}
        >
          <TrashIcon />
        </Button>
      </div>
      {/* 
      <Button theme={theme} onClick={() => {}} variant='text'>
        Browse Profile Photo
      </Button> */}
    </div>
  );
};

export default PictureAdd;
