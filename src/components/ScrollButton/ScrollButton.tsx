import React from 'react';

import cn from 'classnames/bind';

import { ArrowIcon } from '@assets/icons';
import { ThemeTypes } from '@hooks/ThemeConext';
import { Button } from '@ui-components/Button';

import styles from './ScrollButton.module.scss';

const cx = cn.bind(styles);

type TScrollButtonProps = {
  /**
   * String value for change theme
   */
  theme: ThemeTypes;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ScrollButton: React.FC<TScrollButtonProps> = ({ theme, ...props }) => {
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
      <ArrowIcon />
    </Button>
  );
};

export default ScrollButton;
