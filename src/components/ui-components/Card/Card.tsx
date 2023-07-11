import React from 'react';

import cn from 'classnames/bind';

import { ArrowCardIcon } from '@assets/icons';
import { ThemeTypes } from '@hooks/ThemeConext';
import { IPaint } from '@store/models/ArtistStaticModels';
import { Picture } from '@ui-components/Picture';

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
  paint: IPaint;
  /**
   * Callback function to click event
   */
  onClick: () => void;
  /**
   * Bollean value for change theme
   */
  theme: ThemeTypes;
};

const Card: React.FC<TCardProps> = ({
  title,
  subtitle,
  paint,
  onClick,
  theme,
}) => (
  <div className={cx('card')} onClick={onClick} role='presentation'>
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
  </div>
);

export default Card;
