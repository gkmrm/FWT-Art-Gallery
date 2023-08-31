import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as PlaceholderIcon } from '@assets/icons/placeholder_paint.svg';

import styles from './CardPlaceholder.module.scss';

const cx = cn.bind(styles);

type TCardPlaceholderProps = {};

const CardPlaceholder: React.FC<TCardPlaceholderProps> = () => (
  <div className={cx('placeholder')}>
    <PlaceholderIcon className={cx('placeholder_icon')} />
  </div>
);

export default CardPlaceholder;
