import React from 'react';

import cn from 'classnames/bind';

import styles from './Button.module.scss';

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
  icon,
  value,
  isDarkTheme = false,
  isDisabled = false,
  onClick,
  ...props
}) => {
  const classNames = cx('Button', `Button_${className}`, {
    [`Button_${className}_dark`]: isDarkTheme,
    [`Button_${className}_disabled`]: isDisabled,
  });

  return (
    <button onClick={onClick} type='button' className={classNames} {...props}>
      {icon}
      {className !== 'icon' ? value : ''}
    </button>
  );
};

export default Button;
