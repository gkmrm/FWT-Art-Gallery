import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as PlusIcon } from '@assets/icons/plus_icon_large.svg';
import { ThemeType } from '@context/ThemeContext';
import { Button } from '@ui-components/Button';
import { CardPlaceholder } from '@ui-components/CardPlaceholder';

import styles from './MissPaintCard.module.scss';

const cx = cn.bind(styles);

type TMissPaintCardProps = {
  theme: ThemeType;
  onClick: () => void;
};

const MissPaintCard: React.FC<TMissPaintCardProps> = ({ theme, onClick }) => (
  <div className={cx('card', `card_${theme}`)}>
    <CardPlaceholder />
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
