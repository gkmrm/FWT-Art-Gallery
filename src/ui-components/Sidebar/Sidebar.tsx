import React from 'react';

import cn from 'classnames/bind';

import { ThemeType } from '@context/ThemeContext';
import { ModalWrapper } from '@ui-components/ModalWrapper';

import styles from './Sidebar.module.scss';

const cx = cn.bind(styles);

type TSidebarProps = {
  theme: ThemeType;
  isShow: boolean;
  onClose: () => void;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Sidebar: React.FC<TSidebarProps> = ({
  theme,
  isShow,
  onClose,
  children,
  className = '',
  ...other
}) => (
  <ModalWrapper
    className={cx(className, 'sidebar')}
    classNameIcon={cx('sidebar__icon', `sidebar__icon_${theme}`)}
    isShow={isShow}
    onClose={onClose}
    theme={theme}
    {...other}
  >
    <div>{children}</div>
  </ModalWrapper>
);

export default Sidebar;
