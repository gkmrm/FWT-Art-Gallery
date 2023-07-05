import React from 'react';

import cn from 'classnames/bind';

import styles from './Grid.module.scss';

const cx = cn.bind(styles);

type TGridProps = {
  /**
   * Additional classNames for Grid
   */
  className: string;
  children: React.ReactNode;
};

const Grid: React.FC<TGridProps> = ({ className, children }) => (
  <div className={cx('grid', className)}>{children}</div>
);

export default Grid;
