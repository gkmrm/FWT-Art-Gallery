import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as ArrowCardIcon } from '@assets/icons/arrowIcon.svg';
import { IImage } from '@store/models/PaintModel';
import { Link } from '@ui-components/Link';
import { Picture } from '@ui-components/Picture';
import { ThemeType } from 'src/context/ThemeConext';

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
  onClick?: () => void;
};

const Card: React.FC<TCardProps> = ({
  title,
  subtitle,
  image,
  pathTo = '',
  theme = 'light',
  onClick,
}) => (
  <Link className={cx('card')} theme={theme} onClick={onClick} to={pathTo}>
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
