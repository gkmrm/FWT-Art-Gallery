import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as Arrow } from './arrowIcon.svg';
import styles from './Card.module.scss';
import { ImageProps, Image } from '../Image';

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
  image: ImageProps;
  /**
   * Callback function to click event
   */
  onClick: () => void;
  /**
   * Bollean value for change theme
   */
  isDarkTheme?: boolean;
};

const Card: React.FC<TCardProps> = ({
  title,
  subtitle,
  image,
  onClick,
  isDarkTheme,
}) => (
  <div className={cx('Сard')} onClick={onClick}>
    <Image {...image} className={cx('img')} />
    <div className={cx('wrapper')}>
      <div className={cx('info', { info_dark: isDarkTheme })}>
        <div
          className={cx('info__textBlock', {
            info__textBlock_dark: isDarkTheme,
          })}
        >
          <p className={cx('info__title')}>{title}</p>
          <p
            className={cx('info__subtitle', {
              info__subtitle_dark: isDarkTheme,
            })}
          >
            {subtitle}
          </p>
        </div>
      </div>
      <div className={cx('info__arrow', { info__arrow_dark: isDarkTheme })}>
        <Arrow />
      </div>
    </div>
  </div>
);

export default Card;
