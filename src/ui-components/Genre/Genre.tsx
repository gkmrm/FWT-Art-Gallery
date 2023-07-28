import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as CloseIcon } from '@assets/icons/close_icon_small.svg';
import { ThemeType } from '@context/ThemeConext';

import styles from './Genre.module.scss';

const cx = cn.bind(styles);

type TGenreProps = {
  theme: ThemeType;
  className?: string;
  onClose?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const Genre: React.FC<TGenreProps> = ({
  theme,
  className = '',
  onClose,
  ...props
}) => (
  <div className={cx(className, 'genre', `genre_${theme}`)} {...props}>
    {props.children}
    {onClose && <CloseIcon className={cx('genre__close')} onClick={onClose} />}
  </div>
);

export default Genre;
