import React from 'react';

import cn from 'classnames/bind';

import styles from './Grid.module.scss';

const cx = cn.bind(styles);

type TGridProps = { className?: string } & React.HTMLAttributes<HTMLDivElement>;

const Grid: React.FC<TGridProps> = ({ className, ...props }) => (
  <div className={cx(className, 'grid')} {...props} />
);

export default Grid;
