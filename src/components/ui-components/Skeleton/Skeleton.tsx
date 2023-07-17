import React from 'react';

import cn from 'classnames/bind';

import { ThemeTypes } from '@hooks/ThemeConext';
// import { Picture } from '@ui-components/Picture';

import styles from './Skeleton.module.scss';

const cx = cn.bind(styles);

type TSkeletonProps = {
  theme: ThemeTypes;
};

const Skeleton: React.FC<TSkeletonProps> = ({ theme }) => (
  <div className={cx('card')}>
    <div className={cx('card__img')}>
      <div className={cx('img')} />
    </div>
    <div className={cx('card__wrapper')}>
      <div className={cx('info', `info_${theme}`)}>
        <div className={cx('info__textBlock', `info__textBlock_${theme}`)}>
          <p className={cx('info__title')} />
          <p className={cx('info__subtitle', `info__subtitle_${theme}`)} />
        </div>
      </div>
    </div>
  </div>
);

export default Skeleton;
