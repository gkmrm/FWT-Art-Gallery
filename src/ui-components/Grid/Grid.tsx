import React from 'react';

import cn from 'classnames/bind';

import styles from './Grid.module.scss';

const cx = cn.bind(styles);

type TGridProps = {
  /**
   * Additional classNames for Grid
   */
  className?: string;
  /**
   * Inner comppnents for this component
   */
  children?: React.ReactNode;
};

const Grid: React.FC<TGridProps> = ({ className, children }) => (
  <div className={cx(className, 'grid')}>{children}</div>
);

export default Grid;
