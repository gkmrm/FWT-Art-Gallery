import React, { useEffect, useState } from 'react';

import cn from 'classnames/bind';

import { ReactComponent as ArrowIcon } from '@assets/icons/right_arrow_icon.svg';
import { useThemeContext } from '@context/ThemeConext';
import { Button } from '@ui-components/Button';

import styles from './ScrollButton.module.scss';

const cx = cn.bind(styles);

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useThemeContext();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const buttonVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', buttonVisibility);

    return () => window.removeEventListener('scroll', buttonVisibility);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      type='button'
      className={cx('scroll', `scroll_${theme}`)}
    >
      <ArrowIcon />
    </Button>
  );
};

export default ScrollButton;
