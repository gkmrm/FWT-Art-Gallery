import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as ArrowIcon } from '@assets/icons/right_arrow_icon.svg';
import { Button } from '@ui-components/Button';
import { ThemeType } from 'src/context/ThemeConext';

import styles from './ScrollButton.module.scss';

const cx = cn.bind(styles);

type TScrollButtonProps = {
  /**
   * String value for change theme
   */
  theme: ThemeType;
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
