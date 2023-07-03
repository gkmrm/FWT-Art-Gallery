import React from 'react';

import cn from 'classnames/bind';

import styles from './Button.module.scss';

const cx = cn.bind(styles);

type TButtonProps = {
  /**
   * String value display inside button, DON'T ADD WITH ICON className
   */
  value?: string;
  /**
   * ReactComponent for adding inside button
   */
  icon?: React.ReactNode;
  /**
   * Bollean value for change theme
   */
  isDarkTheme?: boolean;
  /**
   * Bollean value for disable button
   */
  isDisabled?: boolean;
  /**
   * Type of button default | text | icon   <- string
   */
  className?: 'default' | 'text' | 'icon';
  /**
   * Callback function to click event
   */
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
