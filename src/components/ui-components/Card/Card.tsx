import React from 'react';

import cn from 'classnames/bind';

import { ArrowCardIcon } from '@assets/icons';
import { ThemeTypes } from '@hooks/ThemeConext';
import { IImage } from '@store/models/PaintModel';
import { Picture } from '@ui-components/Picture';

import styles from './Card.module.scss';
import { Link } from '../Link';

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
  paint: IImage;
  /**
   * Bollean value for change theme
   */
  theme: ThemeTypes;
  pathTo: string;
};

const Card: React.FC<TCardProps> = ({
  title,
  subtitle,
  paint,
  theme,
  pathTo,
}) => (
  <Link className={cx('card')} theme={theme} to={pathTo}>
    <Picture
      {...paint}
      className={cx('card__img')}
      alt={`paiting of ${title}`}
    />
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
