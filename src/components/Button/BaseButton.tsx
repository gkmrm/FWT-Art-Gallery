import React from 'react';

import cn from 'classnames/bind';

import styles from './BaseButton.module.scss';

const cx = cn.bind(styles);

export type TBaseButtonProps = {
  onClick: () => void;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<TBaseButtonProps> = ({
  onClick,
  className,
  ...rest
}) => (
  <button
    className={cx(className, 'BaseButton')}
    type='button'
    onClick={onClick}
    {...rest}
  >
    {rest.children}
    {rest.value}
  </button>
);

export default Button;
