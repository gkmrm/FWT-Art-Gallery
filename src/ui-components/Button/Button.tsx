import React from 'react';

import cn from 'classnames/bind';

import { ThemeTypes } from '@hooks/ThemeConext';

import styles from './Button.module.scss';

const cx = cn.bind(styles);

type TButtonProps = {
  /**
   * String value for change theme 'light' | 'dark'
   */
  theme?: ThemeTypes;
  /**
   * Bollean value for disable button
   */
  isDisabled?: boolean;
  /**
   * Type of button default | text | icon   <- string
   */
  variant?: 'default' | 'text' | 'icon';
  /**
   * Callback function to click event
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Additional className from Parent component
   */
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<TButtonProps> = ({
  variant,
  theme,
  isDisabled = false,
  onClick,
  className,
  ...props
}) => {
  const classNames = cx(
    'button',
    `button_${variant}`,
    `button_${variant}_${theme}`,
    className
  );

  return (
    <button
      onClick={onClick}
      type='button'
      className={classNames}
      disabled={isDisabled}
      {...props}
    />
  );
};

export default Button;
