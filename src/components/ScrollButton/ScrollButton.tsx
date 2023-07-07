import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as Arrow } from '@assets/icons/right_arrow_icon.svg';
import { ThemeTypes } from '@hooks/ThemeConext';
import { Button } from '@ui-components/Button';

import styles from './ScrollButton.module.scss';

const cx = cn.bind(styles);

type TScrollButtonProps = {
  theme: ThemeTypes;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ScrollButton: React.FC<TScrollButtonProps> = ({
  /**
   * String value for change theme
   */
  theme = 'light',
  ...props
}) => {
  // TODO Тут функция для скролла будет написана
  const onScroll: React.MouseEventHandler = () => null;

  const classNames = cx('scroll', [`scroll_${theme}`]);

  return (
    <Button
      onClick={() => onScroll}
      type='button'
      className={classNames}
      {...props}
    >
      <Arrow />
    </Button>
  );
};

export default ScrollButton;
