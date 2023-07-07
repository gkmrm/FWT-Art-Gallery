/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as Arrow } from '@assets/icons/arrowIcon.svg';
import { ThemeTypes } from '@hooks/ThemeConext';
import { TPictureProps, Picture } from '@ui-components/Picture';

import styles from './Card.module.scss';

const cx = cn.bind(styles);

export type TCardProps = {
  /**
   * Data id from backend
   */
  id?: string;
  /**
   * Author name- string
   */
  title: string;
  /**
   * Name of Paint - string
   */
  subtitle: string;
  /**
   * Object with image source {string, string...}
   */
  image: TPictureProps;
  /**
   * Callback function to click event
   */
  onClick: () => void;
  /**
   * Bollean value for change theme
   */
  theme?: ThemeTypes;
};

const Card: React.FC<TCardProps> = ({
  title,
  subtitle,
  image,
  onClick,
  theme = 'light',
}) => (
  <div className={cx('card')} onClick={onClick} role='presentation'>
    <Picture {...image} className={cx('card__img')} />
    <div className={cx('card__wrapper')}>
      <div className={cx('info', `info_${theme}`)}>
        <div className={cx('info__textBlock', `info__textBlock_${theme}`)}>
          <p className={cx('info__title')}>{title}</p>
          <p className={cx('info__subtitle', `info__subtitle_${theme}`)}>
            {subtitle}
          </p>
        </div>
      </div>
      <div className={cx('info__arrow', `info__arrow_${theme}`)}>
        <Arrow />
      </div>
    </div>
  </div>
);

export default Card;
