import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as PlaceholderIcon } from '@assets/icons/placeholder_paint.svg';
import { ReactComponent as PlusIcon } from '@assets/icons/plus_icon_large.svg';
import { ThemeType } from '@context/ThemeContext';
import { Button } from '@ui-components/Button';

import styles from './MissPaintCard.module.scss';

const cx = cn.bind(styles);

type TMissPaintCardProps = {
  theme: ThemeType;
  onClick: () => void;
};

const MissPaintCard: React.FC<TMissPaintCardProps> = ({ theme, onClick }) => (
  <div className={cx('card', `card_${theme}`)}>
    <div className={cx('card__placeholder', `card__placeholder_${theme}`)}>
      <PlaceholderIcon className={cx('card__placeholder_icon')} />
    </div>
    <Button
      variant='default'
      theme={theme}
      className={cx('card__button', `card__button_${theme}`)}
      onClick={onClick}
    >
      <PlusIcon />
    </Button>
  </div>
);

export default MissPaintCard;
