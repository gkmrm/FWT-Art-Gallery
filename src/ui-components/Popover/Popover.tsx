import React from 'react';

import cn from 'classnames/bind';

import { ThemeType } from '@context/ThemeConext';

import styles from './Popover.module.scss';

const cx = cn.bind(styles);

type TPopoverProps = {
  theme: ThemeType;
} & React.HTMLAttributes<HTMLDivElement>;

const Popover: React.FC<TPopoverProps> = ({ theme, children, ...other }) => (
  <div className={cx('popover', `popover_${theme}`)} {...other}>
    <div className={cx('popover__arrow', `popover__arrow_${theme}`)} />
    <div className={cx('popover__item')}>{children}</div>
  </div>
);

export default Popover;
