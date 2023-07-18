import React from 'react';

import cn from 'classnames/bind';

import styles from './Container.module.scss';

const cx = cn.bind(styles);

export type TContainerProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Container: React.FC<TContainerProps> = ({ className, ...props }) => (
  <div className={cx('container', className)} {...props} />
);

export default Container;
