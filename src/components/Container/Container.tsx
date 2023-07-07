import React from 'react';

import cn from 'classnames/bind';

import styles from './Container.module.scss';

const cx = cn.bind(styles);

export type TContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const Container: React.FC<TContainerProps> = ({ className, children }) => (
  <div className={cx('container', className)}>{children}</div>
);

export default Container;
