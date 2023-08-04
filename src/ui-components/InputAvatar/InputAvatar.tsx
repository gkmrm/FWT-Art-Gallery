import React, { forwardRef } from 'react';

import cn from 'classnames/bind';

import { ThemeType } from '@context/ThemeConext';

import styles from './InputAvatar.module.scss';

const cx = cn.bind(styles);

type TInputAvatarProps = {
  theme: ThemeType;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputAvatar: React.FC<TInputAvatarProps> = forwardRef<
  HTMLInputElement,
  TInputAvatarProps
>(({ theme, ...other }, ref) => (
  <input ref={ref} className={cx('input')} type='file' {...other} />
));

export default InputAvatar;
