import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as PlaceholderIcon } from '@assets/icons/placeholder_paint.svg';
import { ThemeType } from '@context/ThemeContext';

import styles from './AvatarPlaceholder.module.scss';

const cx = cn.bind(styles);

type TAvatarPlaceholderProps = {
  theme: ThemeType;
  className: string;
} & React.HTMLAttributes<HTMLDivElement>;

const AvatarPlaceholder: React.FC<TAvatarPlaceholderProps> = ({
  theme,
  className,
  ...other
}) => (
  <div
    className={cx(className, 'placeholder', `placeholder_${theme}`)}
    {...other}
  >
    <div className={cx('placeholder__wrapper')}>
      <PlaceholderIcon />
      <p className={cx('placeholder__text')}>No Image uploaded</p>
    </div>
  </div>
);

export default AvatarPlaceholder;
