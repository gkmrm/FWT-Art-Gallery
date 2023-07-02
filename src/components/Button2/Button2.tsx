import React from 'react';

import cn from 'classnames/bind';

import styles from './Button2.module.scss';
// import { ReactComponent as PlusIcon } from './plus_icon.svg';
import { ReactComponent as TrashIcon } from './trash_icon.svg';

const cx = cn.bind(styles);

type TButtonProps = {
  value?: string;
  icon?: React.ReactNode;
  isDarkTheme?: boolean;
  isDisabled?: boolean;
  className?: 'default' | 'text' | 'icon';
  onClick: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<TButtonProps> = ({
  className = 'default',
  icon = <TrashIcon />,
  value,
  isDarkTheme = false,
  isDisabled = false,
  onClick,
  ...props
}) => {
  const classNamesButton = cx('Button', `Button_${className}`, {
    [`Button_${className}_dark`]: isDarkTheme,
    [`Button_${className}_disabled`]: isDisabled,
  });

  return (
    <button
      onClick={onClick}
      type='button'
      className={classNamesButton}
      {...props}
    >
      {icon}
      {value}
    </button>
  );
};

export default Button;
