import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as ArrowCardIcon } from '@assets/icons/arrowIcon.svg';
import { Link } from '@ui-components/Link';
import { TPictureProps, Picture } from '@ui-components/Picture';
import { ThemeType } from 'src/context/ThemeConext';

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
  href: string;
  /**
   * Bollean value for change theme
   */
  theme?: ThemeType;
};

const Card: React.FC<TCardProps> = ({
  title,
  subtitle,
  image,
  href = '/',
  theme = 'light',
}) => (
  <Link className={cx('card')} href={href} theme={theme}>
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
        <ArrowCardIcon />
      </div>
    </div>
  </Link>
);

export default Card;
