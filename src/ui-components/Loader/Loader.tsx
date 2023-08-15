import React from 'react';

import cn from 'classnames/bind';

import { ThemeType } from '@context/ThemeContext';

import styles from './Loader.module.scss';

const cx = cn.bind(styles);

export type LoaderProps = {
  theme: ThemeType;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ className, theme }) => (
  <div className={cx('loader', `loader_${theme}`, className)}>
    <svg className={cx('loader__wrapper')} viewBox='0 0 50 50'>
      <circle
        className={cx('loader__circle', 'loader__circle_1')}
        cx='25'
        cy='25'
        r='20'
      />
      <circle
        className={cx('loader__circle', 'loader__circle_2')}
        cx='25'
        cy='25'
        r='20'
      />
      <circle
        className={cx('loader__circle', 'loader__circle_3')}
        cx='25'
        cy='25'
        r='20'
      />
      <circle
        className={cx('loader__circle', 'loader__circle_4')}
        cx='25'
        cy='25'
        r='20'
      />
    </svg>
  </div>
);

export default Loader;
