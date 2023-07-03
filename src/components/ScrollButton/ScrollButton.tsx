import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as Arrow } from '@assets/icons/right_arrow_icon.svg';

import styles from './ScrollButton.module.scss';

const cx = cn.bind(styles);

type TScrollButtonProps = {
  isDarkTheme?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ScrollButton: React.FC<TScrollButtonProps> = ({
  /**
   * Boolean value for change theme
   */
  isDarkTheme = false,
  ...props
}) => {
  // Тут функция для скролла будет написана
  const onScroll = () => {};

  const classNames = cx('Scroll', {
    [`Scroll_dark`]: isDarkTheme,
  });

  return (
    <button onClick={onScroll} type='button' className={classNames} {...props}>
      <Arrow />
    </button>
  );
};

export default ScrollButton;
