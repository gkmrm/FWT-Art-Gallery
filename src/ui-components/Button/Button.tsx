import React from 'react';

import cn from 'classnames/bind';

import { ThemeType } from '@context/ThemeConext';

import styles from './Button.module.scss';

const cx = cn.bind(styles);

type TButtonProps = {
  theme?: ThemeType;
  isDisabled?: boolean;
  /**
   * Type of button default | text | icon   <- string
   */
  variant?: 'default' | 'text' | 'icon';
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
