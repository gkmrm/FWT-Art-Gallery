import React from 'react';

import cn from 'classnames/bind';

import { ThemeType } from '@context/ThemeConext';

import styles from './Skeleton.module.scss';

const cx = cn.bind(styles);

type TSkeletonProps = {
  theme: ThemeType;
};

const Skeleton: React.FC<TSkeletonProps> = ({ theme }) => (
  <div className={cx('skeleton', `skeleton_${theme}`)}>
    <div className={cx('skeleton__img')} />
    <div className={cx('skeleton__wrapper', `skeleton__wrapper_${theme}`)}>
      <p className={cx('skeleton__title', `skeleton__title_${theme}`)} />
      <p className={cx('skeleton__subtitle', `skeleton__subtitle_${theme}`)} />
    </div>
  </div>
);

export default Skeleton;
