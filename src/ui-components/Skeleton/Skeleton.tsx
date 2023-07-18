import React from 'react';

import cn from 'classnames/bind';

import { ThemeType } from '@context/ThemeConext';

import styles from './Skeleton.module.scss';

const cx = cn.bind(styles);

type TSkeletonProps = {
  theme: ThemeType;
};

const Skeleton: React.FC<TSkeletonProps> = ({ theme }) => (
  <div className={cx('card', `card_${theme}`)}>
    <div className={cx('card__img')}>
      <div className={cx('img')} />
    </div>
    <div className={cx('card__wrapper')}>
      <div className={cx('info', `info_${theme}`)}>
        <div className={cx('info__textBlock')}>
          <p className={cx('info__title', `info__title_${theme}`)} />
          <p className={cx('info__subtitle', `info__subtitle_${theme}`)} />
        </div>
      </div>
    </div>
  </div>
);

export default Skeleton;
