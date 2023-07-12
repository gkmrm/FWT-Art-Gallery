import React from 'react';

import { ArrowIcon } from '@assets/icons';
import { Button } from '@ui-components/Button';
import cn from 'classnames/bind';

import { ThemeTypes } from 'src/context/ThemeConext';

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
