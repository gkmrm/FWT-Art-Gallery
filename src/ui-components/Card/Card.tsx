import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as ArrowCardIcon } from '@assets/icons/arrowIcon.svg';
import { ThemeType } from '@context/ThemeContext';
import { IImage } from '@store/models/PaintModel';
import { Link } from '@ui-components/Link';
import { Picture } from '@ui-components/Picture';

import styles from './Card.module.scss';

const cx = cn.bind(styles);

export type TCardProps = {
  id?: string;
  title: string;
  subtitle: string;
  /**
   * Object with image source {string, string...}
   */
  image: IImage;
  pathTo?: string;
  theme: ThemeType;
  inner?: React.ReactNode;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const Card: React.FC<TCardProps> = ({
  title,
  subtitle,
  image,
  pathTo = '',
  theme = 'light',
  inner,
  onClick,
}) => (
  <Link className={cx('card')} theme={theme} onClick={onClick} to={pathTo}>
    <div
      role='presentation'
      className={cx('card__inner')}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {inner}
    </div>
    <Picture {...image} className={cx('card__img')} alt={`paint of ${title}`} />
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
